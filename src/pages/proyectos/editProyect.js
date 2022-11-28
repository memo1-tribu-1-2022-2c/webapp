import {
  Box,
  Text,
  Input,
  Flex,
  Button,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useNavigateWParams } from "../../routes/navigation";
import Routing from "../../routes/config";

function EditProyect() {
  const navigate = useNavigateWParams();
  const handleDiscardButton = () => {
    navigate(Routing.Proyectos + "/proyectsList/001");
  };

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
        />
        <Flex gap={5}>
          <Button borderRadius={"5"} fontSize={20}>
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
          <Input border="0px" rounded="sm" minH="150px" textAlign="justify" />
        </Box>
        <Flex justifyContent="space-between" mx="10">
          <Box>
            <Text mt="5">Módulo</Text>
            <Select
              placeholder=""
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
            >
              <option value="Módulo 1">Módulo 1</option>
              <option value="Módulo 2">Módulo 2</option>
            </Select>
          </Box>
          <Box>
            <Text mt="5">Estado</Text>
            <Select
              placeholder=""
              minH="50"
              border="0px"
              rounded="sm"
              bg="white"
              py="2"
              width="md"
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Finalizado">Finalizado</option>
              <option value="En progreso">En progreso</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </Select>
          </Box>
          <Box>
            <Text mt="5">Horas estimadas</Text>
            <Input
              minH="50"
              border="0px"
              mt="2"
              bg="white"
              py="2"
              w="sm"
              rounded="sm"
            />
          </Box>
          <Box>
            <Text mt="5">Horas trabajadas</Text>
            <Input
              minH="50"
              border="0px"
              mt="2"
              bg="white"
              py="2"
              w="sm"
              rounded="sm"
            />
          </Box>
        </Flex>
        <Flex justifyContent="space-between" mx="10">
          <Box>
            <Text mt="5">Fecha de inicio</Text>
            <Input
              minH="50"
              border="0px"
              mt="2"
              bg="white"
              py="2"
              w="md"
              rounded="sm"
            />
            <Text mt="5">Fecha de finalización</Text>
            <Input
              minH="50"
              border="0px"
              mt="2"
              bg="white"
              py="2"
              w="md"
              rounded="sm"
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
                <Text alignSelf="flex-start">001 Buy the chinchulines</Text>
                <Text alignSelf="flex-start">002 Start the fire</Text>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default EditProyect;
