import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  IconButton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

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

const RegistroHoras = (props) => (
  <Tr>
    <Th>{props.registro.fecha}</Th>
    <Th>{`${props.registro.tipo}: ${props.registro.id}`}</Th>
    <Th isNumeric>{props.registro.horas}</Th>
    <Th>
      <IconButton icon={<EditIcon />} onClick={props.onEditar} />
    </Th>
    <Th>
      <IconButton icon={<DeleteIcon />} onClick={props.onEliminar} />
    </Th>
  </Tr>
);

function InformacionParte(props) {
  const { id } = useParams();

  const parte = props.partes.find((p) => p.id === id);
  const nombre = "Parte " + parte.tipo + " " + parte.fechaInicio.toString();

  const crearHandleEditar = (key) => {
    return () => {
      console.log("Editar " + key);
    };
  };

  const crearHandleEliminar = (key) => {
    return () => {
      console.log("Eliminar " + key);
    };
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption placement="top" fontSize={32} mb={6}>
          Horas registradas en el parte {nombre}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Descripción</Th>
            <Th isNumeric>Horas</Th>
            <Th>Editar</Th>
            <Th>Eliminar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {horasParte.map((registro, _) => {
            const key = registro.tipo + registro.id;
            return (
              <RegistroHoras
                key={key}
                onEditar={crearHandleEditar(key)}
                onEliminar={crearHandleEliminar(key)}
                registro={registro}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default InformacionParte;
