import {
    Box,
    Flex,
    Input,
    Button,
    Select
  } from '@chakra-ui/react'
  import React from 'react'
  import { Link } from 'react-router-dom'
  
  function Navbar() {
  
    return (
      <Box bgColor="" w="full" display={{ base: 'none', md: 'flex' }}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="80%"
          margin="auto"
          py="5"
        >
            <Input width='auto' placeholder='Buscar proyecto...'/>
            <Select placeholder='Filtrar por...' width='auto'>
                <option value="Nuevo">Nuevo</option>
                <option value="Finalizado">Finalizado</option>
                <option value="En progreso">En progreso</option>
                <option value="Pausado">Pausado</option>
                <option value="Cancelado">Cancelado</option>
            </Select>
            <Button colorScheme='blue' borderRadius={'5'} fontSize={20}>Crear nuevo proyecto</Button>
            <Button colorScheme='blue' borderRadius={'5'} fontSize={20}>Home</Button>
        </Flex>
      </Box>
    )
  }
  export default Navbar