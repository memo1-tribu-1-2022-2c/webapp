import React, { useState, useEffect } from "react";
import { ChakraProvider, Flex, HStack, VStack, Box, Select } from "@chakra-ui/react";
import SearchBar from "./subcomponentes/SearchBar";
import Client from "./subcomponentes/Client";
import axios from "axios";
import Routing from "../routes/config";

export const Clientes = (props) => {
  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
    ]);
    props.setTitle("Clientes");
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);
  const [clients, setClients] = useState([]);

  const onSearchClick = async () => {
    setSearchloading(true);

    if (searchQuery === ''){
      await loadClients();
      setSearchloading(false);
      return;
    }

    const data = await (
      await axios.get(
        `https://modulo-soporte.onrender.com/client/search?query=${searchQuery}`
      )
    ).data;

    setSearchResults([data]);

    setSearchloading(false);
  };

  const loadClients = async () => {
    setSearchResults([]);
    
    try{
     
    const result = await (
      await axios.get("https://modulo-soporte.onrender.com/clients")
    ).data;
    setSearchResults(result.clients);
    setClients(result.clients);
   
    }catch{
      
    }  
  }

  const selectClient = (client_id) => {
    if (client_id === ''){
      setSearchResults(clients);
      return;
    }

    const filter = clients.filter(client => {
      return client.id === client_id
    })
    setSearchResults(filter);
  }

  useEffect(() => {
    loadClients();
  }, []);

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
            placeholder="Buscar Cliente"
            isLoading={searchloading}
          />
        </Flex>

        <Select bg="white" width="20%" onChange={(e) => {selectClient(e.target.value)}}>
            <option value="">Seleccione un cliente</option>
            {clients.map(client => {
              return <option value={client.id}>{client.razon_social} (id: {client.id})</option>
            })}
        </Select>


      </HStack>

      <Flex
        width="98%"
        height="72%"
        bg="gray.300"
        position="fixed"
        left="1%"
        top="190px"
        overflowY="scroll"
        scrollBehavior="smooth"
      >
        <VStack width="100%" align="flex" padding="20px 20px 20px 20px">
          {searchResults.length !== 0 &&
            searchResults.map((client) => {
              return (
                <Client
                  key={client.id}
                  client_id={client.id}
                  CUIT={client.CUIT}
                  razon_social={client.razon_social}
                  refresh={loadClients}
                />
              );
            })}
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default Clientes;
