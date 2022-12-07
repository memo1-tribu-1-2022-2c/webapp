import {
  Box,
  Text,
  Input,
  Flex,
  Button,
  Select as ChakraSelect,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlatList from "flatlist-react";
import { Select } from "chakra-react-select";

function EditProyect() {
  const location = useLocation();
  const { project, tasks } = location.state;

  const navigate = useNavigate();
  const handleDiscardButton = () => {
    navigate(-1);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [startingDate, setStartingDate] = useState(
    new Date(project.startingDate)
  );
  const [endingDate, setEndingDate] = useState(new Date(project.endingDate));
  const [projectType, setProjectType] = useState("");
  const [versionId, setVersionId] = useState("");
  const [roleToResourceId, setRoleToResourceId] = useState([]);
  const [resources, setResources] = useState([])
  const [roles, setRoles] = useState({})

  const [staff, setStaff] = useState([])
  const [stakeHolders, setStakeHolders] = useState([])
  const [selectPM, setSelectPM] = useState()
  const [selectedSponsor, setSelectedSponsor] = useState()

  const proyectStates = [
    "NUEVO",
    "FINALIZADO",
    "EN_PROGRESO",
    "PAUSADO",
    "CANCELADO",
  ];
  const models = ["SOPORTE", "CLIENTE"];

  const edit = async () => {
    console.table(state);
    const jsonBody = JSON.stringify({
      id: project.projectId /* FIJO */,
      name: name === "" ? project.name : name,
      description: description === "" ? project.description : description,
      state: state === "" ? project.state : state,
      startingDate: startingDate,
      endingDate: endingDate,
      projectType: projectType === "" ? project.projectType : projectType,
      clientId: project.clientId /* FIJO */,
      versionId: project.versionId, /* FIJO */
      roleToResourceId: project.roleToResourceId, /* FIJO */
    });

    const requestOptions = {
      method: "PUT",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody,
    };

    console.log(selectPM, selectedSponsor)
    console.log(staff, stakeHolders)

    const request = {
      method: "PUT",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (selectPM === undefined) {
      if (roles.PM == undefined) {
        return
      } 
      const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/role/${"PM"}/resource/${selectPM}`, request)
      console.log(response)
    } else {
      //hacerlos al final
      const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/role/${"PM"}/resource/${selectPM}`, request)
      console.log(response)
    }

    if (selectedSponsor === undefined) {
      if (roles.Sponsor == undefined) {
        return
      }
      const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/role/${"Sponsor"}/resource/${selectedSponsor}`, request)
      console.log(response)
    } else {
      const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/role/${"Sponsor"}/resource/${selectedSponsor}`, request)
      console.log(response)
    }

    if (staff.length != 0) {
      // limpiar de fetchs
      let count = 1
      staff.forEach(element => {
        updateStaff(element.value, request, count)
        count++
      });
    }

    if (stakeHolders.length != 0) {
      // limpiar de fetchs
      let count = 1
      staff.forEach(element => {
        updateStakeholder(element.value, request, count)
        count++
        //llamada al endpoint
      });
    }

    const response = await fetch(
      `https://squad2-2022-2c.herokuapp.com/api/v1/projects`,
      requestOptions
    );
    if (response.ok) {
      handleDiscardButton();
    }
  };

  const updateStaff = async(idResource, request, count) => {
    await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/role/${`Staff${count}`}/resource/${idResource}`, request)
  }

  const updateStakeholder = async(idResource, request, count) => {
    await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/role/${`Stakeholder${count}`}/resource/${idResource}`, request)
  }

  const returnTasks = (task) => {
    return (
      <Text alignSelf="flex-start">
        {task.id} - {task.name}
      </Text>
    );
  };

  const getAllResources = async () => {
    const requestOptions = {
      method: "GET",
      Headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await fetch("https://squad2-2022-2c.herokuapp.com/api/v1/projects/allresources", requestOptions);
    const data = await response.json();

    data.map((resource) => {
      resource["value"] = resource["legajo"]
      resource["label"] = resource["Nombre"] + " " + resource["Apellido"]
      // delete resource['legajo']
      // delete resource['Nombre']
      // delete resource['Apellido']
    });
    
    setResources(data);
    console.log("33", data)
  };

  const getAllRoles = async () => {
    const requestOptions = {
      method: "GET",
      Headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/${project.projectId}/roles`, requestOptions);
    const data = await response.json();

    console.log("HOLA", data)
    setSelectPM(data.PM)
    setSelectedSponsor(data.Sponsor)
    
    //setRoles(data);
  };

  useEffect(() => {
    getAllResources()
    getAllRoles()
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
          placeholder={project.name}
          name="name"
          onChange={(nombre) => setName(nombre.target.value)}
        />
        <Flex gap={5}>
          <Button borderRadius={"5"} fontSize={20} onClick={() => edit()}>
            {" "}
            Guardar Proyecto{" "}
          </Button>
          <Button
            borderRadius={"5"}
            fontSize={20}
            onClick={() => handleDiscardButton()}
          >
            {" "}
            Descartar Cambios{" "}
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
            placeholder={project.description}
            onChange={(descripcion) => setDescription(descripcion.target.value)}
          />
        </Box>
        <Flex justifyContent="space-between" mx="10">
          <Box>
            <Text mt="5">Módulo</Text>
            <ChakraSelect
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
              value={projectType}
              placeholder={project.projectType}
              onChange={(value) => {
                setProjectType(value.target.value);
              }}
            >
              {models.map((type) => (
                <option value={type}>{type}</option>
              ))}
            </ChakraSelect>
          </Box>
          <Box>
            <Text mt="5" mx="10">Estado</Text>
            <ChakraSelect
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
              value={state}
              placeholder={project.state}
              onChange={(value) => {
                setState(value.target.value);
              }}
            >
              {proyectStates.map((state) => (
                <option value={state}>{state}</option>
              ))}
            </ChakraSelect>
          </Box>
        </Flex>
        <Flex border="0px" justifyContent={"space-between"} mx={"10"}>
          <Box width="xl" border='0px'>
            <Text mt="5">PM</Text>
            <ChakraSelect
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
              value={selectPM}
              onChange={(value) => {
                setSelectPM(value.target.value);
              }}
            >
              {resources.map((resource) => (
                <option value={resource.legajo}>{resource.Nombre} {resource.Apellido}</option>
              ))}
            </ChakraSelect>
            <Text mt="5">Sponsor</Text>
            <ChakraSelect
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
              value={selectedSponsor}
              onChange={(value) => {
                setSelectedSponsor(value.target.value);
              }}
            >
              {resources.map((resource) => (
                <option value={resource.legajo}>{resource.Nombre} {resource.Apellido}</option>
              ))}
            </ChakraSelect>
          </Box>
          <Box  width="xl" border='0px'>
            <Text mt="5" mb="2">Staff</Text>
            <Select
              placeholder="Sin empleados asignados"
              onChange={(data) => setStaff(data)}
              // value={task.resources.length !== 0 && task.resources}
              variant="filled"
              options={resources}
              classNamePrefix="chakra-react-select"
              isMulti
              size='md'
            />
            <Text mt="5" mb="2">Stakeholder</Text>
            <Select
              placeholder="Sin empleados asignados"
              onChange={(data) => setStakeHolders(data)}
              // value={task.resources.length !== 0 && task.resources}
              variant="filled"
              options={resources}
              classNamePrefix="chakra-react-select"
              isMulti
            />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" mx="10">
          <Box border="0px">
            <Text mt="5" mb="5">Fecha de inicio</Text>
            <DatePicker
              /* minH='50' border='0px' mt='2' bg='white' py='2' w='md' rounded='sm'  */ selected={
                startingDate
              }
              onChange={(date) => setStartingDate(date)}
            />
            <Text mt="5" mb="5">Fecha de finalización</Text>
            <DatePicker
              /* minH='50' border='0px' mt='2' bg='white' py='2' w='md' rounded='sm'  */ selected={
                endingDate
              }
              onChange={(date) => setEndingDate(date)}
            />
          </Box>
          <Box w="full" ml="40">
            <Text mt="5">Tareas</Text>
            <Box
              overflowY="auto"
              mt="5"
              minH="140px"
              maxH="140px"
              rounded="sm"
              py="2"
              px="10"
              bg="white"
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
              <VStack justifyContent="flex-start" justifyItems="left">
                <FlatList
                  list={tasks}
                  renderItem={(task) => returnTasks(task)}
                  renderWhenEmpty={() => <div>Este proyecto aún no tiene tareas asignadas</div>}
                />
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default EditProyect;
