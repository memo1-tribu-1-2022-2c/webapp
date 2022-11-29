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
      <NavbarGeneral />
      <VStack>
        <Flex padding={5}>
          <ClientSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchClick={onSearchClick} searchloading={searchloading} />
        </Flex>
        <VStack>
          {searchResults.length !== 0 && searchResults.map((client) => {
            return <Client id={client.id} CUIT={client.CUIT} razon_social={client.razon_social} />
          })}
        </VStack>
      </VStack>
    </ChakraProvider>
  )
}

export default Clientes