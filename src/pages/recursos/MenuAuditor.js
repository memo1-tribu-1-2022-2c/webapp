import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";

function MenuAuditor(props) {
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
        <Box
          display={"flex"}
          justifyContent={"center"}
          columnGap={230}
        >
          <Box justifyContent={"center"} display={"flex"} flexDirection={"column"} gap={4} >
            <Text style={{ fontSize: 40 }}>Reportes</Text>
            <Button borderRadius={"5"} fontSize={20}>
              Proyectos
            </Button>
            <Button borderRadius={"5"} fontSize={20}>
              Empleados
            </Button>
          </Box>

          <Box>
            <Text style={{ fontSize: 40 }}>Validacion</Text>
            <Button borderRadius={"5"} fontSize={20}>
              Parte de Horas
            </Button>
          </Box>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          marginTop={10}
          columnGap={230}
        >
          <Box>
            <Text style={{ fontSize: 40 }}>Conceptos</Text>
            <Button borderRadius={"5"} fontSize={20}>
              ABM de Conceptos
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default MenuAuditor;
