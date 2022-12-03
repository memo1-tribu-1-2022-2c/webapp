import { Box, Text, Input, Flex, Button, Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function CreateProyect() {
  const navigate = useNavigate();
  const handleDiscardButton = () => {
    navigate(-1);
  };

  const models = ["SOPORTE", "CLIENTE"];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startingDate, setStartingDate] = useState(new Date());
  const [endingDate, setEndingDate] = useState(new Date());
  const [projectType, setProjectType] = useState("CLIENTEter");

  const [clientId, setClientId] = useState(1);

  const [availableClients, setAvailableClients] = useState([]);
  const [clientsLoaded, setClientsLoaded] = useState(false);

  useEffect(() => {
    console.log(clientId);
  }, [clientId]);

  const create = async () => {
    const jsonBody = {
      name: name,
      description: description,
      startingDate: startingDate,
      endingDate: endingDate,
      projectType: projectType,
      clientId: parseInt(clientId),
      versionId: 0,
    };
    console.log(jsonBody);
    if (name === "" || description === "" || projectType === "") {
      return;
    }

    const data = await axios.post(
      "https://squad2-2022-2c.herokuapp.com/api/v1/projects",
      jsonBody
    );
    console.log(data);
  };

  useEffect(() => {
    const getClientsUrl = "https://modulo-soporte.onrender.com/clients";
    const getClients = async () => {
      const requestOptions = {
        method: "GET",
        Headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(getClientsUrl, requestOptions);
      const data = await response.json();
      setAvailableClients(data.clients);
      setClientsLoaded(true);
      console.log(availableClients);
    };
    getClients();
  }, []);

  return (
    <>
      <Flex
        bg="gray.300"
        mx="10"
        p="10"
        rounded="sm"
        mt="5"
        justifyContent="space-between"
      >
        <Input
          rounded="sm"
          minH="16"
          bg="white"
          w="xl"
          fontSize="28"
          placeholder="Nombre del proyecto"
          onChange={(nombre) => setName(nombre.target.value)}
        />
        <Flex gap={5}>
          <Button borderRadius={"5"} fontSize={20} onClick={() => create()}>
            {" "}
            Guardar Proyecto{" "}
          </Button>
          <Button
            borderRadius={"5"}
            fontSize={20}
            onClick={() => handleDiscardButton()}
          >
            {" "}
            Descartar Proyecto{" "}
          </Button>
        </Flex>
      </Flex>
      <Box
        overflowY="auto"
        maxH="full"
        rounded="sm"
        bg="gray.300"
        m="10"
        py="10"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray",
            borderRadius: "24px",
          },
        }}
      >
        <Text mx="10">Descripción</Text>
        <Box border="0px" mt="5" rounded="sm" bg="white" mx="10">
          <Input
            border="0px"
            rounded="sm"
            minH="150px"
            textAlign="justify"
            onChange={(descripcion) => setDescription(descripcion.target.value)}
          />
        </Box>
        <Flex justifyContent="space-between" mx="10">
          <Box>
            <Text mt="5">Modulo</Text>
            <Select
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
              value={projectType}
              onChange={(value) => {
                setProjectType(value.target.value);
              }}
            >
              {models.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </Select>
            {/* <Select minH='50' border='0px' rounded='sm' bg='white' mt='2' py='2' width='xl'>
                            <option value="Soporte">Soporte</option>
                            <option value="Cliente">Cliente</option>
                        </Select> */}
          </Box>
          <Box>
            {clientsLoaded && (
              <>
                <Text mt="5">Cliente</Text>
                <Select
                  placeholder="Seleccionar Cliente"
                  minH="50"
                  rounded="sm"
                  bg="white"
                  mt="2"
                  py="5"
                  width="xl"
                  onChange={(value) => {
                    setClientId(value.target.value);
                  }}
                >
                  {availableClients.map((client) => (
                    <option value={client.id}>{client.CUIT}</option>
                  ))}
                </Select>
              </>
            )}
          </Box>
        </Flex>
        <Text mx="10" mt="5">
          Fecha de inicio
        </Text>
        <Box style={{ marginLeft: "40px" }}>
          <DatePicker
            minH="50"
            bg="white"
            mt="2"
            mx="10"
            py="2"
            w="xl"
            rounded="sm"
            selected={startingDate}
            onChange={(date) => setStartingDate(date)}
          />
        </Box>
        {/* <Input minH='50' border='0px' mt='2' bg='white' mx='10' py='2' width='xl' rounded='sm'/> */}
        <Text mx="10" mt="5">
          Fecha de finalización
        </Text>
        <Box style={{ marginLeft: "40px" }}>
          <DatePicker
            minH="50"
            bg="white"
            mt="2"
            mx="10"
            py="2"
            w="xl"
            rounded="sm"
            selected={endingDate}
            onChange={(date) => setEndingDate(date)}
          />
        </Box>
        {/* <Input minH='50' border='0px' mt='2' rounded='sm' bg='white' mx='10' py='2' width='xl'/> */}
      </Box>
    </>
  );
}

export default CreateProyect;
