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
    HStack
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import TaskCard from '../components/Card'
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';

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
        id: "003",
        estado: "Finalizada",
        nombre: "Buy the chinchulines",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "30 meses",
        colaboradores: '3'
    },
    {
        id: "004",
        estado: "Sin iniciar",
        nombre: "Start the fire",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "1 mes",
        colaboradores: '1'
    }
  ]


function Proyect() {

    const [project, setProject] = useState()
    const [tasks, setTasks] = useState()

    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)

    const location = useLocation()
    const {id} = location.state

    const navigate = useNavigate()
    const handleBackButton = () => {
        navigate("/proyectsList")
    }

    const handleEditProyect = () => {
        navigate(`/proyectsList/${id}/editProyect`)
    }

    const handleCreateTask = () => {
        navigate(`/proyectsList/${id}/createTask`)
    }

    const wrapperGetProjectInfo = async() => {
        await getProjectInfo()
    }

    const getProjectInfo = async() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${id}`, requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        setProject(responseData)
        setLoaded(true)
    }

    const wrapperGetTasks = async() => {
        await getTasks()
    }

    const getTasks = async() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${id}/tasks`, requestOptions)
        const responseData = await response.json()
        console.log(responseData)
        setTasks(responseData)
        setLoaded2(true)
    }

    useEffect(() => {
        wrapperGetProjectInfo()
        wrapperGetTasks()
    }, [])

    return (
        <>
            <Navbar/>
            <Flex justifyContent='space-between' bg='gray.300' p='10' mx='10' mt='5' rounded='sm'>
                <Text border='0px' width='xl' fontSize='28'></Text>
                <Flex gap={5}>
                    <Button size='lg' borderRadius={'5'} fontSize={20} onClick={() => handleEditProyect()}> Editar Proyecto </Button>
                    <Button size='lg' borderRadius={'5'} fontSize={20} onClick={() => handleBackButton()}> Volver </Button>
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
                    <Box mx='24' p='5' bg='white' border='0px' borderRadius='md'>
                        {
                            loaded ? (
                            <HStack border='0px' spacing='20' justifyContent='space-between'>
                            <Box>
                                <Text fontWeight='bold'>Descripción</Text>
                                <Text p='2' h='100' w='xl' border='0px'>{project.description}</Text>
                            </Box>
                            <VStack>
                                <Text fontWeight='bold'>Desarrollo</Text>
                                <Text>Horas estimadas: {project.estimatedHours && project.estimatedHours.split("T")[0]}</Text>
                                <Text>Horas estimadas: {project.estimatedHours && project.estimatedHours.split("T")[0]}</Text>
                            </VStack>
                            <VStack>
                                <Text borderRadius='md' bg='blue.100' px='2' py='1' size='sm'>{project.state}</Text>
                                <Text>Iniciado {project.startingDate && project.startingDate.split("T")[0]}</Text>
                                <Text>Finalización {project.endingDate && project.endingDate.split("T")[0]}</Text>
                            </VStack>
                        </HStack> ) : <></>
                        }
                    </Box>
                        <Flex mx='24' justifyContent='space-between' border='0px' py='10' spacing='96'>
                            <Flex gap={10}>
                                <Input bg='white' width='xl' placeholder='Buscar tarea...'/>
                                <Select bg='white' placeholder='Filtrar por...' width='32'>
                                    <option value="Nuevo">Nuevo</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="En progreso">En progreso</option>
                                    <option value="Pausado">Pausado</option>
                                    <option value="Cancelado">Cancelado</option>
                                </Select>
                            </Flex>
                            <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateTask()}>Crear tarea</Button>
                        </Flex>
                    <Box py='10' border='0px'>
                        {
                            loaded2 ? (
                        <Grid justifyItems='center' templateColumns='repeat(2, 1fr)' gap={6}>
                            { tasks.map((item) => (
                                <GridItem bg='white' key={item.id} w='85%' h='150' rounded={'md'} >
                                    <TaskCard info={item} path={`/proyectsList/${id}/${item.id}`}/>
                                </GridItem>
                            ))}
                        </Grid> ) : <></>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
    }

export default Proyect;