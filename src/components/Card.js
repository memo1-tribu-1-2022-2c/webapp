import React from 'react'
import {
  Text,
  Box,
  Flex
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function Card({info, path, id}) {
    return (
        <Box p='2' rounded='md'>
            <Link to={{pathname: path}} state={{id:id}}>
                <Flex mx='3' justifyContent='space-between'>
                    <Flex gap={1}>
                        <Text>{info.projectId} - </Text>
                        <Text>{info.name}</Text>
                    </Flex>
                    <Text borderRadius='md' bg='blue.100' px='2' py='1' size='sm' fontWeight='bold'>{info.state}</Text>
                </Flex>
                <Flex mt='5' justifyContent='space-between' mx='3'>
                    <Text>Iniciado en {info.startingDate && info.startingDate.split("T")[0]}</Text>
                    <Text fontWeight='bold'>{info.projectType}</Text>
                </Flex>
                <Text mt='5' mx='3'>Finalización en {info.endingDate && info.endingDate.split("T")[0]}</Text>
            </Link>
        </Box>
    );
  }
  
  export default Card;