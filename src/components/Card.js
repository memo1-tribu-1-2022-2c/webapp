import React from 'react'
import {
  Text,
  Box,
  Flex
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function Card({info, path}) {
    return (
        <Box p='2' rounded='md'>
            <Link to={{pathname: path}}>
                <Flex mx='3' justifyContent='space-between'>
                    <Flex gap={1}>
                        <Text>{info.id} - </Text>
                        <Text>{info.nombre}</Text>
                    </Flex>
                    <Text borderRadius='md' bg='blue.100' px='2' py='1' size='sm'>{info.estado}</Text>
                </Flex>
                <Flex mt='5' justifyContent='space-between' mx='3'>
                    <Text>Iniciado {info.fechaInicio}</Text>
                    <Text fontWeight='bold'>{info.tipoDeProyecto}</Text>
                </Flex>
                <Text mt='5' mx='3'>Finalización en {info.finalizacionEstimada}</Text>
            </Link>
        </Box>
    );
  }
  
  export default Card;