import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
} from "@chakra-ui/react";

import ParteDeHorasCard from "../../components/ParteDeHorasCard";
import { useNavigateWParams } from "../../routes/navigation";

function ListadoDePartes(props) {
  const navigate = useNavigateWParams();
  const crearParte = () => {
    navigate("crear");
  };
  const partes = props.partes;
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
          <Input bg="white" width="xl" placeholder="Buscar proyecto..." />
          <Select bg="white" placeholder="Filtrar por..." width="60">
            <option value="Nuevo">Nuevo</option>
            <option value="Finalizado">Finalizado</option>
            <option value="En progreso">En progreso</option>
            <option value="Pausado">Pausado</option>
            <option value="Cancelado">Cancelado</option>
          </Select>
        </Flex>
        <Button borderRadius={"5"} fontSize={20}>
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
            {partes.map((value, index) => (
              <GridItem bg="white" key={index} w="80%" h="150" rounded={"md"}>
                <ParteDeHorasCard
                  info={value}
                  path={`/proyectsList/${value.id}`}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ListadoDePartes;
