import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

function Login(props) {
  const [legajo, setLegajo] = useState("");

  const handleCambio = (e) => setLegajo(e.target.value);
  const handleSubmit = (_) => props.login(legajo);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>PSA Cloud ERP</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="legajo">
              <FormLabel>Nro. de legajo</FormLabel>
              <Input type="number" onChange={handleCambio} />
            </FormControl>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
            <Button onClick={(_) => props.auditor()}>Soy Auditor</Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
