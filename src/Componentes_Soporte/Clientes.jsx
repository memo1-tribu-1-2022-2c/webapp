import React from 'react'
import NavbarGeneral from './/NavbarGeneral';
import SearchBar from './subcomponentes/SearchBar';
import { Center, ChakraProvider, Flex, HStack, VStack, Box } from '@chakra-ui/react'
import Cliente from './subcomponentes/cliente';

const Clientes = () => {
  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Flex 
      padding= {5}
      bgColor= "gray.50"
      >
        <SearchBar/>
        <Box padding={5}>
          hola
        </Box>
      </Flex>
        <VStack>
          <HStack>
            <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' width={100}/>
            <Cliente/>
          </HStack>
        </VStack>
    </ChakraProvider>
  )
}

export default Clientes