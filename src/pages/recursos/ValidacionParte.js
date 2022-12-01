import {
  CheckIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Stack,
  Button,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { GetContextoRecursos } from "./Contexto";

const horasParte = [
  {
    tipo: "concepto",
    id: 1,
    horas: 5,
    fecha: "22/11/2022",
  },
  {
    tipo: "tarea",
    id: 1,
    horas: 2,
    fecha: "23/11/2022",
  },
  {
    tipo: "tarea",
    id: 3,
    horas: 3,
    fecha: "24/11/2022",
  },
];

const RegistroHoras = (props) => {
  return (
    <Tr>
      <Th>{props.registro.fecha}</Th>
      <Th>{`${props.registro.tipo}: ${props.registro.id}`}</Th>
      <Th isNumeric>{props.registro.horas}</Th>
    </Tr>
  );
};

function ValidacionDeParte() {
  const contexto = GetContextoRecursos();
  const { id } = useParams();
  const parte = contexto.partes.getPartes().find((p) => p.id === id);
  const nombre = "Parte " + parte.type + " " + parte.startTime.toString();

  const aprobar = () => {
    console.log("Aprobado, lince!");
  };

  const rechazar = () => {
    console.log("Rechazado, lince!");
  };

  return (
    <TableContainer>
      <Stack alignContent='center' mb={8}>
        <Text alignSelf='center' fontSize={32} mb={6}>
          Horas registradas en el parte {nombre}
        </Text>
        <Stack alignSelf='center' direction='row' mb={8} ml={12}>
          <ButtonGroup spacing="6">
            <Button colorScheme="green" leftIcon={<CheckIcon />} onClick={aprobar} >
              Aprobar
            </Button>
            <Button colorScheme="red" leftIcon={<NotAllowedIcon />} onClick={rechazar} >
              Rechazar
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
      <Table variant="simple">


        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Descripción</Th>
            <Th isNumeric>Horas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {horasParte.map((registro, _) => {
            const key = registro.tipo + registro.id;
            return <RegistroHoras key={key} registro={registro} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ValidacionDeParte;
