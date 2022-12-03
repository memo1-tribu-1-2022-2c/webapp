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
  Spinner,
  InputRightElement,
  InputGroup,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import { tryGetRecurso } from "./recursos/Backend";

function Login(props) {
  const [legajo, setLegajo] = useState("");
  const [isLoading, loading] = useBoolean(false);
  const [isValid, valid] = useBoolean(true);

  const handleCambio = (e) => setLegajo(e.target.value);
  const handleSubmit = (_) => {
    loading.on();
    valid.on();
    const esLegajoValido = async () => {
      try {
        let response = await tryGetRecurso(legajo);
        console.log(response.data);
      } catch (e) {
        return false;
      }
      return true;
    };
    esLegajoValido().then((esValido) => {
      if (esValido) {
        props.login(legajo);
      } else {
        valid.off();
      }
      loading.off();
    });
  };

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
              <InputGroup>
                <Input
                  isDisabled={isLoading}
                  isInvalid={!isValid}
                  bg={isValid ? null : "red.200"}
                  type="number"
                  onChange={handleCambio}
                  onFocusCapture={() => valid.on()}
                />
                <InputRightElement children={isLoading ? <Spinner /> : null} />
              </InputGroup>
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
