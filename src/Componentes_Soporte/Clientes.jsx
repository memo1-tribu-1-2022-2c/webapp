import React, { useState, useEffect } from 'react'
import NavbarGeneral from './/NavbarGeneral';
import { ChakraProvider, Flex, HStack, VStack, Box } from '@chakra-ui/react'
import SearchBar from './subcomponentes/SearchBar';
import Client from './subcomponentes/Client';
import axios from "axios";

export const Clientes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);

  const onSearchClick = async () => {
    setSearchloading(true)

    const data = await (await axios.get(`https://modulo-soporte.onrender.com/client/search?query=${searchQuery}`)).data

    setSearchResults([data])

    setSearchloading(false)
  };

  useEffect(() => {
    const funcion = async () => {
      const result = await (await axios.get("https://modulo-soporte.onrender.com/clients")).data
      setSearchResults(result.clients)
      console.log(result);
    }
    funcion()
  }
    , []);

  return (
    <ChakraProvider>
        <Flex padding={5}>
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder='Buscar Cliente'
            isLoading={searchloading} />
        </Flex>
        <VStack align='flex' padding='0 20px 20px 20px'>
          {searchResults.length !== 0 && searchResults.map((client) => {
            return <Client key={client.id} CUIT={client.CUIT} razon_social={client.razon_social} />
          })}
        </VStack>
    </ChakraProvider>
  )
}

export default Clientes