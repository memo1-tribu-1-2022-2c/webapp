import {
    Box,
    Text,
    Input,
    Button,
    Flex,
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react'


function CreateTask() {

    const location = useLocation()
    const {id} = location.state

    const navigate = useNavigate()
    const handleCreateProyect = () => {
        navigate(-1)
    }

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [state, setState] = useState("")
  /*   const [startingDate, setStartingDate] = useState(new Date(task.startingDate))
    const [endingDate, setEndingDate] = useState(new Date(task.endingDate))
    const [realEndingDate, setRealEndingDate] = useState(new Date(task.realEndingDate)) */
    const [priority, setPriority] = useState("")
    const [estimatedHours, setEstimatedHours] = useState("")
    const [workedHours, setWorkedHours] = useState("")
    const [roleToResourceId, setRoleToResourceId] = useState([])

    const createTask = async() => {
        const jsonBody = JSON.stringify({
            "projectId": id, /* FIJO */
            "name": name === "" ? "No name" : name,
            "description": description === "" ? "No description" : description,
            "state": "NUEVO", /* FIJO */
            /* "startingDate": task.startingDate,
            "endingDate": task.endingDate,
            "realEndingDate": task.realEndingDate,
            "estimatedHours": estimatedHours === "" ? task.estimatedHours : estimatedHours, */
            /* "priority": task.priority, */
            /* "previousTaskId": task.previousTaskId, */
            /* "resources": task.resources */
        })

        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonBody
        };

        /* const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/createTask`, requestOptions) */
        console.table(jsonBody)
        /* if (response.ok) {
            handleCreateProyect()
        } */
    }

    return (
        <>
        <Navbar/>
        <Flex bg='gray.300' mx='10' p='10' rounded='sm' mt='5' justifyContent='space-between'>
            <Input rounded='sm' bg='white' minH='16' w='xl' fontSize='28' placeholder='Nombre de la tarea' onChange={(nombre) => setName(nombre.target.value)}/>
            <Flex gap={5}>
                <Button borderRadius={'5'} fontSize={20} onClick={() => createTask()}> Guardar Tarea </Button>
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
                <Input rounded='sm' minH='150px' textAlign='justify' onChange={(descripcion) => setDescription(descripcion.target.value)}/>
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