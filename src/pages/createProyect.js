import {
    Box,
    Text,
    Input,
    Flex,
    Button,
    Select
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'
  import { useNavigate } from "react-router-dom";

  function CreateProyect() {

    const navigate = useNavigate()
    const handleDiscardButton = () => {
        navigate("/proyectsList")
    }

    return (
        <>
            <Navbar/>
            <Flex bg='gray.300' mx='10' p='10' rounded='sm' mt='5' justifyContent='space-between'>
                <Input rounded='sm' minH='16' bg='white' w='xl' fontSize='28' placeholder='Nombre del proyecto'/>
                <Flex gap={5}>
                    <Button borderRadius={'5'} fontSize={20}> Guardar Proyecto </Button>
                    <Button borderRadius={'5'} fontSize={20} onClick={() => handleDiscardButton()}> Descartar Proyecto </Button>
                </Flex>
            </Flex>
            <Box 
                overflowY='auto'
                maxH='full'
                rounded='sm' 
                bg='gray.300' 
                m='10' 
                py='10'
                css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'gray',
                      borderRadius: '24px',
                    }
                }}
            >

                <Text mx='10'>Descripción</Text>
                <Box border='0px' mt='5' rounded='sm' bg='white' mx='10'>
                    <Input border='0px' rounded='sm' minH='150px' textAlign='justify' />
                </Box>
                <Flex justifyContent='space-between' mx='10'> 
                    <Box>
                        <Text mt='5'>Modulo</Text>
                        <Select minH='50' border='0px' rounded='sm' bg='white' mt='2' py='2' width='xl'>
                            <option value="Soporte">Soporte</option>
                            <option value="Cliente">Cliente</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text mt='5'>Horas estimadas</Text>
                        <Input minH='50' bg='white' mt='2' rounded='sm' border='0px' w='xl'/>
                    </Box>
                </Flex>
                <Text mx='10' mt='5'>Fecha de inicio</Text>
                <Input minH='50' border='0px' mt='2' bg='white' mx='10' py='2' width='xl' rounded='sm'/>
                <Text mx='10' mt='5'>Fecha de finalización</Text>
                <Input minH='50' border='0px' mt='2' rounded='sm' bg='white' mx='10' py='2' width='xl'/>

            </Box>
        </>
    );
  }
  
  export default CreateProyect;