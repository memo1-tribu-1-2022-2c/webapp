import {
    Box,
    Text,
    Input,
    Button,
    Flex,
    Select
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";


function CreateTask() {

    const prioritys = ["NONE", "LOW", "MEDIUM", "HIGH", "URGENT"]

    const location = useLocation()
    const {id, tasks} = location.state

    console.table(tasks)

    const navigate = useNavigate()
    const handleCreateProyect = () => {
        navigate(-1)
    }

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [startingDate, setStartingDate] = useState(new Date())
    const [endingDate, setEndingDate] = useState(new Date())
    const [priority, setPriority] = useState("NONE")
    const [estimatedHours, setEstimatedHours] = useState("")
    const [roleToResourceId, setRoleToResourceId] = useState([])
    const [previousTaskId, setPreviousTaskId] = useState(0)

    const createTask = async() => {
        const jsonBody = JSON.stringify({
            "projectId": id, /* FIJO */
            "name": name === "" ? "No name" : name,
            "description": description === "" ? "No description" : description,
            "state": "NUEVO", /* FIJO */
            "startingDate": startingDate,
            "endingDate": endingDate,
            "realEndingDate": endingDate, /* FIJO */
            "estimatedHours": estimatedHours === "" ? 0 : estimatedHours,
            "priority": priority,
            "previousTaskId": previousTaskId === "" ? 0 : previousTaskId,
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
            <Box style={{marginLeft: "40px"}}>
                <DatePicker minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm' selected={startingDate} onChange={(date) => setStartingDate(date)} />
            </Box>
            {/* <Input minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm'/> */}
            <Text mx='10' mt='5'>Fecha de finalización</Text>
            <Box style={{marginLeft: "40px"}}>
                <DatePicker minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm' selected={endingDate} onChange={(date) => setEndingDate(date)} />
            </Box>
            {/* <Input minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm'/> */}
            <Text mx='10' mt='5'>Horas estimadas</Text>
            <Input minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm' onChange={(hours) => setEstimatedHours(hours.target.value)}/>
            <Text mx='10' mt='5'>Prioridad</Text>
            <Select minH='50' border='0px' rounded='sm' bg='white' mx='10' py='2' width='xl' onChange={(value) => {setPriority(value.target.value)}}>
                {prioritys.map((prio) => (
                    <option value={prio}>{prio}</option>
                ))}
            </Select>
            <Text mx='10' mt='5'>Tarea requerida</Text>
            <Select minH='50' border='0px' rounded='sm' bg='white' mx='10' py='2' width='xl' placeholder='Ninguno' onChange={(value) => {setPreviousTaskId(value.target.value)}}>
                {tasks.map((task) => (
                    <option value={task.id}>{task.name}</option>
                ))}
            </Select>
        </Box>     
    </>
    );
    }

export default CreateTask;