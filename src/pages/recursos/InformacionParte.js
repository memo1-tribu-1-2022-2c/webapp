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
import {
  tryCreateRegistro,
  tryGetRegistrosFromParte,
  tryUpdateRegistro,
} from "./Backend";
import { getCurrentDateInput } from "./utils";

function nuevoRegistro() {
  return {
    id: -1,
    activityId: "",
    date: getCurrentDateInput(),
    hours: "",
    typeOfActivity: "",
  };
}

function InformacionParte() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isCreandoRegistro, creando] = useBoolean(false);
  const setRegistrosTotales = useState([])[1];
  const [registrosVisualizados, setRegistrosVisualizados] = useState([]);
  const [isLoading, loading] = useBoolean(false);

  const [registroActual, setRegistroActual] = useState(null);

  useEffect(() => {
    if (isOpen) {
      return;
    }
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
  }, [id, loading, isOpen]);

  return (
    <>
      <Button
        marginTop={5}
        marginLeft={5}
        onClick={() => {
          setRegistroActual(nuevoRegistro());
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
            {registrosVisualizados.map((registro, index) => {
              return (
                <Tr key={index}>
                  <Td>{registro.date}</Td>
                  <Td>{registro.typeOfActivity}</Td>
                  <Td isNumeric>{registro.hours}</Td>
                  <Th>
                    <IconButton
                      onClick={() => {
                        setRegistroActual(registro);
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
        <Center mt={15}>
          <Spinner size="xl" />
        </Center>
      ) : null}
      {isOpen ? (
        <CrearRegistro
          hdId={id}
          creando={isCreandoRegistro}
          registroActual={registroActual}
          onClose={onClose}
        />
      ) : null}
    </>
  );
}

function CrearRegistro({ hdId, creando, onClose, registroActual }) {
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

  useEffect(() => {
    if (registroActual.id === -1) {
      return;
    }
    setTipo(registroActual.typeOfActivity);
    setIdToC(registroActual.activityId);
    setHoras(registroActual.hours);
    setFecha(registroActual.date);
  }, [registroActual]);

  const handleSubmit = async () => {
    loading.on();

    let registro = {
      activityId: parseInt(idToC),
      date: fecha,
      hourDetailId: hdId,
      hours: parseInt(horas),
      typeOfActivity: tipo,
    };
    if (registroActual.id !== -1) {
      registro.id = registroActual.id;
    }

    console.log(registro);

    try {
      if (registroActual.id === -1) {
        await tryCreateRegistro(registro);
      } else {
        await tryUpdateRegistro(registro);
      }
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
            value={tipo}
          >
            <option value="CONCEPTO">Concepto</option>
            <option value="TAREA">Tarea</option>
          </Select>
          <Input
            marginTop={5}
            bg="white"
            placeholder={"ID..."}
            onChange={handleCambioIdToC}
            value={idToC}
          />
          <FormLabel marginTop={5}>Cantidad de Horas</FormLabel>
          <Select
            w={"30%"}
            bg="white"
            placeholder="Cantidad..."
            width="60"
            onChange={handleCambioHoras}
            value={horas}
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
          <Input type="date" onChange={handleCambioFecha} value={fecha} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            isDisabled={isLoading}
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
