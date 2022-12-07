import {
  DeleteIcon,
  EditIcon,
  CloseIcon,
  CheckIcon,
  InfoIcon,
  AddIcon,
  EmailIcon,
} from "@chakra-ui/icons";
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
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useNavigateWParams from "../../routes/navigation";
import {
  getErrorMessage,
  tryCreateRegistro,
  tryDeleteRegistro,
  tryGetRegistrosFromParte,
  tryUpdateRegistro,
} from "./Backend";
import { getCurrentDateInput, capitalize } from "./utils";

function nuevoRegistro() {
  return {
    id: null,
    activityId: "",
    date: getCurrentDateInput(),
    hours: "",
    typeOfActivity: "",
  };
}

function InformacionParte() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigateWParams();

  const [isCreandoRegistro, creando] = useBoolean(false);
  const setRegistrosTotales = useState([])[1];
  const [registrosVisualizados, setRegistrosVisualizados] = useState([]);

  const [isLoadingPartes, loadingPartes] = useBoolean(false);
  const [isLoadingEliminar, loadingEliminar] = useBoolean(false);
  const [isLoadingEmitir, loadingEmitir] = useBoolean(false);

  const [eliminando, setEliminando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [doReload, { toggle: reload }] = useBoolean();

  const [registroActual, setRegistroActual] = useState(null);

  useEffect(() => {
    if (isOpen) {
      return;
    }
    const getRegisters = async () => {
      loadingPartes.on();
      try {
        let response = await tryGetRegistrosFromParte(id);

        setRegistrosTotales(response.data);
        setRegistrosVisualizados(response.data);
      } catch (e) {
        console.log(e);
      }
      loadingPartes.off();
    };
    getRegisters();
  }, [id, loadingPartes, doReload]);

  function eliminar(id) {
    const deleteRegister = async () => {
      loadingEliminar.on();
      try {
        await tryDeleteRegistro(id);
        reload();
      } catch (error) {
        console.log(error);
        setMensaje(getErrorMessage(error));
        loadingEliminar.off();
      }
    };
    deleteRegister();
  }

  function emitir() {
    loadingEmitir.on();
    console.log("emitido");
    loadingEmitir.off();
    navigate("..");
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption placement="top" fontSize={32} mb={6}>
            Horas registradas en el parte
          </TableCaption>
          <Thead>
            <Tr>
              <Th>
                <Button
                  mb={10}
                  ml={10}
                  onClick={() => {
                    setRegistroActual(nuevoRegistro());
                    creando.on();
                    onOpen();
                  }}
                  isLoading={isLoadingPartes}
                  isDisabled={isLoadingEmitir}
                  leftIcon={<AddIcon />}
                >
                  Crear registro
                </Button>
                <Button
                  mb={10}
                  ml={10}
                  onClick={emitir}
                  isLoading={isLoadingEmitir || isLoadingPartes}
                  leftIcon={<EmailIcon />}
                >
                  Emitir parte
                </Button>
              </Th>
              <Th />
              <Th />
              <Th />
              <Th />
            </Tr>
          </Thead>
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
                  <Td>{`${capitalize(registro.typeOfActivity)} ${
                    registro.activityId
                  }`}</Td>
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
                    {eliminando !== registro.id || mensaje !== "" ? (
                      <>
                        <IconButton
                          mx={1}
                          icon={<DeleteIcon />}
                          onClick={() => setEliminando(registro.id)}
                          isDisabled={isLoadingEmitir}
                        />
                        <Tooltip
                          label={mensaje}
                          aria-label="Error message"
                          isDisabled={eliminando !== registro.id}
                        >
                          <IconButton
                            as="div"
                            mx={1}
                            bg="transparent"
                            _hover={{}}
                            _active={{}}
                            icon={
                              <InfoIcon
                                color="red.500"
                                visibility={
                                  eliminando === registro.id
                                    ? "visible"
                                    : "hidden"
                                }
                              />
                            }
                          />
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <IconButton
                          mx={1}
                          isDisabled={isLoadingEliminar || isLoadingEmitir}
                          icon={<CloseIcon color="red" />}
                          onClick={() => setEliminando(null)}
                        />
                        <IconButton
                          mx={1}
                          isLoading={isLoadingEliminar || isLoadingEmitir}
                          icon={<CheckIcon color="green" />}
                          onClick={() => eliminar(registro.id)}
                        />
                      </>
                    )}
                  </Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoadingPartes ? (
        <Center mt={15}>
          <Spinner size="xl" />
        </Center>
      ) : null}
      {isOpen ? (
        <CrearRegistro
          hdId={id}
          creando={isCreandoRegistro}
          registroActual={registroActual}
          onClose={(success) => {
            if (success) {
              reload();
            }
            onClose();
          }}
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
    if (registroActual.id === null) {
      return;
    }
    setTipo(registroActual.typeOfActivity);
    setIdToC(registroActual.activityId);
    setHoras(registroActual.hours);
    setFecha(registroActual.date);
  }, [registroActual]);

  const handleSubmit = async () => {
    if ([tipo, idToC, horas, fecha].some((v) => v === "")) {
      setMensaje("Por favor complete todos los campos");
      return;
    }
    loading.on();

    let registro = {
      activityId: parseInt(idToC),
      date: fecha,
      hourDetailId: hdId,
      hours: parseInt(horas),
      typeOfActivity: tipo,
    };
    if (registroActual.id !== null) {
      registro.id = registroActual.id;
    }

    console.log(registro);

    try {
      if (registroActual.id === null) {
        await tryCreateRegistro(registro);
      } else {
        await tryUpdateRegistro(registro);
      }
      onClose(true);
    } catch (error) {
      console.log(error);
      setMensaje(getErrorMessage(error));
    }
    loading.off();
  };
  return (
    <Modal isOpen onClose={() => onClose(false)}>
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
            onClick={() => onClose(false)}
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
