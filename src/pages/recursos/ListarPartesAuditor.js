import { Box, Flex, Grid, GridItem, Input, Select } from "@chakra-ui/react";

import ParteDeHorasCard from "../../components/ParteDeHorasCard";
import { useEffect, useState } from "react";
import Routing from "../../routes/config";
import { tryGetAllPartes } from "./Backend";

function ListarPartesAuditor() {
  const [partes, setPartes] = useState([]);
  const [filtro, setFiltro] = useState("EMITIDO");

  useEffect(() => {
    const getPartes = async () => {
      try {
        let response = await tryGetAllPartes();

        setPartes(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPartes();
  }, []);

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
            width="60"
            onChange={(e) => setFiltro(e.target.value)}
            value={filtro}
          >
            <option value="TODAS">Todas</option>
            <option value="BORRADOR">En borrador</option>
            <option value="EMITIDO">Emitido</option>
            <option value="APROBADO">Aprobado</option>
            <option value="RECHAZADO">Rechazado</option>
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
            {partes
              .filter((p) => p.status.toUpperCase() === filtro.toUpperCase())
              .map((p) => (
                <GridItem bg="white" key={p.id} w="80%" h="150" rounded={"md"}>
                  <ParteDeHorasCard
                    info={p}
                    path={`${Routing.Recursos}/validacion-partes/${p.id}`}
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
