import {
  Text,
  Box,
  Flex,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {useNavigateWParams} from "../routes/navigation";
import { Link, useSearchParams } from "react-router-dom";

function ParteDeHorasCard(props) {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigateWParams();
  const info = props.info;
  const nombre = "Parte " + info.tipo + " " + info.fechaInicio.toString();
  const horas = info.horas.toString() + " horas registradas";

  const masInfo = () => navigate(info.id.toString());
  const editar = () => navigate(info.id.toString() + "/edit");

  return (
    <Box p='2' rounded='md'>
            <Link to={{pathname: info.id, search: "?" + searchParams}}>
                <Flex mx='3' justifyContent='space-between'>
                    <Flex gap={1}>
                        <Text>{info.id} - </Text>
                        <Text>{nombre}</Text>
                    </Flex>
                    <Text borderRadius='md' bg='blue.100' px='2' py='1' size='sm'>{info.estado}</Text>
                </Flex>
                <Text mt='5' mx='3'>{horas}</Text>
            </Link>
        </Box>
  );
}

export default ParteDeHorasCard;
