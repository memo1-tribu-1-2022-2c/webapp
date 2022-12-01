import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text
} from "@chakra-ui/react";

import ParteDeHorasCard from "../../components/ParteDeHorasCard";
import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { useState, useEffect } from "react";
import Routing from "../../routes/config";
import { tryGetAllPartes } from "./Backend";

function ListadoDePartes({legajo}) {
  const contexto = GetContextoRecursos();
  const [partesVisualizadas, setPartesVisualizadas] = useState(null);
  const [partesTotales, setPartesTotales] = useState(null);
  const navigate = useNavigateWParams();
  const crearParte = () => {
    navigate("crear");
  };
  const [actualizar, setActualizar] = useState(null);

  function filtrarPartes(e) {
    const filtro = e.target.value;
    if (filtro === "TODAS") {
      setPartesVisualizadas(partesTotales);
      return;
    }
    setPartesVisualizadas(partesTotales.filter((p) => p.status === filtro));
  }

  useEffect(() => {
    const getPartes = async () => {
      try {
        let response = await tryGetAllPartes();
        let partesCorrespondientes = response.data.filter((parte) => {return parte.workerId === legajo})
        setPartesTotales(partesCorrespondientes);
        setPartesVisualizadas(partesCorrespondientes);
      } catch (e) {
        console.log(e);
      }
    };
    getPartes();
  }, [actualizar]);

  return (
    <>
      {!partesVisualizadas ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <Flex
            bg="gray.300"
            mx="10"
            p="10"
            rounded="sm"
            mt="5"
            justifyContent="space-between"
          >
            <Flex gap={10}>
              <Select
                bg="white"
                placeholder="Filtrar por..."
                width="60"
                onChange={filtrarPartes}
              >
                <option value="TODAS">Todas</option>
                <option value="BORRADOR">En borrador</option>
                <option value="EMITIDO">Emitido</option>
                <option value="APROBADO">Aprobado</option>
                <option value="RECHAZADO">Rechazado</option>
              </Select>
            </Flex>
            <Button borderRadius={"5"} fontSize={20} onClick={crearParte}>
              Crear nuevo parte
            </Button>
          </Flex>
          <Box
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
            <Box pl="40" py="5">
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {partesVisualizadas.map((value, index) => (
                  <GridItem
                    bg="white"
                    key={index}
                    w="80%"
                    h="150"
                    rounded={"md"}
                  >
                    <ParteDeHorasCard
                      info={value}
                      path={`${Routing.Recursos}/partes/${value.id}`}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ListadoDePartes;
