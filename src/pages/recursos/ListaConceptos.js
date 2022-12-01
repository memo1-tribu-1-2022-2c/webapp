import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
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
} from "@chakra-ui/react";

import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { tryGetConcepts, tryDeleteConcept, tryUpdateConcept } from "./Backend";
import { useEffect, useState } from "react";

export default function ListaConceptos() {
  const [conceptos, setConceptos] = useState([]);
  const [actualizar, setActualizar] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [conceptoSeleccionado, setConceptoSeleccionado] = useState({
    id: 0,
    name: "",
    description: "",
    remunerable: false,
    state: "",
  });

  const [editID, setEditID] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editEstado, setEditEstado] = useState("");
  const [editRemunerado, setEditRemunerado] = useState("");

  useEffect(() => {
    const getConcepts = async () => {
      try {
        let response = await tryGetConcepts();
        setConceptos(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConcepts();
  }, [actualizar]);

  async function handleEliminar(id) {
    try {
      let response = await tryDeleteConcept(id);
      setActualizar(!actualizar);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <TableContainer marginLeft={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Descripcion</Th>
              <Th>Estado</Th>
              <Th>Es remunerable</Th>
              <Th>Editar</Th>
              <Th>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {conceptos.map((concepto) => (
              <Tr key={concepto.id}>
                <Td>{concepto.id}</Td>
                <Td>{concepto.name}</Td>
                <Td>{concepto.description}</Td>
                <Td>{concepto.status}</Td>
                <Td>{concepto.remunerable}</Td>
                <Td>
                  <IconButton
                    onClick={() => {
                      onOpen();
                      setEditID(concepto.id);
                      setEditNombre(concepto.name);
                      setEditDescripcion(concepto.description);
                      setEditEstado(concepto.status);
                      setEditRemunerado(concepto.remunerable);

                      setConceptoSeleccionado(concepto);
                    }}
                    icon={<EditIcon />}
                  />
                </Td>
                <Td>
                  <IconButton
                    onClick={() => {
                      handleEliminar(concepto.id);
                    }}
                    icon={<DeleteIcon />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Concepto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>ID</FormLabel>
            <Input
              disabled
              bg="white"
              placeholder={conceptoSeleccionado.id}
              onChange={(e) => {
                e.preventDefault();
                setEditID(e.target.value);
              }}
            />
            <FormLabel>Nombre</FormLabel>
            <Input
              bg="white"
              placeholder={conceptoSeleccionado.name}
              onChange={(e) => {
                e.preventDefault();
                setEditNombre(e.target.value);
              }}
            />
            <FormLabel>Descripcion</FormLabel>
            <Input
              bg="white"
              placeholder={conceptoSeleccionado.description}
              onChange={(e) => {
                e.preventDefault();
                setEditDescripcion(e.target.value);
              }}
            />
            <FormLabel>Estado</FormLabel>
            <Input
              bg="white"
              placeholder={conceptoSeleccionado.state}
              onChange={(e) => {
                e.preventDefault();
                setEditEstado(e.target.value);
              }}
            />
            <FormLabel>Es remunerable</FormLabel>
            <Input
              bg="white"
              placeholder={conceptoSeleccionado.remunerable}
              onChange={(e) => {
                e.preventDefault();
                setEditRemunerado(e.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                try {
                  let response = await tryUpdateConcept(
                    editID,
                    editNombre,
                    editDescripcion,
                    editRemunerado,
                    editEstado
                  );
                } catch (e) {
                  console.log(e);
                }
                console.log(editID);
                console.log(editNombre);
                console.log(editDescripcion);
                console.log(editEstado);
                console.log(editRemunerado);
                setActualizar(!actualizar);
                onClose();
              }}
            >
              Aplicar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
