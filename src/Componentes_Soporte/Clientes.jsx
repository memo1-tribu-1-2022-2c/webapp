import React, { useState, useEffect } from 'react'
import NavbarGeneral from './/NavbarGeneral';
import { ChakraProvider, Flex, HStack, VStack, Box } from '@chakra-ui/react'
import ClientSearch from './subcomponentes/ClientSearch';
import Client from './subcomponentes/Client';

const Clientes = () => {
  const [allClients, setAllClients] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const fetchData = () => {
    setRefreshData(!refreshData);
  }

  useEffect( () => {
    fetch(`https://modulo-soporte.onrender.com/clients`)
    .then(response => response.json())
    .then(data => setAllClients(data))}
    , [refreshData]);

  return (
    <ChakraProvider>
      <NavbarGeneral />
      <Flex padding={5}>
        <ClientSearch refreshData = {fetchData} />
      </Flex>
      <VStack>
        <HStack>
          <Client />
        </HStack>
      </VStack>
    </ChakraProvider>
  )
}

export default Clientes