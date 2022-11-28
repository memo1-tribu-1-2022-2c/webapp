import {
    Box,
    Text,
    Input,
    Button,
    Flex,
  } from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";

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


function CreateTask() {

    const navigate = useNavigate()
    const handleCreateProyect = () => {
        navigate("/proyectsList/002")
    }

    return (
        <>
            <Navbar/>
            <Box border='0px' mt='10' rounded='xl' bg='gray.300' mx='10' py='4'>
                <Flex mx='10' justifyContent='space-between'>
                    <Input border='0' width='xl' placeholder='Nombre de la tarea'/>
                    <Flex gap={5}>
                        <Button borderRadius={'5'} fontSize={20}> Guardar Tarea </Button>
                        <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}> Descartar Tarea </Button>
                    </Flex>
                </Flex>
                <Text mx='10' mt='16'>Descripción</Text>
                <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2'>
                    <Input border='1' py='14'/>
                </Box>
                <Text mx='10' mt='5'>Horas estimadas</Text>
                <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='xl'>
                    <Input border='1' width='xl'/>
                </Box>
                <Text mx='10' mt='5'>Fecha de inicio</Text>
                <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='xl'>
                    <Input border='1'/>
                </Box>
                <Text mx='10' mt='5'>Fecha de finalización</Text>
                <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='xl'>
                    <Input border='1'/>
                </Box>
            </Box>
        </>
    );
    }

export default CreateTask;