import { EditIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  IconButton,
  Text,
} from "@chakra-ui/react";

import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { useState, useEffect } from "react";
import Routing from "../../routes/config";
import { tryGetAllPartes } from "./Backend";
import { Link, useSearchParams } from "react-router-dom";

function ListadoDePartes({ legajo }) {
  const contexto = GetContextoRecursos();
  const [partesVisualizadas, setPartesVisualizadas] = useState(null);
  const [partesTotales, setPartesTotales] = useState(null);
  const navigate = useNavigateWParams();
  const crearParte = () => {
    navigate("crear");
  };
  const searchParams = useSearchParams()[0];

  function filtrarPartes(e) {
    const filtro = e.target.value;
    if (filtro === "TODAS" || filtro === "") {
      setPartesVisualizadas(partesTotales);
      return;
    }
    setPartesVisualizadas(partesTotales.filter((p) => p.status === filtro));
  }

  useEffect(() => {
    const getPartes = async () => {
      try {
        let response = await tryGetAllPartes();
        let partesCorrespondientes = response.data.filter((parte) => {
          return parte.workerId === legajo;
        });
        contexto.misPartes.set(partesCorrespondientes);
        setPartesTotales(partesCorrespondientes);
        setPartesVisualizadas(partesCorrespondientes);
      } catch (e) {
        console.log(e);
      }
    };
    getPartes();
  });

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
            <Box>
              <TableContainer marginLeft={5}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th isNumeric>Fecha de inicio</Th>
                      <Th isNumeric>Fecha de fin</Th>
                      <Th>Estado</Th>
                      <Th>Tipo</Th>
                      <Th>Inspeccionar</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {partesVisualizadas.map((parte) => {
                      let path = `${Routing.Recursos}/partes/${parte.id}`;

                      return (
                        <Tr key={parte.id}>
                          <Td>{parte.id}</Td>
                          <Td isNumeric>{parte.startTime}</Td>
                          <Td isNumeric> {parte.endTime}</Td>
                          <Td> {parte.status}</Td>
                          <Td> {parte.type}</Td>
                          <Th>
                            <Link
                              to={{
                                pathname: path,
                                search: "?" + searchParams,
                              }}
                            >
                              <IconButton
                                onClick={() => {
                                  contexto.parteSeleccionado.set(parte);
                                  console.log(parte);
                                }}
                                icon={<EditIcon />}
                              />
                            </Link>
                          </Th>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default ListadoDePartes;
