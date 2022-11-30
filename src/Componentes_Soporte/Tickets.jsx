import { Box, Button, ChakraProvider, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import Routing from '../routes/config';

export const Tickets = (props) => {

  React.useEffect(() => {
    props.setNavigation([
      [Routing.Tickets, "Tickets"],
      [Routing.Clientes, "Clientes"],
      [Routing.Productos, "Productos"],
<<<<<<< HEAD
    ]);
    props.setTitle("Tickets")
  }, [])
=======
    ])
  }, [props])
>>>>>>> 9fa86b8f7dec8514376ed9834287d1e56320a0fc

  return (
    <ChakraProvider>
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