import { Box, Button, ChakraProvider, Flex, HStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import Routing from '../routes/config';
import SearchBar from './subcomponentes/SearchBar';
import axios from "axios";

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
    props.setTitle("Tickets")
  }, [])

  const onSearchClick = async () => {
    setSearchloading(true)


    try {

      const results = await (await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`)).data

      setSearchResults([results])
    } catch {
      alert("Ese producto no existe!")
    }
    setSearchloading(false)
    // await axios.get(`https://modulo-soporte.onrender.com/product/${searchQuery}`).then(result => setData(result.data)).catch(alert("No existe ese product id"))

  }

  return (
    <ChakraProvider>
      
      <HStack marginLeft="1%" marginTop={2} width="98%" height="5%" bg="gray.300" justifyContent="space-between" padding={4}>
      <Flex padding={5}>
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder='Buscar por (Cliente, Id, Estado o Criticidad)'
            isLoading={searchloading}
          />
        </Flex>
        <HStack>
          <Button padding={5}>Creat Ticket</Button>
          <Button width='flex'>Consulta de tickets</Button>
        </HStack>
      </HStack>

      <Flex position='fixed' width= "98%" left="1%" height="77%" bottom="2%" bg="gray.300" top='190px'>
        
      </Flex>
      


    </ChakraProvider>
  )
}

export default Tickets