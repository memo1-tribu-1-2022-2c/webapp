import {
    Box,
    Grid,
    GridItem
  } from '@chakra-ui/react'
  import Navbar from '../components/Navbar'
  import ProyectCard from '../components/ProyectCard'
  
  const proyectos = [
    {
        id: "001",
        estado: "En Progreso",
        nombre: "Marbe Wall Revestiment",
        fechaInicio: "01/11/2022",
        finalizacionEstimada: "30 meses",
        tipoDeProyecto: 'Soporte'
    },
    {
        id: "002",
        estado: "Finalizdo",
        nombre: "Elevator Maintenance",
        fechaInicio: "01/06/2022",
        finalizacionEstimada: "1 mes",
        tipoDeProyecto: 'Desarrollo'
    },
    {
        id: "003",
        estado: "Nuevo",
        nombre: "Lower Bouffet Ceilling",
        fechaInicio: "01/01/2022",
        finalizacionEstimada: "3 meses",
        tipoDeProyecto: 'Soporte'
    }
  ]

  function Proyects() {
    return (
        <>
            <Navbar/>
            <Box border='0px' mt='10' rounded='xl' bg='gray.300' mx='10' pl='56' py='10'>
                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                    { proyectos.map((value,index) => (
                        <GridItem bg='white' key={index} w='70%' h='150' border='0px' rounded={'md'} >
                            <ProyectCard proyectInfo={value}/>
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </>
    );
  }
  
  export default Proyects;