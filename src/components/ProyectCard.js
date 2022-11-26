import React from 'react'
import {
  Text,
  Button,
  Box,
  Flex
} from '@chakra-ui/react'

function ProyectCard({proyectInfo}) {
    return (
        <Box p='2'>
            <Flex mx='3' justifyContent='space-between'>
                <Flex gap={1}>
                    <Text>{proyectInfo.id} - </Text>
                    <Text>{proyectInfo.nombre}</Text>
                </Flex>
                <Button size='sm'>{proyectInfo.estado}</Button>
            </Flex>
            <Flex mt='5' justifyContent='space-between' mx='3'>
                <Text>{proyectInfo.fechaInicio}</Text>
                <Text>{proyectInfo.tipoDeProyecto}</Text>
            </Flex>
            
            <Text mt='5' mx='3'>{proyectInfo.finalizacionEstimada}</Text>
        </Box>
    );
  }
  
  export default ProyectCard;