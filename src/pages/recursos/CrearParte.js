import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Box
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { tryCreateParte } from "./Backend";

function CrearParte({ legajo }) {
  const contexto = GetContextoRecursos();
  const navigate = useNavigateWParams();
  const [periodo, setPeriodo] = useState("");
  const [fecha, setFecha] = useState("");

  const handleCambioPeriodo = (e) => setPeriodo(e.target.value);
  const handleCambioFecha = (e) => setFecha(e.target.value);

  const handleSubmit = async (_) => {
    if (!(periodo && fecha)) {
      alert("Debe completar todos los campos");
      return;
    }

    console.log(`${periodo}, ${fecha}`);
    const parte = {
      type: periodo,
      startTime: fecha,
      workerId: legajo,
    };

    try {
      let response = await tryCreateParte(parte);
      alert("Se creo el parte con exito!");
      navigate("../../partes");
    } catch (error) {
      alert("No se pudo crear el parte");
      console.log(error);
    }
  };

  const descartar = (_) => {
    navigate("../../partes");
  };

  return (
    <>
      <Stack marginLeft={4} marginTop={5} spacing={4}>
        <FormControl isRequired>
          <FormLabel>Tipo</FormLabel>
          <Select 
            placeholder="Seleccione un período"
            onChange={handleCambioPeriodo}
          >
            <option value="SEMANAL">Semanal</option>
            <option value="QUINCENAL">Quincenal</option>
            <option value="MENSUAL">Mensual</option>
          </Select>

          <FormLabel>Fecha de inicio</FormLabel>
          <Input type="date" onChange={handleCambioFecha} />
        </FormControl>
        <Text>Reglas para crear un parte:</Text>
        <Box marginLeft={12} marginBottom={5}>
          <UnorderedList>
            <ListItem>Semanal: Indicar fecha de inicio un Lunes</ListItem>
            <ListItem>
              Quincenal: Indicar fecha de inicio un dia 1 o 16
            </ListItem>
            <ListItem>
              Mensual: Indicar fecha de inicio el primer dia del mes
            </ListItem>
          </UnorderedList>
        </Box>

        <HStack>
          <Button w="full" onClick={handleSubmit}>
            {contexto.partes.getPartes() !== undefined
              ? "Guardar cambios"
              : "Crear"}
          </Button>
          <Button w="full" onClick={descartar}>
            Descartar
          </Button>
        </HStack>
      </Stack>
    </>
  );
}

export default CrearParte;
