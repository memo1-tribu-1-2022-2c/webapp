import { Center, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import NavbarGeneral from './/NavbarGeneral';

const Tickets = () => {
  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Center>
        <h1>Estoy en Tickets</h1>
      </Center>
    </ChakraProvider>
  )
}

export default Tickets