import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function NewVersion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [resultTitle, setTitle] = React.useState("");
  const [resultBody, setBody] = React.useState("");
  const [input, setInput] = React.useState("");

  const handleChange = (e) => setInput(e.target.value);

  const createNewProduct = async () => {
    setLoading(true);

    if (input !== "") {
      try {
        const data = {
          number: input,
          product_id: props.product.product_id,
        };
        await axios.post("https://modulo-soporte.onrender.com/version", data);
        props.new_version();
        setTitle("Creacion de nueva version exitosa!");
        setBody("La nueva version del producto fue creada");
      } catch {
        setTitle("Hubo un problema");
        setBody("No se pudo crear la nueva version");
      }
      setDone(true);
    }

    setLoading(false);
  };

  const open = () => {
    setInput("");
    setDone(false);
    onOpen();
  };

  return (
    <>
      <Button onClick={open} colorScheme="gray" width="15%">
        Crear nueva version
      </Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg="gray.300">
          <ModalHeader>
            {done ? resultTitle : `Nueva version para ${props.product.product}`}
          </ModalHeader>
          <ModalBody>
            {done ? (
              resultBody
            ) : (
              <FormControl>
                <FormLabel>Numero de version</FormLabel>
                <Input
                  bg="white"
                  type="text"
                  value={input}
                  onChange={handleChange}
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            {done ? null : (
              <Button
                isLoading={loading}
                onClick={createNewProduct}
                colorScheme="green"
              >
                Crear version
              </Button>
            )}
            <Button
              isLoading={loading}
              onClick={onClose}
              colorScheme={done ? "gray" : "red"}
            >
              {done ? "Cerrar" : "Cancelar"}{" "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
