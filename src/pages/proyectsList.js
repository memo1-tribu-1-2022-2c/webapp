import {
  Box,
  Grid,
  Select,
  Input,
  GridItem,
  Button,
  Flex,
} from "@chakra-ui/react";
import ProyectCard from "../components/Card";
import { useEffect, useState } from "react";
import useNavigateWParams from "../routes/navigation";

const proyectStates = [
  "TODOS",
  "NUEVO",
  "FINALIZADO",
  "EN_PROGRESO",
  "PAUSADO",
  "CANCELADO",
];

function ProyectsList() {
  const [projects, setProjects] = useState([]);
  const [projectsFilter, setProjectsFilter] = useState([]);
  const [proyectState, setProyectState] = useState("");

  const navigate = useNavigateWParams();
  const handleCreateProyect = () => {
    navigate("/proyectos/proyectsList/createProyect");
  };

  const wrapperLoadProyects = async () => {
    await loadProyects();
  };

  const loadProyects = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      "https://squad2-2022-2c.herokuapp.com/api/v1/projects/all",
      requestOptions
    );
    const responseData = await response.json();
    setProjects(responseData);
    setProjectsFilter(responseData);
  };

  const findProjects = (value, type) => {
    if (type === "filter") {
      if (value === "" || value === "TODOS") {
        setProjectsFilter(projects);
      } else {
        let filteredProyects = projects.filter((item) => item.state === value);
        setProjectsFilter(filteredProyects);
      }
      setProyectState(value);
    }
    if (type === "search") {
      if (value === "") {
        setProjectsFilter(projects);
      } else {
        let filteredProyects = projects.filter(
          (item) => item.name.indexOf(value) !== -1
        );
        setProjectsFilter(filteredProyects);
      }
    }
  };

  useEffect(() => {
    wrapperLoadProyects();
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
        <Flex gap={10}>
          <Input
            bg="white"
            width="xl"
            placeholder="Buscar proyecto..."
            onChange={(value) => {
              findProjects(value.target.value, "search");
            }}
          />
          <Select
            bg="white"
            value={proyectState ? proyectState : ""}
            onChange={(value) => {
              findProjects(value.target.value, "filter");
            }}
            placeholder="Filtrar por..."
            width="60" /* onChange={(value) => filterProjects(value)} */
          >
            {proyectStates.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </Select>
        </Flex>
        <Button
          borderRadius={"5"}
          fontSize={20}
          onClick={() => handleCreateProyect()}
        >
          Crear nuevo proyecto
        </Button>
      </Flex>
      <Box
        overflowY="auto"
        m="10"
        maxH="full"
        rounded="sm"
        bg="gray.300"
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
        <Box pl="40" py="5">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {projectsFilter.map((item) => (
              <GridItem
                bg="white"
                key={item.projectId}
                w="80%"
                h="150"
                rounded={"md"}
              >
                <ProyectCard
                  key={item.projectId}
                  info={item}
                  id={item.projectId}
                  path={`/proyectos/proyectsList/${item.projectId}`}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ProyectsList;
