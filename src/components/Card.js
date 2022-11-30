import React from "react";
import { Text, Box, Flex } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";

function ProyectCard({ info, path }) {
  return (
    <Box p="2" rounded="md">
      <Link to={{ pathname: path }}>
        <Flex mx="3" justifyContent="space-between">
          <Flex gap={1}>
            <Text>{info.projectId} - </Text>
            <Text>{info.name}</Text>
          </Flex>
          <Text
            borderRadius="md"
            bg="blue.100"
            px="2"
            py="1"
            size="sm"
            fontWeight="bold"
          >
            {info.state}
          </Text>
        </Flex>
        <Flex mt="5" justifyContent="space-between" mx="3">
          <Text>Iniciado {info.startingDate}</Text>
          <Text fontWeight="bold">{info.projectType}</Text>
        </Flex>
        <Text mt="5" mx="3">
          Finalización en {info.endingDate}
        </Text>
      </Link>
    </Box>
  );
}

export default ProyectCard;
export function ResourceCard({ info, path }) {
  const [searchParams] = useSearchParams();
  return (
    <Box p="2" rounded="md">
      <Link to={{ pathname: path, search: "?" + searchParams }}>
        <Flex mx="3" justifyContent="space-between">
          <Flex gap={1}>
            <Text>{info.id} - </Text>
            <Text>{info.nombre}</Text>
          </Flex>
          <Text borderRadius="md" bg="blue.100" px="2" py="1" size="sm">
            {info.estado}
          </Text>
        </Flex>
        <Flex mt="5" justifyContent="space-between" mx="3">
          <Text>Iniciado {info.fechaInicio}</Text>
          <Text fontWeight="bold">{info.tipoDeProyecto}</Text>
        </Flex>
        <Text mt="5" mx="3">
          Finalización en {info.finalizacionEstimada}
        </Text>
      </Link>
    </Box>
  );
}
