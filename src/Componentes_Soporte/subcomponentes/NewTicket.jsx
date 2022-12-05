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
  const [personaACargo, setPersionaACargo] = React.useState('');

  const [posibleClients, setPosibleClients] = React.useState([]);
  const [productosPosibles, setProductosPosibles] = React.useState([]);
  const [posiblesVersiones, setPosiblesVersiones] = React.useState([]);
  const [posiblesEncargados, setPosiblesEncargados] = React.useState([])


  const [chosenClient, setChosenClient] = React.useState(false);
  const [chosenProduct, setChosenProduct] = React.useState(false);
  const [chosenVersion, setChosenVersion] = React.useState(false);

  const handleChange = (e) => setInput(e.target.value);

  const loadClients = async () => {
    setLoading(true);
    try{
      const clients = await (await axios.get("https://modulo-soporte.onrender.com/clients")).data;
      setPosibleClients(clients.clients)
    }catch{
    }
    setLoading(false);
  }

  const chooseClient = async (value) => {
    if (value == '') {
      setChosenClient(false);
      return;
    }
    setIdCliente(value);
    setLoading(true);
    await onClientChange(value);
    setLoading(false);
    setChosenClient(true);
  }

  const onClientChange = async (clientId) => {
    setChosenClient(false);
    setChosenProduct(false);
    setChosenVersion(false);
    
    try{
      const products = await (await axios.get("https://modulo-soporte.onrender.com/client/products", {params: {query: clientId}})).data;
      setProductosPosibles(products.products)
    }catch{
      
    }

  }

  const loadPersonal = async () => {
    setLoading(true);
    try{
      const personal = await (await axios.get("https://modulo-soporte.onrender.com/employees")).data;
      setPosiblesEncargados(personal.employees);
    }catch{

    }
    setLoading(false);
  }

  const onProductChange = async (value) => {
      setChosenProduct(false);
      if (value != '') setChosenProduct(true);
      setChosenVersion(false);
      setIdProducto(value);
      const filtrados = productosPosibles.filter(producto => {
        return producto.product_id == value
      })
      if (filtrados.length > 0){
        setPosiblesVersiones(filtrados[0].versions)
      }
  }

  const onVersionChange = async (value) => {
    setIdVersion(value);
    setChosenVersion(false);
      try{
        await loadPersonal();
        setChosenVersion(true);
      }catch{

      }
  }

  const obtenerProyectoSoporte = async () => {
    const proyectos = await (await axios.get(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/client/${idCliente}`)).data
    
    return proyectos.filter(proyecto => {
        return proyecto.projectType === "SOPORTE" && proyecto.clientId == idCliente && proyecto.versionId == idVersion
    });
  }

  const createNewTicket = async () => {
    setLoading(true);
    try {
      const proyecto = await obtenerProyectoSoporte()

      if (proyecto.length === 0) {
        setTitle("El cliente no tiene un proyecto de soporte para ese producto");
        setBody("No se pudo crear el ticket");
        setDone(true);
        setLoading(true);
        return;
      }

      const data = {
        ticket_client_id: parseInt(idCliente),
        ticket_criticity: criticidad,
        ticket_description: descripcion,
        ticket_end_dt: new Date(fechaFin).toISOString().split('T')[0],
        ticket_person_in_charge: personaACargo,
        ticket_project_id: parseInt(proyecto[0].projectId),
        ticket_start_dt: new Date().toISOString().split('T')[0],
        ticket_state: "ABIERTO",
        ticket_title: titulo,
        ticket_version_id: parseInt(idVersion),
      };
      await axios.post("https://modulo-soporte.onrender.com/ticket", data);
      setTitle("Creacion de un nuevo ticket exitoso!");
      setBody("El nuevo ticket fue creado");
      props.refresh();
    } catch {
      setTitle("Hubo un problema");
      setBody("No se pudo crear el ticket");
    }

    setDone(true);
    setLoading(false);
  };

  const open = () => {
    setInput("");
    setChosenClient(false);
    setChosenProduct(false);
    setChosenVersion(false);
    loadClients();
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
                <FormLabel marginTop="2%">Titulo del ticket</FormLabel>
                <Input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  bg="white"
                />
                <FormLabel marginTop="2%">Descripción del ticket</FormLabel>
                <Textarea
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  bg="white"
                />
                <FormLabel marginTop="2%">Criticidad</FormLabel>
                <Select placeholder="Elegir criticidad" bg="white" value={criticidad} onChange={(e) => setCriticidad(e.target.value)}>
                  <option value="SLA 1">SLA 1</option>
                  <option value="SLA 2">SLA 2</option>
                  <option value="SLA 3">SLA 3</option>
                  <option value="SLA 4">SLA 4</option>
                </Select>
                <FormLabel marginTop="2%">Fecha maxima de resolucion</FormLabel>
                <Input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  bg="white"
                />
                <FormLabel marginTop="2%">Id del cliente</FormLabel>
                <Select bg="white" onChange={(e) => chooseClient(e.target.value)}>
                    <option value="">Seleccione un cliente</option>
                    {posibleClients.map(client => {
                        
                          return <option value={client.id}>{client.razon_social} (id:{client.id})</option>  
                        
                    })}
                  </Select>
                  {chosenClient && 
                  <>
                  <FormLabel marginTop="2%">Id de producto</FormLabel>
                  <Select bg="white"  onChange={(e) => onProductChange(e.target.value)}>
                      <option value="">Seleccione un producto</option>
                      {productosPosibles.map(product => {
                          
                            return <option value={product.product_id}>{product.product} (id:{product.product_id})</option>  
                          
                      })}
                    </Select>
                    </>}
                    {chosenProduct && 
                  <>
                  <FormLabel marginTop="2%">Id de version</FormLabel>
                  <Select bg="white" onChange={(e) => onVersionChange(e.target.value)}>
                      <option value="">Seleccione una version</option>
                      {posiblesVersiones.map(version => {
                          
                            return <option value={version.version_id}>{version.number} (id:{version.version_id})</option>  
                          
                      })}
                    </Select>
                    </>}
                    {chosenVersion && 
                  <>
                  <FormLabel marginTop="2%">Persona a cargo</FormLabel>
                  <Select bg="white" onChange={(e) => setPersionaACargo(e.target.value)}>
                      <option value="">Seleccione un encargado</option>
                      {posiblesEncargados.map(encargado => {
                          
                            return <option value={encargado.legajo}>{encargado.Nombre + " " + encargado.Apellido} (Legajo:{encargado.legajo})</option>  
                          
                      })}
                    </Select>
                    </>}
                
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter flexDirection="row-reverse" justifyContent="space-between">
            
            <Button justifySelf="flex-end" isLoading={loading} onClick={onClose} colorScheme="red">
              {done ? "Cerrar" : "Cancelar"}{" "}
            </Button>
            {!done && chosenVersion && chosenProduct && chosenClient && (
              <Button
                isLoading={loading}
                onClick={createNewTicket}
                colorScheme="green"
              >
                Crear ticket
              </Button>
            )}
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