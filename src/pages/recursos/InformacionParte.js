import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  useBoolean,
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
  Alert,
  AlertIcon,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tryCreateRegistro, tryGetRegistrosFromParte } from "./Backend";

function InformacionParte() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCreandoRegistro, creando] = useBoolean(false);
  const [registrosTotales, setRegistrosTotales] = useState(null);
  const [registrosVisualizados, setRegistrosVisualizados] = useState(null);
  const [isLoading, loading] = useBoolean(false);

  useEffect(() => {
    const getRegisters = async () => {
      loading.on();
      try {
        let response = await tryGetRegistrosFromParte(id);

        setRegistrosTotales(response.data);
        setRegistrosVisualizados(response.data);
      } catch (e) {
        console.log(e);
      }
      loading.off();
    };
    getRegisters();
  }, [id]);

  return (
    <>
      <Button
        marginTop={5}
        marginLeft={5}
        onClick={() => {
          creando.on();
          onOpen();
        }}
        isLoading={isLoading}
      >
        {" "}
        Crear registro{" "}
      </Button>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top" fontSize={32} mb={6}>
            Horas registradas en el parte
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
            {!registrosVisualizados
              ? null
              : registrosVisualizados.map((registro, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{registro.date}</Td>
                      <Td>{registro.typeOfActivity}</Td>
                      <Td isNumeric>{registro.hours}</Td>
                      <Th>
                        <IconButton
                          onClick={() => {
                            creando.off();
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
      {isLoading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : null}
      {isOpen ? (
        <CrearRegistro id={id} creando={isCreandoRegistro} onClose={onClose} />
      ) : null}
    </>
  );
}

function CrearRegistro({ id, creando, onClose }) {
  const [isLoading, loading] = useBoolean(false);
  const [mensaje, setMensaje] = useState("");

  const [tipo, setTipo] = useState("");
  const handleCambioTipo = (e) => setTipo(e.target.value);

  const [idToC, setIdToC] = useState("");
  const handleCambioIdToC = (e) => setIdToC(e.target.value);

  const [horas, setHoras] = useState("");
  const handleCambioHoras = (e) => setHoras(e.target.value);

  const [fecha, setFecha] = useState("");
  const handleCambioFecha = (e) => setFecha(e.target.value);

  const handleSubmit = async () => {
    loading.on();

    const registro = {
      activityId: parseInt(idToC),
      date: fecha,
      hourDetailId: id,
      hours: parseInt(horas),
      typeOfActivity: tipo,
    };

    console.log(registro);

    try {
      const response = await tryCreateRegistro(registro);
      onClose();
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setMensaje("No pudo comunicarse con el servidor");
      }
      setMensaje(error.response.data);
    }
    loading.off();
  };
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {creando ? "Crear Registro" : "Editar Registro"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {mensaje === "" ? null : (
            <Alert status="error" mb={5}>
              <AlertIcon />
              {mensaje}
            </Alert>
          )}
          <FormLabel>Concepto/Tarea</FormLabel>
          <Select
            w={"30%"}
            bg="white"
            placeholder="Tipo..."
            width="60"
            onChange={handleCambioTipo}
          >
            <option value="CONCEPTO">Concepto</option>
            <option value="TAREA">Tarea</option>
          </Select>
          <Input
            marginTop={5}
            bg="white"
            placeholder={"ID..."}
            onChange={handleCambioIdToC}
          />
          <FormLabel marginTop={5}>Cantidad de Horas</FormLabel>
          <Select
            w={"30%"}
            bg="white"
            placeholder="Cantidad..."
            width="60"
            onChange={handleCambioHoras}
          >
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
          <Input type="date" onChange={handleCambioFecha} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            isLoading={isLoading}
          >
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit} isLoading={isLoading}>
            Aplicar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InformacionParte;
