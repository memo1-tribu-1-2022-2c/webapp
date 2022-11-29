import { ChakraProvider, Flex, HStack, VStack, Box, Center, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import SearchBar from './subcomponentes/SearchBar';
import NavbarGeneral from './/NavbarGeneral';
import axios from "axios";
import Producto from './subcomponentes/Producto';

const Productos = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchloading, setSearchloading] = useState(false);

  const onSearchClick = async () => {
    setSearchloading(true)

    const data = await (await axios.get(`https://modulo-soporte.onrender.com/producto/?query=${searchQuery}`)).data

    setSearchResults([data])

    setSearchloading(false)
  };

  return (
    <ChakraProvider>
      <NavbarGeneral />

      <HStack>
        <Flex padding={5}>
          <SearchBar searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClick={onSearchClick}
            placeholder='Buscar Producto'
            isLoading={searchloading} />
        </Flex>

        <VStack>
          <Button>Agregar nuevo producto</Button>
          <Button>Agregar nueva version</Button>
        </VStack>
      </HStack>

      <Center>
        <VStack align='flex' padding='0 20px 20px 20px'>
          {searchResults.length !== 0 && searchResults.map((client) => {
            return <Producto id={client.id} CUIT={client.CUIT} razon_social={client.razon_social} />
          })}
        </VStack>
      </Center>

    </ChakraProvider>
  )
}

export default Productos