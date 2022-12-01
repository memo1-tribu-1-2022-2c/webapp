import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  Select,
  Input,
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

function InformacionParte() {
  const contexto = GetContextoRecursos();
  const { id } = useParams();
  const parte = contexto.partes.getPartes().find((p) => p.id === id);
  const nombre = "Parte " + parte.tipo + " " + parte.fechaInicio.toString();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [creandoNuevoRegistro, setCreandoNuevoRegistro] = useState(false);


  return (
    <>
      <Button
        marginTop={5}
        marginLeft={5}
        onClick={() => {
          setCreandoNuevoRegistro(true);
          onOpen();
        }}
      >
        {" "}
        Crear registro{" "}
      </Button>
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
            {horasParte.map((registro, index) => {
              return (
                <Tr key={index}>
                  <Td>{registro.fecha}</Td>
                  <Td>{registro.tipo}</Td>
                  <Td isNumeric>{registro.horas}</Td>
                  <Th>
                    <IconButton
                      onClick={() => {
                        setCreandoNuevoRegistro(false);
                        onOpen();
                      }}
                      icon={<EditIcon />}
                    />
                  </Th>
                  <Th>
                    <IconButton icon={<DeleteIcon />} />
                  </Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{creandoNuevoRegistro ? ("Crear Registro") : ("Editar Registro")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Concepto/Tarea</FormLabel>
            <Select w={"30%"} bg="white" placeholder="Tipo..." width="60">
              <option value="CONCEPTO">Concepto</option>
              <option value="TAREA">Tarea</option>
            </Select>
            <Input marginTop={5} bg="white" placeholder={"ID..."} />
            <FormLabel marginTop={5}>Cantidad de Horas</FormLabel>
            <Select w={"30%"} bg="white" placeholder="Cantidad..." width="60">
              {[...Array(24).keys()]
                .map((p) => {
                  return p + 1;
                })
                .map((p) => {
                  return (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  );
                })}
            </Select>
            <FormLabel marginTop={5}>Dia</FormLabel>
            <Input type="date" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Aplicar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default InformacionParte;
