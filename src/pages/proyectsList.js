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

function proyectsList() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const handleCreateProyect = () => {
    navigate("/proyectsList/createProyect")
    }

    return (
        <>
            <Navbar isProyectsPage={true}/>
            <Box overflowY='auto' m='10' maxH='full' rounded='xl' bg='gray.300' py='10'>
                <Flex p='10' justifyContent='space-between'>
                    <Flex gap={10}>
                        <Input bg='white' width='xl' placeholder='Buscar proyecto...'/>
                        <Select bg='white' placeholder='Filtrar por...' width='60'>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Pausado">Pausado</option>
                            <option value="Cancelado">Cancelado</option>
                        </Select>
                    </Flex>
                    <Button borderRadius={'5'} fontSize={20} onClick={() => handleCreateProyect()}>Crear nuevo proyecto</Button>
                </Flex>
                <Box pl='40' py='5'>
                    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                        { proyectos.map((value,index) => (
                            <GridItem bg='white' key={index} w='80%' h='150' rounded={'md'} >
                                <ProyectCard info={value}/>
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
  
export default proyectsList;