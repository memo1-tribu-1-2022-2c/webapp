import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  VStack,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Routing from "../routes/config";
import SearchBar from "./subcomponentes/SearchBar";
import axios from "axios";
import NewTicket from "./subcomponentes/NewTicket";
import Ticket from "./subcomponentes/Ticket";

export const Tickets = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);
  const [searched, setSearched] = useState([]);

  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
    ]);
    props.setTitle("Tickets");
  }, [props]);

  const searchById = (id) => {
    const results = searchResults.filter((ticket) => {
      return ticket.id.match(id) !== null;
    });

    return results;
  };

  const searchByClient = (client_id) => {
    const results = searchResults.filter((ticket) => {
      return ticket.client_id.match(client_id) !== null;
    });

    return results;
  };

  const searchByState = (state) => {
    const results = searchResults.filter((ticket) => {
      if (parseInt(state)){
        return false;
      }
      return ticket.state.toLowerCase().match(state.toLowerCase()) !== null;
    });

    return results;
  };

  const searchByCriticity = (criticity) => {
    const results = searchResults.filter((ticket) => {
      if (parseInt(criticity)){
        return false;
      }
      return (
        ticket.criticity.toLowerCase().match(criticity.toLowerCase()) !== null
      );
    });

    return results;
  };

  const removeDuplicates = (concatenated) => {

    const final = [];
    const actual = {};

    concatenated.map(
      ticket => {
        if (actual[ticket.id]){
          return;
        }
        actual[ticket.id] = true;
        final.push(ticket)
      }
    )

    return final;

  }

  const onSearchClick = async () => {
    setSearchloading(true);
    setSearched([]);
    const byId = searchById(searchQuery);
    const byClient = searchByClient(searchQuery);
    const byState = searchByState(searchQuery);
    const byCriticity = searchByCriticity(searchQuery);
    
    if (!searchQuery){
      setSearched(searchResults);
      setSearchloading(false);
      return
    }

    const concatenated = byId
      .concat(byClient)
      .concat(byState)
      .concat(byCriticity);
    setSearched(removeDuplicates(concatenated));
    setSearchloading(false);
    // await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`).then(result => setData(result.data)).catch(alert("No existe ese product id"))
  };

  const loadAll = async () => {
    try {
      const result = await (
        await axios.get("https://modulo-soporte.onrender.com/ticket")
      ).data;
      setSearchResults(result.tickets);
      setSearched(result.tickets);
    } catch {
      alert("No se pudo obtener los tickets");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <>
      <HStack
        marginLeft="1%"
        marginTop={2}
        width="98%"
        height="5%"
        bg="gray.300"
        justifyContent="space-between"
        padding={4}
      >
        <Flex padding={5}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder="Buscar por (Cliente, Id, Estado o Criticidad)"
            isLoading={searchloading}
          />
        </Flex>
        <NewTicket refresh={loadAll}/>
      </HStack>

      <Flex
        position="fixed"
        width="98%"
        left="1%"
        height="77%"
        bg="gray.300"
        top="190px"
      >
        <Box width="100%" bg="gray.300" overflowY="scroll" left="1%">
          <SimpleGrid columns={6} spacing={8} align="flex" padding={5}>
            {searched.length !== 0 &&
              searched.map((ticket) => {
                return (
                  <Ticket
                    key={ticket.id}
                    ticket_id={ticket.id}
                    ticket_title={ticket.title}
                    ticket_state={ticket.state}
                    ticket_client={ticket.client_id}
                    ticket_end_date={ticket.end_dt}
                    ticket_person_in_charge={ticket.person_in_charge}
                    ticket_description={ticket.description}
                    ticket_product_version={ticket.version_id}
                    ticket_criticity={ticket.criticity}
                    ticket_resolution={ticket.end_detail}
                    ticket_start_date={ticket.start_dt}
                    ticket_project_id={ticket.project_id}
                    refresh={loadAll}
                  />
                );
              })}
          </SimpleGrid>
        </Box>
      </Flex>
    </>
  );
};

export default Tickets;
