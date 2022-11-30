import {
    Box,
    Flex,
    Button,
  } from '@chakra-ui/react'
  import React from 'react'
  
  
  function Navbar({isProyectsPage}) {

    return (
      <Box border='0px' bg='gray.100' py='3' bgColor="" w="full" display={{ base: 'none', md: 'flex' }}>
        <Flex
          justifyContent="center"
          alignItems="center"
          w="80%"
          margin="auto"
          py="5"
          gap={10}
        >
          <Button borderRadius={'5'} fontSize={20}>Home</Button>
        </Flex>
      </Box>
    )
  }
  export default Navbar