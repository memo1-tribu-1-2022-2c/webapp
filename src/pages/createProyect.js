import {
    Box,
    Grid,
    Text,
    Input,
    Flex,
    Button
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'

  function CreateProyect() {
    return (
        <>
            <Navbar/>
            <Box border='0px' mt='10' rounded='xl' bg='gray.300' mx='10' py='4'>
                <Flex mx='3' justifyContent='space-between'>
                    <Input border='0' width='xl' placeholder='Nombre del Proyecto'/>
                    <Flex gap={5}>
                        <Button borderRadius={'5'} fontSize={20}> Guardar Proyecto </Button>
                        <Button borderRadius={'5'} fontSize={20}> Descartar Proyecto </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
  }
  
  export default CreateProyect;