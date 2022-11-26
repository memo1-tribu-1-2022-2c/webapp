import {
    Box,
    Flex,
    Input,
    Button,
    Select
  } from '@chakra-ui/react'
  import React from 'react'
  import { useNavigate } from "react-router-dom";
  
  
  function Navbar({isProyectsPage}) {

    const navigate = useNavigate()
  
    const handleCreateProyect = () => {
      navigate("/proyectos/crearProyecto")
    }

    return (
      <Box border='0px' bg='gray.100' py='3' bgColor="" w="full" display={{ base: 'none', md: 'flex' }}>
        <Flex
          justifyContent={isProyectsPage ? "space-between" : "flex-end"}
          alignItems="center"
          w="80%"
          margin="auto"
          py="5"
        >
          {isProyectsPage &&
            <>
              <Input borderColor='blackAlpha.500' width='xl' placeholder='Buscar proyecto...'/>
              <Select borderColor='blackAlpha.400' placeholder='Filtrar por...' width='60'>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Pausado">Pausado</option>
                  <option value="Cancelado">Cancelado</option>
              </Select>
              <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}>Crear nuevo proyecto</Button>
            </>
          }
            <Button borderRadius={'5'} fontSize={20}>Home</Button>
        </Flex>
      </Box>
    )
  }
  export default Navbar