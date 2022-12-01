import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Stack,
  filter,
  Heading,
  FormLabel,
} from "@chakra-ui/react";
import ProyectCard from "../../components/Card";
import {tryGetProyectos} from "./Backend";
import { useEffect, useState } from "react";

export default function ReportesProyectos({setTitle}) {
  const [proyectosTotales, setProyectosTotales] = useState(null);
  const [proyectosVisualizados, setProyectosVisualizados] = useState(null);
  const [actualizar, setActualizar] = useState(false);

  function filtrarProyectos(e) {
    const filtro = e.target.value;
    if (filtro === "TODOS") {
      setProyectosVisualizados(proyectosTotales);
      return;
    }
    setProyectosVisualizados(proyectosTotales.filter((p) => p.state === filtro));
  }

  function filtrarPorNombre(e) {
    const filtro = e.target.value;

    if (filtro === "") {
      setProyectosVisualizados(proyectosTotales);
      return;
    }

    //chequear si la string es numerica
    
    setProyectosVisualizados(
      proyectosTotales.filter((p) =>
          p.name.toString().toLowerCase().startsWith(filtro.toLowerCase())
        )
      );
      return;
    
  }

  function filtrarPorID(e) {
    const filtro = e.target.value;

    if (filtro === "") {
      setProyectosVisualizados(proyectosTotales);
      return;
    }

    //chequear si la string es numerica
    if (!isNaN(filtro) && !isNaN(parseFloat(filtro))) {
      setProyectosVisualizados(proyectosTotales.filter((p) =>
      p.projectId.toString().toLowerCase().startsWith(filtro.toLowerCase())
    )) 
      return;
    }
  }

  useEffect(() => {
    const getProyectos = async () => {
      try {
        let response = await tryGetProyectos();
        console.log(response.data);
        setProyectosTotales(response.data);
        setProyectosVisualizados(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getProyectos();
  },[actualizar])

  
  //setTitle("Reportes de Proyectos");
  return (
    <>
    {proyectosVisualizados ? (<Box
        overflowY="auto"
        m="10"
        maxH="full"
        rounded="sm"
        bg="gray.300"
        py="10"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "24px",
          },
        }}
      >
        <Box display={"flex"} gap={10}>
          <Input
            marginLeft={5}
            bg="white"
            w={"40%"}
            placeholder="Buscar proyecto por nombre..."
            onChange={filtrarPorNombre}
          />
          <Input
            marginLeft={5}
            bg="white"
            w={"40%"}
            placeholder="Buscar proyecto por ID..."
            onChange={filtrarPorID}
          />
          <Select bg="white" placeholder="Filtrar por..." width="60" onChange={filtrarProyectos}>
            <option value="NUEVO">Nuevo</option>
            <option value="EN_PROGRESO">En Progreso</option>
            <option value="PAUSADO">Pausado</option>
            <option value="FINALIZADO">Finalizado</option>
            <option value="CANCELADO">Cancelado</option>
            <option value="TODOS">Todos</option>
          </Select>
        </Box>
        <Box pl="40" py="5">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {proyectosVisualizados.map((value, index) => (
              <GridItem bg="white" key={index} w="80%" h="150" rounded={"md"}>
                <ProyectCard
                  info={value}
                  path={null}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
        
      </Box>) : (<Text>Cargando...</Text>)}
      
    </>
  );
}
