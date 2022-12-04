import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigateWParams } from "../../routes/navigation";
import { GetContextoRecursos } from "./Contexto";
import { tryCreateParte } from "./Backend";

const fechas_admitidas = {
  "SEMANAL": "lunes de cada semana",
  "QUINCENAL": "día 1 o 16 de cada mes",
  "MENSUAL": "primer día de cada mes",
};

// https://stackoverflow.com/questions/49277112/react-js-how-to-set-a-default-value-for-input-date-type
const getCurrentDateInput = () => {
  const dateObj = new Date();

  // get the month in this format of 04, the same for months
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return shortDate;
};

function CrearParte({ legajo }) {
  const contexto = GetContextoRecursos();
  const navigate = useNavigateWParams();
  const [periodo, setPeriodo] = useState("");
  const [fecha, setFecha] = useState(getCurrentDateInput());
  const [mensaje, setMensaje] = useState("");
  const [isLoading, loading] = useBoolean(false);

  const handleCambioPeriodo = (e) => setPeriodo(e.target.value);
  const handleCambioFecha = (e) => setFecha(e.target.value);

  const handleSubmit = async (_) => {
    if (!(periodo && fecha)) {
      setMensaje("Debe completar todos los campos");
      return;
    }

    loading.on();

    const parte = {
      type: periodo,
      startTime: fecha.toString(),
      workerId: legajo,
    };

    console.log(parte);

    try {
      await tryCreateParte(parte);
      navigate("../../partes");
    } catch (error) {
      console.log(error);
      setMensaje(error.response.data);
    }
    loading.off();
  };

  const descartar = (_) => {
    navigate("../../partes");
  };

  return (
    <>
      <Stack mx={50} marginTop={10} spacing={4}>
        <FormControl isRequired>
          <FormLabel>Tipo</FormLabel>
          <Select
            placeholder="Seleccione un período"
            onChange={handleCambioPeriodo}
            mb={8}
          >
            <option value="SEMANAL">Semanal</option>
            <option value="QUINCENAL">Quincenal</option>
            <option value="MENSUAL">Mensual</option>
          </Select>
            {periodo === "" ? null : (<Alert status='info' mb={5}>
            <AlertIcon />
            Fechas admitidas: {fechas_admitidas[periodo]}
          </Alert>)}
          {mensaje === "" ? null : (<Alert status='error' mb={5}>
        <AlertIcon />
        {mensaje}
      </Alert>)}
          <FormLabel>Fecha de inicio</FormLabel>
          <Input type="date" value={fecha} onChange={handleCambioFecha} />
        </FormControl>
        <HStack>
          <Button w="full" onClick={handleSubmit} isLoading={isLoading}>
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
