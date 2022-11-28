import {
    Box,
    Text,
    Input,
    Grid,
    GridItem,
    Button,
    Flex,
    Select,
    VStack,
    HStack,
    Center
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import TaskCard from '../components/Card'

const tareas = [
    {
        id: "001",
        estado: "Finalizada",
        nombre: "Buy the chinchulines",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "30 meses",
        colaboradores: '3'
    },
    {
        id: "002",
        estado: "Sin iniciar",
        nombre: "Start the fire",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "1 mes",
        colaboradores: '1'
    },
    {
        id: "001",
        estado: "Finalizada",
        nombre: "Buy the chinchulines",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "30 meses",
        colaboradores: '3'
    },
    {
        id: "002",
        estado: "Sin iniciar",
        nombre: "Start the fire",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "1 mes",
        colaboradores: '1'
    }
  ]


function CreateProyect() {

    return (
        <>
            <Navbar/>
            <Flex justifyContent='space-between' bg='gray.300' p='10' mx='10' mt='5' rounded='sm'>
                <Text border='0px' width='xl' fontSize='28' placeholder='Nombre del Proyecto'></Text>
                <Flex gap={5}>
                    <Button size='lg' borderRadius={'5'} fontSize={20}> Editar Proyecto </Button>
                    <Button size='lg' borderRadius={'5'} fontSize={20}> Volver </Button>
                </Flex>
            </Flex>
            <Box 
                border='0px' 
                maxH='full' 
                overflowY='auto'
                borderRadius='sm'
                bg='gray.300' 
                my='5' 
                mx='10' 
                py='5'
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
                <Box border='0px' py='2'>
                    <Box mx='60' p='5' bg='white' border='0px' borderRadius='md'>
                        <HStack border='0px' spacing='20' justifyContent='space-between'>
                            <Box>
                                <Text fontWeight='bold'>Descripción</Text>
                                <Text p='2' h='100' w='xl' border='0px'>asdfasdfa</Text>
                            </Box>
                            <VStack>
                                <Text fontWeight='bold'>Desarrollo</Text>
                                <Text>Horas estimadas: 10</Text>
                                <Text>Horas estimadas: 10</Text>
                            </VStack>
                            <VStack>
                                <Text borderRadius='md' bg='blue.100' px='2' py='1' size='sm'>En progreso</Text>
                                <Text>Iniciado 01/11/2022</Text>
                                <Text>Finalización en 2 semanas</Text>
                            </VStack>
                        </HStack>
                    </Box>
                    <Center>
                        <HStack border='0px' py='10' spacing='96'>
                            <Flex gap={10}>
                                <Input bg='white' width='xl' placeholder='Buscar proyecto...'/>
                                <Select bg='white' placeholder='Filtrar por...' width='60'>
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="En progreso">En progreso</option>
                                    <option value="Pausado">Pausado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </Select>
                            </Flex>
                            <Button borderRadius={'5'} fontSize={20}>Crear tarea</Button>
                        </HStack>
                    </Center>
                    <Box pl='40' py='10' border='0px'>
                        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                            { tareas.map((value,index) => (
                                <GridItem bg='white' key={index} w='80%' h='150' rounded={'md'} >
                                    <TaskCard info={value}/>
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
    }

export default CreateProyect;