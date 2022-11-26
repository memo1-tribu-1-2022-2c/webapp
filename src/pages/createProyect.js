import {
    Box,
    Grid,
    Text
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'

  function CreateProyect() {
    return (
        <>
            <Navbar/>
            <Box border='0px' mt='10' rounded='xl' bg='gray.300' mx='10' pl='56' py='10'>
                <Text> Hola </Text>
            </Box>
        </>
    );
  }
  
  export default CreateProyect;