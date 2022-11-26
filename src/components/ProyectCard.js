import React from 'react'
import {
  Text,
  Box,
  Flex
} from '@chakra-ui/react'

function ProyectCard({proyectInfo}) {
    return (
        <Box p='2' rounded='md'>
            <Flex mx='3' justifyContent='space-between'>
                <Flex gap={1}>
                    <Text>{proyectInfo.id} - </Text>
                    <Text>{proyectInfo.nombre}</Text>
                </Flex>
                <Text borderRadius='md' bg='blue.100' px='2' py='1' size='sm'>{proyectInfo.estado}</Text>
            </Flex>
            <Flex mt='5' justifyContent='space-between' mx='3'>
                <Text>{proyectInfo.fechaInicio}</Text>
                <Text fontWeight='bold'>{proyectInfo.tipoDeProyecto}</Text>
            </Flex>
            
            <Text mt='5' mx='3'>{proyectInfo.finalizacionEstimada}</Text>
        </Box>
    );
  }
  
  export default ProyectCard;