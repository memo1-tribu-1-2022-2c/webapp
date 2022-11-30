import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  Stack,
  filter,
  Heading,
  FormLabel,
} from "@chakra-ui/react";
import ProyectCard from "../../components/Card";

export default function ReportesProyectos({setTitle}) {
  const fake_project = {
    projectID: 124,
    name: "Proyecto 1",
    state: "En curso",
    startingDate: "21/10/2022",
    projectType: "Software",
    endingDate: "21/10/2022",
  };
  //setTitle("Reportes de Proyectos");
  const proyectos = [fake_project, fake_project, fake_project, fake_project];
  return (
    <>
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
        <Box display={"flex"} gap={10}>
          <Input
            marginLeft={5}
            bg="white"
            w={"40%"}
            placeholder="Buscar parte..."
          />
          <Select bg="white" placeholder="Filtrar por..." width="60">
            <option value="todas">Todas</option>
            <option value="en borrador">En borrador</option>
            <option value="emitido">Emitido</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </Select>
        </Box>
        <Box pl="40" py="5">
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {proyectos.map((value, index) => (
              <GridItem bg="white" key={index} w="80%" h="150" rounded={"md"}>
                <ProyectCard
                  info={value}
                  path={null}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
        
      </Box>
    </>
  );
}
