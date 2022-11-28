import {
    Box,
    Text,
    Input,
    Flex,
    Button,
    Select
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'
  import { useNavigate } from "react-router-dom";

  function EditProyect() {

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
                        <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}> Descartar Cambios </Button>
                    </Flex>
                </Flex>
                <Text mx='10' mt='16'>Descripción</Text>
                <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='4'>
                    <Input border='1' py='14'/>
                </Box>
                <Flex justifyContent='space-between'> 
                    <Box>
                        <Text mx='10' mt='5'>Modulo</Text>
                        <Box border='0px' rounded='xl' bg='gray.100' mt='5' py='2' width='96' mx='10'>
                            <Select>
                                <option value="Soporte">Soporte</option>
                                <option value="Cliente">Cliente</option>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        <Text mx='10' mt='5'>Estado</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='60'>
                            <Select placeholder='Filtrar por...'>
                                <option value="Nuevo">Nuevo</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="En progreso">En progreso</option>
                                <option value="Pausado">Pausado</option>
                                <option value="Cancelado">Cancelado</option>
                            </Select>
                        </Box>
                    </Box>
                    <Box>
                        <Text mx='10' mt='5'>Horas estimadas</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='60'>
                            <Input border='1'/>
                        </Box>
                    </Box>
                    <Box>
                        <Text mx='10' mt='5'>Horas trabajadas</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='60'>
                            <Input border='1'/>
                        </Box>
                    </Box>
                </Flex>
                <Flex justifyContent='space-between'> 
                    <Box>
                        <Text mx='10' mt='5'>Fecha de inicio</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='96'>
                            <Input border='1'/>
                        </Box>
                        <Text mx='10' mt='5'>Fecha de finalización</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='2' width='96'>
                            <Input border='1'/>
                        </Box>
                    </Box>
                    <Box width='full'>
                        <Text mx='10' mt='5'>Tareas</Text>
                        <Box border='0px' mt='5' rounded='xl' bg='gray.100' mx='10' py='16'>
                            <Input border='1'/>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>
    );
  }
  
  export default EditProyect;