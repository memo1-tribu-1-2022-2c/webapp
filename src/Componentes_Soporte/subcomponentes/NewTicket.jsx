import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function NewTicket(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [resultTitle, setTitle] = React.useState("");
  const [resultBody, setBody] = React.useState("");
  const [input, setInput] = React.useState("");

  const [titulo, setTitulo] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [criticidad, setCriticidad] = React.useState('');
  const [fechaFin, setFechaFin] = React.useState('');
  const [idCliente, setIdCliente] = React.useState('');
  const [idVersion, setIdVersion] = React.useState('');
  const [idProducto, setIdProducto] = React.useState('');
  const [idProyectoSoporte, setIdProyectoSoporte] = React.useState('');
  const [personaACargo, setPersionaACargo] = React.useState('');

  const handleChange = (e) => setInput(e.target.value);

  const createNewTicket = async () => {
    setLoading(true);
    try {
      const data = {
        ticket_client_id: input.client_id,
        ticket_description: input.descripcion,
        ticket_end_dt: input.fecha_finalizacion,
        ticket_person_in_charge: input.person_in_charge,
        ticket_proyect_id: input.proyect_id,
        ticket_start_dt: input.fecha_inicio,
        ticket_state: input.estado,
        ticket_title: input.titulo,
        ticket_version_id: input.version_id,
      };
      await axios.post("https://modulo-soporte.onrender.com/ticket", data);
      /* props.new_ticket(10); */
      setTitle("Creacion de un nuevo ticket exitoso!");
      setBody("El nuevo ticket fue creado");
    } catch {
      setTitle("Hubo un problema");
      setBody("No se pudo crear el ticket");
    }

    setDone(true);
    setLoading(false);
  };

  const open = () => {
    setInput("");
    setDone(false);
    onOpen();
  };



  return (
    <>
      <Button onClick={open} colorScheme="gray" width="fixed">
        Crear nuevo ticket
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.300">
          <ModalHeader>
            {done ? resultTitle : `Creación del ticket`}
          </ModalHeader>
          <ModalBody>
            {done ? (
              resultBody
            ) : (
              <FormControl>
                <FormLabel>Titulo del ticket</FormLabel>
                <Input
                  type="text"
                  value={input.titulo}
                  onChange={handleChange}
                  bg="white"
                />
                <FormLabel>Descripción del ticket</FormLabel>
                <Textarea
                  type="text"
                  value={input.descripcion}
                  onChange={handleChange}
                  bg="white"
                />
                <FormLabel>Criticidad</FormLabel>
                <Select placeholder="Elegir criticidad" bg="white">
                  <option value="SLA 1">SLA 1</option>
                  <option value="SLA 2">SLA 2</option>
                  <option value="SLA 3">SLA 3</option>
                  <option value="SLA 4">SLA 4</option>
                </Select>
                <FormLabel>Fecha maxima de resolucion</FormLabel>
                <Input
                  type="date"
                  value={input.fecha_finalizacion}
                  onChange={handleChange}
                  bg="white"
                />
                <FormLabel>Id del cliente</FormLabel>
                <Input
                  type="text"
                  value={input.client_id}
                  onChange={handleChange}
                  bg="white"
                />
                <FormLabel>Persona a cargo</FormLabel>
                <Input
                  type="text"
                  value={input.person_in_charge}
                  onChange={handleChange}
                  bg="white"
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            {done ? null : (
              <Button
                isLoading={loading}
                onClick={createNewTicket}
                colorScheme="green"
              >
                Crear ticket
              </Button>
            )}
            <Button isLoading={loading} onClick={onClose} colorScheme="red">
              {done ? "Cerrar" : "Cancelar"}{" "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

/*
<FormLabel>Version del producto</FormLabel>
                <Input
                  type="text"
                  value={input.version_id}
                  onChange={handleChange}
                  bg="white"
                />

<FormLabel>Id del proyecto</FormLabel>
                <Input
                  type="text"
                  value={input.proyect_id}
                  onChange={handleChange}
                  bg="white"
                />
*/