import React from 'react'
import NavbarGeneral from './/NavbarGeneral';
import { Center, ChakraProvider, HStack } from '@chakra-ui/react'

const Clientes = () => {
  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Center>
        <HStack>
          <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' width={100}/>
          <h1>Estoy en Clientes</h1>
        </HStack>
      </Center>
    </ChakraProvider>
  )
}

export default Clientes