import {
    Box,
    Text,
    Input,
    Button,
    Flex,
    VStack,
    HStack
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

function Proyect() {

    const [project, setProject] = useState()
    const [tasks, setTasks] = useState([])

    const [loaded, setLoaded] = useState(false)
    const [loaded2, setLoaded2] = useState(false)

    const location = useLocation()
    const {id} = location.state

    const navigate = useNavigate()

    const handleBackButton = () => {
        navigate(-1)
    }

    const handleEditProyect = () => {
        navigate(`/proyectsList/${id}/editProyect`, {state: {project: project}})
    }

    const handleCreateTask = () => {
        navigate(`/proyectsList/${id}/createTask`)
    }

    const handleGanttTanksSelect = (task) => {
        navigate(`/proyectsList/${id}/${task.id}`)
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
        if (responseData) {
            setProject(responseData)
            setLoaded(true)
        }
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
        if (responseData.length !== 0) {
            responseData.map((task) => {
                task['end'] = new Date(task['endingDate'].split("T")[0])
                task['start'] = new Date(task['startingDate'].split("T")[0])
                task['dependencies'] = [task['previousTaskId']]
                task['type'] = 'task'
                task['progress'] = 0
                delete task['endingDate']
                delete task['startingDate']
                delete task['previousTaskId']
            })
            setTasks(responseData)
            setLoaded2(true)
        }

        
    }

    useEffect(() => {
        wrapperGetProjectInfo()
        wrapperGetTasks()
    },[])

    return (
        <>
            <Navbar/>
            <Flex justifyContent='space-between' bg='gray.300' p='10' mx='10' mt='5' rounded='sm'>
                { loaded ?
                    (<Text border='0px' width='xl' fontSize='28'> {project.projectId} - {project.name} </Text>) 
                    :
                    (<Text border='0px' width='xl' fontSize='28'></Text>) 
                }
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
                <Box py='2'>
                    <Box mx='24' p='5' bg='white' borderRadius='md'>
                        {
                            loaded ? (
                            <HStack spacing='20' justifyContent='space-between'>
                            <Box>
                                <Text fontWeight='bold'>Descripción</Text>
                                <Text p='2' h='100' w='xl'>{project.description}</Text>
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
                    <Flex mx='24' justifyContent='space-between' pt='10' pb='5' spacing='96'>
                        <Input border='0px' bg='white' width='xl' placeholder='Buscar tarea...'/>
                        <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateTask()}>Crear tarea</Button>
                    </Flex>
                    <Box pt='5' pb='10' px='5' border='0px'>
                        {
                            loaded2 ? 
                            <Gantt
                                listCellWidth={""} 
                                locale={"spa"} 
                                tasks={tasks} 
                                onClick={(task) => handleGanttTanksSelect(task)} 
                            />
                            : <></>
                        }
                    </Box>
                </Box>
            </Box>
        </>
    );
    }

export default Proyect;