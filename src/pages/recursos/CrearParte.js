import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import useNavigateWParams from "../../routes/navigation";

function CrearParte(props) {
  const navigate = useNavigateWParams();
  const [periodo, setPeriodo] = useState("");
  const [fecha, setFecha] = useState("");

  const handleCambioPeriodo = (e) => setPeriodo(e.target.value);
  const handleCambioFecha = (e) => setFecha(e.target.value);

  const handleSubmit = (_) => {
    console.log(`${periodo}, ${fecha}`);
    navigate(-1);
  };
  const descartar = (_) => {
    navigate(-1);
  };

  return (
    <>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Tipo</FormLabel>
          <Select
            placeholder="Seleccione un período"
            onChange={handleCambioPeriodo}
          >
            <option value="semanal">Semanal</option>
            <option value="quincenal">Quincenal</option>
            <option value="mensual">Mensual</option>
          </Select>

          <FormLabel>Fecha de inicio</FormLabel>
          <Input type="date" onChange={handleCambioFecha} />
        </FormControl>
        <HStack>
          <Button w="full" onClick={handleSubmit}>
            CrearParte
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
