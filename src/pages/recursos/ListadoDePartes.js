import { EditIcon } from "@chakra-ui/icons";

import {
  Box,
  Button,
  Center,
  Flex,
  Select,
  Spinner,
  useBoolean,
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
} from "@chakra-ui/react";

import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { useState, useEffect } from "react";
import Routing from "../../routes/config";
import { getErrorMessage, tryGetAllPartes } from "./Backend";
import { Link, useSearchParams } from "react-router-dom";
import { capitalize } from "./utils";

function ListadoDePartes({ legajo }) {
  const contexto = GetContextoRecursos();
  const [partesVisualizadas, setPartesVisualizadas] = useState([]);
  const [partesTotales, setPartesTotales] = useState([]);
  const [filtro, setFiltro] = useState("EMITIDO");
  const navigate = useNavigateWParams();
  const crearParte = () => {
    navigate("crear");
  };
  const searchParams = useSearchParams()[0];
  const [isLoading, loading] = useBoolean(false);

  function filtrarPartes(filtro) {
    setFiltro(filtro);
    if (filtro === "TODAS" || filtro === "") {
      setPartesVisualizadas(partesTotales);
      return;
    }
    setPartesVisualizadas(
      partesTotales.filter((p) => p.status.toUpperCase() === filtro)
    );
  }

  useEffect(() => {
    filtrarPartes("EMITIDO");
    const getPartes = async () => {
      loading.on();
      try {
        let response = await tryGetAllPartes();
        let partesCorrespondientes = response.data.filter((parte) => {
          return parte.workerId === legajo;
        });
        contexto.misPartes.set(partesCorrespondientes);
        setPartesTotales(partesCorrespondientes);
        setPartesVisualizadas(partesCorrespondientes);
      } catch (error) {
        console.log(getErrorMessage(error));
      }
      loading.off();
    };
    getPartes();
    // eslint-disable-next-line
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
          <Select
            bg="white"
            width="60"
            value={filtro}
            onChange={(e) => filtrarPartes(e.target.value)}
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
                  <Th>Fecha de inicio</Th>
                  <Th>Fecha de fin</Th>
                  <Th>Estado</Th>
                  <Th>Tipo</Th>
                  <Th>Inspeccionar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {partesVisualizadas.map((p) =>
                  returnParte(p, contexto.parteSeleccionado, searchParams)
                )}
              </Tbody>
            </Table>
          </TableContainer>
          {isLoading ? (
            <Center mt={30}>
              <Spinner size="xl" />
            </Center>
          ) : null}
        </Box>
      </Box>
    </>
  );
}

const returnParte = (parte, parteSeleccionado, searchParams) => {
  let path = `${Routing.Recursos}/partes/${parte.id}`;

  return (
    <Tr key={parte.id}>
      <Td>{parte.id}</Td>
      <Td>{parte.startTime}</Td>
      <Td>{parte.endTime}</Td>
      <Td>{capitalize(parte.status)}</Td>
      <Td>{capitalize(parte.type)}</Td>
      <Td>
        <Link
          to={{
            pathname: path,
            search: "?" + searchParams,
          }}
        >
          <IconButton
            onClick={() => parteSeleccionado.set(parte)}
            icon={<EditIcon />}
          />
        </Link>
      </Td>
    </Tr>
  );
};

export default ListadoDePartes;
