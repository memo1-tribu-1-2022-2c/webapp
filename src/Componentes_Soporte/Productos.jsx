import { Center, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import NavbarGeneral from './/NavbarGeneral';

const Productos = () => {
  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Center>
        <h1>Estoy en Productos</h1>
      </Center>

    </ChakraProvider>
  )
}

export default Productos