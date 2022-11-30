import { ViewIcon } from "@chakra-ui/icons";

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
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { useState } from "react";



export default function ReportesEmpleados({ setTitle }) {
  //setTitle("Reporte de Horas");
  const navigate = useNavigateWParams();
  const contexto = GetContextoRecursos();

  const [empleadosTotales, setEmpleadosTotales] = useState(
    contexto.empleados.getEmpleados()
  );
  const [empleadosVisualizados, setEmpleadosVisualizados] =
    useState(empleadosTotales);

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

  return (
    <>
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
                      {empleado.nombre} {empleado.apellido}
                    </Td>
                    <Td isNumeric>{empleado.horas}</Td>
                    <Th isNumeric>
                    <IconButton onClick={() => {
                      contexto.reporteIndividual.setReporteIndividual(empleado)
                      navigate("../reporte-individual")}} icon={<ViewIcon />} />
                    </Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

        </Box>
      </Box>
    </>
  );
}
