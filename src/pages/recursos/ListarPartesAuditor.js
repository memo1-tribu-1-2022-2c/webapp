import { Box, Flex, Grid, GridItem, Input, Select } from "@chakra-ui/react";

import ParteDeHorasCard from "../../components/ParteDeHorasCard";
import { GetContextoRecursos } from "./Contexto";
import { useEffect, useState } from "react";
import Routing from "../../routes/config";

function ListarPartesAuditor() {
  const contexto = GetContextoRecursos();
  const [partesVisualizadas, setPartesVisualizadas] = useState(
    contexto.partes.getPartes()
  );

  function filtrarPartes(e) {
    const filtro = e.target.value;
    const partesTotales = contexto.partes.getPartes();
    if (filtro === "todas") {
      setPartesVisualizadas(partesTotales);
      return;
    }
    setPartesVisualizadas(partesTotales.filter((p) => p.estado === filtro));
  }

  useEffect(() => filtrarPartes("emitido"), []);

  return (
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
          <Input bg="white" width="xl" placeholder="Buscar parte..." />
          <Select
            bg="white"
            placeholder="Filtrar por..."
            width="60"
            onChange={filtrarPartes}
          >
            <option value="todas">Todas</option>
            <option value="en borrador">En borrador</option>
            <option value="emitido">Emitido</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </Select>
        </Flex>
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
              <GridItem bg="white" key={index} w="80%" h="150" rounded={"md"}>
                <ParteDeHorasCard
                  info={value}
                  path={`${Routing.Recursos}/validacion-partes/${value.id}`}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ListarPartesAuditor;
