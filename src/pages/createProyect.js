import {
    Box,
    Text,
    Input,
    Flex,
    Button
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'
  import { useNavigate } from "react-router-dom";

  function CreateProyect() {

    const navigate = useNavigate()
    const handleCreateProyect = () => {
        navigate("/proyectsList")
    }

    return (
        <>
            <Navbar/>
            <Box border='0px' mt='10' rounded='xl' bg='gray.300' mx='10' py='4' mb='5'>
                <Flex mx='10' justifyContent='space-between'>
                    <Input border='0' width='xl' placeholder='Nombre del Proyecto'/>
                    <Flex gap={5}>
                        <Button borderRadius={'5'} fontSize={20}> Guardar Proyecto </Button>
                        <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}> Descartar Proyecto </Button>
                    </Flex>
                </Flex>
                <Text mx='10' mt='16'>Descripción</Text>
                <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='4'>
                    <Input border='1'/>
                </Box>
                <Flex justifyContent='space-between'>
                    <Box>
                        <Text mx='10' mt='5'>Modulo</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2'>
                            <Input border='1' width='xl'/>
                        </Box>
                    </Box>
                    <Box>
                        <Text mx='10' mt='5'>Horas estimadas</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2'>
                            <Input border='1' width='xl'/>
                        </Box>
                    </Box>
                </Flex>
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
  
  export default CreateProyect;