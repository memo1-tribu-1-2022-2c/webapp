import React, { useState, useEffect } from 'react'
import NavbarGeneral from './/NavbarGeneral';
import { ChakraProvider, Flex, HStack, VStack, Box } from '@chakra-ui/react'
import ClientSearch from './subcomponentes/ClientSearch';
import Client from './subcomponentes/Client';
import axios from "axios";

const Clientes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);

  const onSearchClick = async () => {
    setSearchloading(true)

    const data = await (await axios.get(`https://modulo-soporte.onrender.com/client/search?query=${searchQuery}`)).data

    setSearchResults(data)

    setSearchloading(false)
  };

  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Flex padding={5}>
        <ClientSearch searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} onSearchClick= {onSearchClick} searchloading = {searchloading}  />
      </Flex>
      <VStack>
        <HStack>
          <Client CUIT = {searchResults.CUIT} id = {searchResults.id} razon_social = {searchResults.razon_social} />
        </HStack>
      </VStack>
    </ChakraProvider>
  )
}

export default Clientes