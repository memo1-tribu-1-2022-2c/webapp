import {
  Text,
  Box,
  Flex,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Stack,
  Input,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import useNavigateWParams from "../routes/navigation";

function ParteDeHorasCard(props) {
  const navigate = useNavigateWParams();
  const info = props.info;
  const nombre = "Parte " + info.tipo + " " + info.fechaInicio.toString();
  const horas = info.horas.toString() + " horas registradas";

  const masInfo = () => navigate(info.id.toString());
  const editar = () => navigate(info.id.toString() + "/edit");

  return (
    <Box p="2" rounded="md">
      <Flex mx="3" justifyContent="space-between">
        <Flex gap={1}>
          <Text>{nombre}</Text>
        </Flex>
        <IconButton icon={<EditIcon />} onClick={editar} />
        <Text borderRadius="md" bg="blue.100" px="2" py="1" size="sm">
          {info.estado}
        </Text>
      </Flex>
      <Flex m="3" justifyContent="space-between">
        <Text mx="3">{horas}</Text>
        <Button onClick={masInfo}>Más info.</Button>
      </Flex>
    </Box>
  );
}

export default ParteDeHorasCard;
