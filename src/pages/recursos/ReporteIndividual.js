import { Box, Input, Select, Heading, FormLabel } from "@chakra-ui/react";
import { GetContextoRecursos } from "./Contexto";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
export default function ReporteIndividual({ setTitle }) {
  const contexto = GetContextoRecursos();
  const empleado = contexto.reporteIndividual.getReporteIndividual();

  //setTitle("Reporte Individual - " + empleado.nombre + " " + empleado.apellido);

  const dias = [
    {
      fecha: "21/10/2022",
      actividades: [
        "005 - Comprar Chinchulines (2h)",
        "021 - Arrancar el fuego (2h)",
      ],
    },
    {
      fecha: "22/10/2022",
      actividades: ["004 - Comprar Papas (2h)", "221 - Comprar Cebolla (2h)"],
    },
  ];

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
        <Box display={"flex"} gap={10}>
          <Select
            w={"30%"}
            marginLeft={10}
            bg="white"
            placeholder="Periodo..."
            width="60"
          >
            <option value="semanal">Semanal</option>
            <option value="quincenal">Quincenal</option>
            <option value="mensual">Mensual</option>
            <option value="total">Total</option>
          </Select>

          <FormLabel>Fecha de inicio</FormLabel>
          <Input w={"30%"} type="date" bg="white" />
        </Box>

        <Box>
          <Heading as="h3" size="lg" marginLeft={10} marginTop={10}>
            {empleado.legajo} - {empleado.nombre} {empleado.apellido}
          </Heading>
          <Heading
            as="h2"
            size="sm"
            marginLeft={10}
            marginTop={10}
            marginBottom={10}
          >
            Total de horas registradas: {empleado.horas}
          </Heading>
          {dias.map((dia) => (
            <Card key={dia.fecha} marginLeft={10}>
              <CardHeader>
                <Heading size="md">{dia.fecha}</Heading>
              </CardHeader>
              <CardBody>
                {dia.actividades.map((actividad) => (
                  <Heading key={actividad} size="sm">
                    {actividad}
                  </Heading>
                ))}
              </CardBody>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
