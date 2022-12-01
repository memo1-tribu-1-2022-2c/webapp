import {
    Box,
    Text,
    Input,
    Flex,
    Button,
    Select
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

function EditTask() {


    const location = useLocation()
    const {task, tasks} = location.state

    const navigate = useNavigate()
    const handleDiscardButton = () => {
        navigate(-1)
    }

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [state, setState] = useState(task.state)
    const [startingDate, setStartingDate] = useState(new Date(task.startingDate))
    const [endingDate, setEndingDate] = useState(new Date(task.endingDate))
    const [realEndingDate, setRealEndingDate] = useState(new Date(task.realEndingDate))
    const [priority, setPriority] = useState("")
    const [estimatedHours, setEstimatedHours] = useState("")
    const [workedHours, setWorkedHours] = useState("")
    const [previousTaskId, setPreviousTaskId] = useState(task.previousTaskId)
    const [roleToResourceId, setRoleToResourceId] = useState([])

    const tasksStates = ["NUEVO", "FINALIZADO", "EN_PROGRESO", "PAUSADO", "CANCELADO"]

    const handleSelect = (value) => {
        value === "" ? setPreviousTaskId(0) : setPreviousTaskId(value)
    }

    const edit = async() => {
        console.table(state)
        console.log(previousTaskId)
        const jsonBody = JSON.stringify({
            "id": task.id, /* FIJO */
            "name": name === "" ? task.name : name,
            "description": description === "" ? task.description : description,
            "state": state === "" ? task.state : state,
            "startingDate": startingDate,
            "endingDate": endingDate,
            "estimatedHours": estimatedHours === "" ? task.estimatedHours : estimatedHours,
            "workedHours": workedHours === "" ? task.workedHours : workedHours,
            "priority": task.priority,
            "previousTaskId": previousTaskId,
            "resources": task.resources
        })

        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonBody
        };

        const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/tasks`, requestOptions)
        console.table(jsonBody)
        if (response.ok) {
            handleDiscardButton()
        }
    }

    return (
        <>
            <Flex bg='gray.300' mx='10' p='10' rounded='sm' mt='5' justifyContent='space-between'>
                <Input rounded='sm' minH='16' bg='white' w='xl' fontSize='28' placeholder={task.name} onChange={(nombre) => setName(nombre.target.value)}/>
                <Flex gap={5}>
                    <Button borderRadius={'5'} fontSize={20} onClick={() => edit()}> Guardar Tarea </Button>
                    <Button borderRadius={'5'} fontSize={20} onClick={() => handleDiscardButton()}> Descartar Cambios </Button>
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
                    <Input border='0px' rounded='sm' minH='150px' textAlign='justify' placeholder={task.description} onChange={(descripcion) => setDescription(descripcion.target.value)}/>
                </Box>
                <Flex justifyContent='space-between' mx='10'>
                    <Box>
                        <Text mt='5'>Fecha de inicio</Text>
                        <DatePicker minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm' selected={startingDate} onChange={(date) => setStartingDate(date)} />
                        <Text mt='5'>Fecha de finalización</Text>
                        <DatePicker minH='50' bg='white' mt='2' mx='10' py='2' w='xl' rounded='sm' selected={endingDate} onChange={(date) => setEndingDate(date)} />
                    </Box>

                    <Box>
                        <Text mt='5'>Estado</Text>
                        <Select minH='50' border='0px' rounded='sm' bg='white' py='2' width='xl'
                            value={state}
                            placeholder={task.state}
                            onChange={(value) => {setState(value.target.value)}}
                        >
                            {tasksStates.map((state) => (
                                <option value={state}>{state}</option>
                            ))}
                        </Select>
                        <Text mt='5'>Horas trabajadas</Text>
                        <Input minH='50' border='0px' mt='2' rounded='sm' bg='white' py='2' w='xl' placeholder={task.workedHours} onChange={(hours) => setWorkedHours(hours.target.value)}/>
                        <Text mt='5'>Tarea previa</Text>
                        <Select
                            minH='50' border='0px' rounded='sm' bg='white' py='2' width='xl'
                            placeholder="Sin tarea previa"
                            onChange={(value) => {handleSelect(value.target.value)}}
                            value={(previousTaskId !== 0) ? previousTaskId : ""}
                        >
                            {tasks.map((task) => (
                                <option value={task.id}>{task.name}</option>
                            ))}
                        </Select>
                        <Text mt='5'>Horas estimadas</Text>
                        <Input minH='50' bg='white' mt='2' rounded='sm' border='0px' w='xl' placeholder={task.estimatedHours} onChange={(hours) => setEstimatedHours(hours.target.value)}/>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default EditTask
