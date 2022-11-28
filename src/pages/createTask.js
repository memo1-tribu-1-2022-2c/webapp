import {
    Box,
    Text,
    Input,
    Button,
    Flex,
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";


function CreateTask() {

    const navigate = useNavigate()
    const handleCreateProyect = () => {
        navigate("/proyectsList/002")
    }

    return (
        <>
        <Navbar/>
        <Flex bg='gray.300' mx='10' p='10' rounded='sm' mt='5' justifyContent='space-between'>
            <Input rounded='sm' bg='white' minH='16' w='xl' fontSize='28' placeholder='Nombre de la tarea'/>
            <Flex gap={5}>
                <Button borderRadius={'5'} fontSize={20}> Guardar Tarea </Button>
                <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}> Descartar Tarea </Button>
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
            <Box mt='5' rounded='sm' bg='white' mx='10'>
                <Input rounded='sm' minH='150px' textAlign='justify' />
            </Box>
            <Text mx='10' mt='5'>Fecha de inicio</Text>
            <Input minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm'/>
            <Text mx='10' mt='5'>Fecha de finalización</Text>
            <Input minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm'/>
            <Text mx='10' mt='5'>Horas estimadas</Text>
            <Input minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm'/>

        </Box>
    </>
    );
    }

export default CreateTask;