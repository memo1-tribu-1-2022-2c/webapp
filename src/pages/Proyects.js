import {
    Box,
    Center,
    Grid,
    GridItem,
    Text,
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
        finalizacionEstimada: "1 meses",
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
            <Box border='0px' ml='32'>
                {/* <Center> */}
                    <Grid templateColumns='repeat(2, 1fr)' gap={5}>
                        { proyectos.map((value,index) => (
                            <GridItem key={index} w='80%' h='150' border='1px' rounded={'md'} >
                                <ProyectCard proyectInfo={value}/>
                            </GridItem>
                        ))}
                    </Grid>
                {/* </Center> */}
            </Box>
        </>
    );
  }
  
  export default Proyects;