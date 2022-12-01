import { Text, Box, Flex } from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";

function ParteDeHorasCard({info, path}) {
  const searchParams = useSearchParams()[0];
  const nombre = "Parte " + info.type + " " + info.startTime.toString();

  return (
    <Box p="2" rounded="md">
      <Link to={{ pathname: path, search: "?" + searchParams }}>
        <Flex mx="3" justifyContent="space-between">
          <Flex gap={1}>
            <Text>{info.id} - </Text>
            <Text>{nombre}</Text>
          </Flex>
          <Text borderRadius="md" bg="blue.100" px="2" py="1" size="sm">
            {info.status}
          </Text>
        </Flex>
      </Link>
    </Box>
  );
}

export default ParteDeHorasCard;
