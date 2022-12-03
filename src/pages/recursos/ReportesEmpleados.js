import { ViewIcon } from "@chakra-ui/icons";

import { Box, Input } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { useState } from "react";
import { tryGetRecursos } from "./Backend";
import { useEffect } from "react";

export default function ReportesEmpleados({ setTitle }) {
  //setTitle("Reporte de Horas");
  const navigate = useNavigateWParams();
  const contexto = GetContextoRecursos();

  const [empleadosTotales, setEmpleadosTotales] = useState(null);
  const [empleadosVisualizados, setEmpleadosVisualizados] = useState(null);

  function filtrarEmpleados(e) {
    const filtro = e.target.value;

    if (filtro === "") {
      setEmpleadosVisualizados(empleadosTotales);
      return;
    }

    //chequear si la string es numerica
    if (!isNaN(filtro) && !isNaN(parseFloat(filtro))) {
      setEmpleadosVisualizados(
        empleadosTotales.filter((emp) =>
          emp.legajo.toString().startsWith(filtro)
        )
      );
      return;
    }
  }
  useEffect(() => {
    const getRecursos = async () => {
      try {
        let response = await tryGetRecursos();
        console.log(response.data);
        setEmpleadosTotales(response.data);
        setEmpleadosVisualizados(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getRecursos();
  }, []);
  return (
    <>
      {empleadosVisualizados ? (
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
          <Input
            bg="white"
            width="xl"
            placeholder="Buscar empleado por legajo..."
            marginBottom={15}
            marginLeft={5}
            onChange={filtrarEmpleados}
          />
          <Box
            justifyContent={"center"}
            display={"flex"}
            flexDirection={"column"}
            gap={4}
          >
            <TableContainer marginLeft={5}>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Legajo</Th>
                    <Th>Nombre</Th>
                    <Th isNumeric>Horas Totales</Th>
                    <Th isNumeric>Reporte Particular</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {empleadosVisualizados.map((empleado) => (
                    <Tr key={empleado.legajo}>
                      <Td>{empleado.legajo}</Td>
                      <Td>
                        {empleado.Nombre} {empleado.Apellido}
                      </Td>
                      <Td isNumeric>{10}</Td>
                      <Th isNumeric>
                        <IconButton
                          onClick={() => {
                            contexto.reporteIndividual.setReporteIndividual(
                              empleado
                            );
                            navigate("../reporte-individual");
                          }}
                          icon={<ViewIcon />}
                        />
                      </Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <Text>Cargando ... </Text>
      )}
    </>
  );
}
