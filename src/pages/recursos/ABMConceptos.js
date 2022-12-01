import { Box, Button, Grid, Input, Text, Stack } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { tryCreateConcept } from "./Backend";

export default function ABMConceptos({ setTitle }) {
  const [esRemunerado, setEsRemunerado] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  //setTitle("ABM Conceptos");

  async function handleCreate() {
    let remunerado = esRemunerado === "true";
    try {
      const response = await tryCreateConcept(nombre, descripcion, remunerado);
      console.log(response);
    } catch (e) {
      console.log(e);
      alert("No se pudo crear el parte!")
    }
  
  }

  return (
    <>
      <Box
        overflowY="auto"
        m="10"
        maxH="full"
        rounded="sm"
        bg="gray.400"
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
          flexDirection={"column"}
          alignItems={"center"}
          gap={4}
          marginBottom={10}
        >
          <Input
            bg="white"
            width="xl"
            placeholder="Nombre..."
            onChange={(e) => {
              e.preventDefault();
              setNombre(e.target.value);
            }}
          />
          <Input
            bg="white"
            width="xl"
            placeholder="Descripción..."
            onChange={(e) => {
              e.preventDefault();
              setDescripcion(e.target.value);
            }}
          />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={4}
        >
          <Text style={{ fontSize: 20 }}>Es remunerado?</Text>
          <RadioGroup
            onChange={setEsRemunerado}
            value={esRemunerado}
          >
            <Stack direction="row" gap={10}>
              <Radio value={"true"}>Si</Radio>
              <Radio value={"false"}>No</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Grid marginTop={10} templateColumns="repeat(2, 1fr)" gap={6}>
          <Button borderRadius={"5"} fontSize={18} onClick={handleCreate}>
            Crear
          </Button>
          <Button borderRadius={"5"} fontSize={18}>
            Consultar
          </Button>
          <Button borderRadius={"5"} fontSize={18}>
            Eliminar
          </Button>
          <Button borderRadius={"5"} fontSize={18}>
            Modificar
          </Button>
        </Grid>
      </Box>
    </>
  );
}
