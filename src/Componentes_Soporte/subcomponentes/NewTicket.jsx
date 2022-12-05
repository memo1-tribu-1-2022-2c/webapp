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

  const [posibleClients, setPosibleClients] = React.useState([]);
  const [productosPosibles, setProductosPosibles] = React.useState([]);
  const [posiblesVersiones, setPosiblesVersiones] = React.useState([]);


  const [chosenClient, setChosenClient] = React.useState(false);
  const [chosenProduct, setChosenProduct] = React.useState(false);

  const handleChange = (e) => setInput(e.target.value);

  const loadClients = async () => {
    try{
      const clients = await (await axios.get("https://modulo-soporte.onrender.com/clients")).data;
      setPosibleClients(clients.clients)
    }catch{

    }
  }

  const chooseClient = async (value) => {
    setIdCliente(value);
    setLoading(true);
    await onClientChange(value);
    setLoading(false);
    setChosenClient(true);
  }

  const onClientChange = async (clientId) => {
    try{
      const products = await (await axios.get("https://modulo-soporte.onrender.com/client/products", {params: {query: clientId}})).data;
      setProductosPosibles(products.products)
    }catch{
      
    }

  }

  const onProductChange = async (value) => {
      setChosenProduct(true);
      setIdProducto(value);
      const filtrados = productosPosibles.filter(producto => {
        return producto.product_id == value
      })
      if (filtrados.length > 0){
        setPosiblesVersiones(filtrados[0].versions)
      }
  }

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


  React.useEffect(() => {
    loadClients()
  }, [])

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
                <Select bg="white" marginTop="5%" onChange={(e) => chooseClient(e.target.value)}>
                    <option value="">Seleccione un cliente</option>
                    {posibleClients.map(client => {
                        if (client.razon_social.toLowerCase().match(input.toLowerCase()) || client.id.match(input)){
                          return <option value={client.id}>{client.razon_social} (id:{client.id})</option>  
                        }
                    })}
                  </Select>
                  {chosenClient && 
                  <>
                  <FormLabel>Id de producto</FormLabel>
                  <Select bg="white" marginTop="5%" onChange={(e) => setIdProducto(e.target.value)}>
                      <option value="">Seleccione un producto</option>
                      {productosPosibles.map(product => {
                          
                            return <option value={product.product_id}>{product.product} (id:{product.product_id})</option>  
                          
                      })}
                    </Select>
                    </>}
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