import { Box, Button, Center, ChakraProvider, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import NavbarGeneral from './/NavbarGeneral';

const Tickets = () => {
  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Flex padding={5}>
        <HStack>
          <Box pr={20}></Box>
          <Button pr={8}>Crear Ticket</Button>
          {/* Villereada para poder hacer espacios jsajsa ayuda  */}
          <Box pr={20}></Box>
          <Box pr={20}></Box>
          <Box pr={20}></Box>
          <Box pr={20}></Box>
          <Box pr={20}></Box>
          <Box pr={20}></Box>
          <Button pl={8}>Consulta de tickets</Button>
        </HStack>
      </Flex>
      <Flex></Flex>
    </ChakraProvider>
  )
}

export default Tickets