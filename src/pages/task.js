import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Select
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Task() {

  const location = useLocation();
  const { taskId, taskResources, id, tasks } = location.state;

  const navigate = useNavigate();

  const [task, setTask] = useState({});

  const handleBackButton = () => {
    navigate(-1);
  };

  const handleEditTask = () => {
    navigate(`/proyectos/proyectsList/${id}/${task.id}/editTask`, {
      state: { task: task, taskResources: taskResources, tasks: tasks },
    });
  };
  // const putResource = async () => {
  //   const requestOptions = {
  //     method: "PUT",
  //   };
  //   const response = await fetch(
  //     `https://squad2-2022-2c.herokuapp.com/api/v1/tasks/${task.id}/resource/${resourceId}`,
  //     requestOptions
  //   );
  //   console.log(response);
  // };

  const getTask = async () => {
    const requestOptions = {
      method: "GET",
      Headers: {
        "Access-Control-Allow-Origin": "*",
      }
    };
    const response = await fetch(`https://squad2-2022-2c.herokuapp.com/api/v1/tasks/${taskId}`, requestOptions);
    const data = await response.json();
    setTask(data);
    console.log(data)
  }
  
  useEffect(() => {
    getTask();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex
        justifyContent="space-between"
        bg="gray.300"
        p="10"
        mx="10"
        mt="5"
        rounded="sm"
      >
        <Text border="0px" width="xl" fontSize="28">
          {" "}
          {task.id} - {task.name}{" "}
        </Text>
        <Flex gap={5}>
          <Button
            size="lg"
            borderRadius={"5"}
            fontSize={20}
            onClick={() => handleEditTask()}
          >
            {" "}
            Editar Tarea{" "}
          </Button>
          <Button
            size="lg"
            borderRadius={"5"}
            fontSize={20}
            onClick={() => handleBackButton()}
          >
            {" "}
            Volver{" "}
          </Button>
        </Flex>
      </Flex>
      <Box
        maxH="full"
        overflowY="auto"
        rounded="sm"
        bg="gray.300"
        my="5"
        mx="10"
        py="5"
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
        <Box mx="10" p="5" py="2" bg="white" border="0px" borderRadius="md">
          <HStack spacing="20" justifyContent="space-between">
            <Box>
              <Text fontWeight="bold">Descripci??n</Text>
              <Text p="2" h="100" w="xl" border="0px">
                {task.description}
              </Text>
            </Box>
            <VStack>
              <Text fontWeight="bold">Desarrollo</Text>
              <Text>Horas estimadas: {task.estimatedHours}</Text>
              <Text>Horas trabajadas: {task.workedHours}</Text>
            </VStack>
            <VStack>
              <Text borderRadius="md" bg="blue.100" px="2" py="1" size="sm">
                {task.state}
              </Text>
              <Text>Iniciado: {task.startingDate && task.startingDate.split("T")[0]}</Text>
              <Text>Finalizaci??n: {task.endingDate && task.endingDate.split("T")[0]}</Text>
            </VStack>
          </HStack>
        </Box>
        {/* <Box mx="10" mt="5">
          <Select
            placeholder="Empleados asignados"
            minH="50"
            rounded="sm"
            bg="white"
            mt="2"
            py="5"
            width="xl"
            onChange={(data) => handleSelect(data.target.value)}
            value={resourceId !== 0 ? resourceId : ""}
          >
            {resources
              .filter((r) => r.legajo)
              .map((r) => (
                <option key={r.legajo} value={r.legajo}>{`${r.Nombre} ${r.Apellido}`}</option>
              ))}
          </Select>
        </Box> */}
      </Box>
  </>
  );
}

export default Task;
