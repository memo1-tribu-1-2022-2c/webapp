import { Box, Button, Grid, Input, Text, Stack } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
export default function ABMConceptos({ setTitle }) {
  const [radioValue, setRadioValue] = useState();
  //setTitle("ABM Conceptos");
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
          <Input bg="white" width="xl" placeholder="Nombre..." />
          <Input bg="white" width="xl" placeholder="Descripción..." />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={4}
        >
          <Text style={{ fontSize: 20 }}>Es remunerado?</Text>
          <RadioGroup onChange={setRadioValue} value={radioValue}>
            <Stack direction="row" gap={10}>
              <Radio value="Si">Si</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Grid marginTop={10} templateColumns="repeat(2, 1fr)" gap={6}>
          <Button borderRadius={"5"} fontSize={18}>
            Crear
          </Button>
          <Button borderRadius={"5"} fontSize={18}>
            Consultar
          </Button>
          <Button borderRadius={"5"} fontSize={18}>
            Elminar
          </Button>
          <Button borderRadius={"5"} fontSize={18}>
            Modificar
          </Button>
        </Grid>
      </Box>
    </>
  );
}
