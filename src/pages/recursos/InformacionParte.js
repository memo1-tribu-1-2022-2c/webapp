import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Flex,
  Stack,
  Input,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import { useState } from "react";
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

function RegistroHoras(props) {
  const [nuevasHoras, setNuevasHoras] = useState(props.registro.horas);
  const handleCambio = (value) => setNuevasHoras(value);
  return (
    <Tr>
      <Th>{props.registro.fecha}</Th>
      <Th>{`${props.registro.tipo}: ${props.registro.id}`}</Th>
      <Th isNumeric>{props.registro.horas}</Th>
      <Th>
        <Popover isLazy>
          <PopoverTrigger>
            <IconButton icon={<EditIcon />} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Modificar horas</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Stack w="full" direction="row">
                  <NumberInput
                    defaultValue={props.registro.horas}
                    onChange={handleCambio}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <IconButton
                    icon={<CheckIcon />}
                    onClick={() => props.onEditar(nuevasHoras)}
                  >
                    Button
                  </IconButton>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Th>
      <Th>
        <IconButton icon={<DeleteIcon />} onClick={props.onEliminar} />
      </Th>
    </Tr>
  );
}

function InformacionParte() {
  const contexto = GetContextoRecursos();
  const { id } = useParams();
  const parte = contexto.partes.getPartes().find((p) => p.id === id);
  const nombre = "Parte " + parte.tipo + " " + parte.fechaInicio.toString();

  const crearHandleEditar = (key) => {
    return (nuevasHoras) => {
      console.log("Editar " + key + " " + nuevasHoras);
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
