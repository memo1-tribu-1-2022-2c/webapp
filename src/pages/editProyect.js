import {
    Box,
    Text,
    Input,
    Flex,
    Button,
    Select,
    VStack
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'
  import { useNavigate, useLocation } from "react-router-dom";
  import { useState } from 'react'
  import DatePicker from "react-datepicker"
  import "react-datepicker/dist/react-datepicker.css";

  function EditProyect() {

    const location = useLocation()
    const {project} = location.state

    const navigate = useNavigate()
    const handleDiscardButton = () => {
        navigate(-1)
    }

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [state, setState] = useState("")
    const [startingDate, setStartingDate] = useState(new Date())
    const [endingDate, setEndingDate] = useState("")
    const [projectType, setProjectType] = useState("")
    const [versionId, setVersionId] = useState("")
    const [roleToResourceId, setRoleToResourceId] = useState([])

    const proyectStates = ["NUEVO", "FINALIZADO", "EN_PROGRESO", "PAUSADO", "CANCELADO"]
    const [startDate, setStartDate] = useState(new Date())
    console.log(startingDate)
    const edit = async() => {
        console.table(state)
        const jsonBody = JSON.stringify({
            "id": project.projectId, /* FIJO */
            "name": name == "" ? project.name : name,
            "description": description == "" ? project.description : description,
            "state": state == "" ? project.state : state,
            "startingDate": project.startingDate,
            "endingDate": project.endingDate,
            "projectType": project.projectType,
            "clientId": project.clientId, /* FIJO */
            "versionId": project.versionId,
            "roleToResourceId": project.roleToResourceId
        })

        const requestOptions = {
            method: 'PUT',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonBody
        };

        const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects`, requestOptions)
        console.table(jsonBody)
        if (response.ok) {
            handleDiscardButton()
        }
    }

    return (
        <>
            <Navbar/>
            <Flex bg='gray.300' mx='10' p='10' rounded='sm' mt='5' justifyContent='space-between'>
                <Input rounded='sm' minH='16' bg='white' w='xl' fontSize='28' placeholder={project.name} name="name" onChange={(nombre) => setName(nombre.target.value)}/>
                <Flex gap={5}>
                    <Button borderRadius={'5'} fontSize={20} onClick={() => edit()}> Guardar Proyecto </Button>
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
                    <Input border='0px' rounded='sm' minH='150px' textAlign='justify' placeholder={project.description} onChange={(descripcion) => setDescription(descripcion.target.value)}/>
                </Box>
                <Flex justifyContent='space-between' mx='10'> 
                    <Box>
                        <Text mt='5'>Módulo</Text>
                        <Select placeholder='' minH='50' border='0px' rounded='sm' bg='white' py='2' width='md'>
                            <option value="Módulo 1">Módulo 1</option>
                            <option value="Módulo 2">Módulo 2</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text mt='5'>Estado</Text>
                        <Select minH='50' border='0px' rounded='sm' bg='white' py='2' width='72' value={state} placeholder={project.state} onChange={(value) => {setState(value.target.value)}}>
                            {proyectStates.map((state) => (
                                <option value={state}>{state}</option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <Text mt='5'>Horas estimadas</Text>
                        <Input minH='50' border='0px' mt='2' bg='white' py='2' w='72' rounded='sm'/>
                    </Box>
                    <Box>
                        <Text mt='5'>Horas trabajadas</Text>
                        <Input minH='50' border='0px' mt='2' bg='white' py='2' w='72' rounded='sm'/>
                    </Box>
                </Flex>
                <Flex justifyContent='space-between' mx='10'> 
                    <Box>
                        <Text mt='5'>Fecha de inicio</Text>
                        <DatePicker /* minH='50' border='0px' mt='2' bg='white' py='2' w='md' rounded='sm'  */placeholder={project.startingDate} selected={startingDate} onChange={(date) => setStartingDate(date)} />
                        {/* <Input minH='50' border='0px' mt='2' bg='white' py='2' w='md' rounded='sm'/> */}
                        <Text mt='5'>Fecha de finalización</Text>
                        <Input minH='50' border='0px' mt='2' bg='white' py='2' w='md' rounded='sm'/>
                    </Box>
                    <Box w='full' ml='40'>
                        <Text mt='5'>Tareas</Text>
                        <Box 
                            overflowY='auto' 
                            mt='5' 
                            minH='140px' 
                            maxH='140px' 
                            rounded='sm' 
                            py='2' 
                            px='10' 
                            bg='white'
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
                            <VStack justifyContent='flex-start' justifyItems='left'>
                                <Text alignSelf='flex-start'>001 Buy the chinchulines</Text>
                                <Text alignSelf='flex-start'>002 Start the fire</Text>
                            </VStack>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>
    );
  }
  
  export default EditProyect;