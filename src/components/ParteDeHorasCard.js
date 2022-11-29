import { Text, Box, Flex } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";

function ParteDeHorasCard(props) {
  const searchParams = useSearchParams()[0];
  const info = props.info;
  const nombre = "Parte " + info.tipo + " " + info.fechaInicio.toString();
  const horas = info.horas.toString() + " horas registradas";

  return (
    <Box p="2" rounded="md">
      <Link to={{ pathname: info.id, search: "?" + searchParams }}>
        <Flex mx="3" justifyContent="space-between">
          <Flex gap={1}>
            <Text>{info.id} - </Text>
            <Text>{nombre}</Text>
          </Flex>
          <Text borderRadius="md" bg="blue.100" px="2" py="1" size="sm">
            {info.estado}
          </Text>
        </Flex>
        <Text mt="5" mx="3">
          {horas}
        </Text>
      </Link>
    </Box>
  );
}

export default ParteDeHorasCard;
