import {
    Box,
    Grid,
    Select,
    Input,
    GridItem,
    Button,
    Flex
} from '@chakra-ui/react'
import Navbar from '../components/Navbar'
import ProyectCard from '../components/Card'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function ProyectsList() {

    const [projects, setProjects] = useState([])
    const [projectsFilter, setProjectsFilter] = useState([])

    const navigate = useNavigate()
    const handleCreateProyect = () => {
        navigate("/proyectsList/createProyect")
    }

    const wrapperLoadProyects = async() => {
        await loadProyects()
    }

    const loadProyects = async() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch("https://squad2-2022-2c.herokuapp.com/api/v1/projects/all", requestOptions)
        const responseData = await response.json()
        setProjects(responseData)
        setProjectsFilter(responseData)
    }

    const filterProjects = (value) => {
        let filters = projects.filter(item => item.state === value)
        setProjectsFilter(filters)
    }

    useEffect(() => {
        wrapperLoadProyects()
    }, [])

    return (
        <>
            <Navbar isProyectsPage={true}/>
            <Flex bg='gray.300' mx='10' p='10' rounded='sm' mt='5' justifyContent='space-between'>
                <Flex gap={10}>
                    <Input bg='white' width='xl' placeholder='Buscar proyecto...'/>
                    <Select bg='white' placeholder='Filtrar por...' width='60' /* onChange={(value) => filterProjects(value)} */>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="En progreso">En progreso</option>
                        <option value="Pausado">Pausado</option>
                        <option value="Cancelado">Cancelado</option>
                    </Select>
                </Flex>
                <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}>Crear nuevo proyecto</Button>
            </Flex>
            <Box 
                overflowY='auto' 
                m='10' 
                maxH='full' 
                rounded='sm' 
                bg='gray.300' 
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
                <Box pl='40' py='5'>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        { projectsFilter.map((item) => (
                            <GridItem bg='white' key={item.projectId} w='80%' h='150' rounded={'md'} >
                                <ProyectCard info={item} id={item.projectId} path={`/proyectsList/${item.projectId}`}/>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
  
export default ProyectsList;