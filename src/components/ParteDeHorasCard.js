import { Text, Box, Flex } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import { capitalize } from "../pages/recursos/utils";

function ParteDeHorasCard({ info, path }) {
  const searchParams = useSearchParams()[0];
  const nombre = "Parte " + info.type + " " + info.startTime.toString();

  return (
    <Box p="2" rounded="md">
      <Link to={{ pathname: path, search: "?" + searchParams }}>
        <Flex mx="3" justifyContent="space-between">
          <Flex gap={1}>
            <Text as="b">
              {info.id} - {nombre}
            </Text>
          </Flex>
          <Text as="b" borderRadius="md" bg="blue.100" px="2" py="1" size="sm">
            {capitalize(info.status)}
          </Text>
        </Flex>
        <Text ml={5}>Legajo: {info.workerId}</Text>
      </Link>
    </Box>
  );
}

export default ParteDeHorasCard;
