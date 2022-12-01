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

  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
    ]);
    props.setTitle("Tickets");
  }, []);

  /* const loadNewTicket = async (new_ticket_id) => {
    setSearchQuery(new_ticket_id);
    await onSearchClick();
  } */

  const onSearchClick = async () => {
    setSearchloading(true);
    try {
      const results = await (
        await axios.get(
          `https://modulo-soporte.onrender.com/ticket/${searchQuery}`
        )
      ).data;
      setSearchResults([results]);
    } catch {
      alert("Ese ticket no existe!");
    }
    setSearchloading(false);
    // await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`).then(result => setData(result.data)).catch(alert("No existe ese product id"))
  };

  console.log(searchResults);

  return (
    <ChakraProvider>
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
        <HStack>
          <NewTicket /* new_ticket={loadNewTicket} */ />
        </HStack>
      </HStack>

      <Flex
        position="fixed"
        width="98%"
        left="1%"
        height="77%"
        bg="gray.300"
        top="190px"
      >
        <Box
          width="100%"
          bg="gray.300"
          overflowY="scroll"
          left="1%"
        >
          <SimpleGrid columns={7} spacing={8} align="flex" padding={5}>
            {searchResults.length !== 0 &&
              searchResults.map((ticket) => {
                return (
                  <Tickets
                    key={ticket.ticket_id}
                    ticket_id={ticket.ticket_id}
                    ticket_title={ticket.ticket_title}
                  />
                );
              })}
              <Ticket/>
              <Ticket/>
              <Ticket/>
              <Ticket/>
              <Ticket/>
              <Ticket/>
              <Ticket/>
              <Ticket/>
          </SimpleGrid>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default Tickets;
