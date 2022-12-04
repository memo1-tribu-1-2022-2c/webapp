import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function ModalModify(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [title, setTitle] = React.useState(props.title);
  const [body, setBody] = React.useState(props.body);

  const [done, setDone] = React.useState(false);

  const [input, setInput] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const [chosenOption, setChosenOption] = React.useState('');

  const choose = (value) => {
    setChosenOption(value);
    setInput(value);
  }

  const modify = async () => {
    setLoading(true);
    try {
      if (!chosenOption){
        setTitle("Por favor elija un cliente");
        setLoading(false);
        return
      }
      const response = await props.modify(chosenOption);
      setTitle("Modificacion exitosa");
      setBody(props.onSucces);
    } catch {
      setTitle("Modificacion fallida");
      setBody(props.onFailure);
    }
    setDone(true);
    setLoading(false);
  };

  const open = () => {
    setDone(false);
    setTitle(props.title);
    setBody(props.body);
    onOpen();
  };

  return (
    <>
      <Button onClick={open} colorScheme="blue">
        {props.buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent bg="gray.300">
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
              <Flex
                flexDirection="column"
                alignContent="center"
                justifyContent="center"
              >
                <Text>{body}</Text>
                {!done ? (
                  <>
                  <Input
                    marginTop="5%"
                    variant="outline"
                    placeholder={props.placeholder}
                    bg="white"
                    width="auto"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <Select bg="white" marginTop="5%" onChange={(e) => choose(e.target.value)}>
                    {props.clients.map(client => {
                        if (client.razon_social.toLowerCase().match(input.toLowerCase()) || client.id.match(input)){
                          return <option value={client.id}>{client.razon_social} <Tag>id:{client.id}</Tag></option>  
                        }
                    })}
                  </Select>
                  </>
                ) : null}
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              {!done ? (
                <Button
                  isLoading={loading}
                  colorScheme="green"
                  onClick={modify}
                >
                  Confirmar
                </Button>
              ) : null}
              <Button
                isLoading={loading}
                colorScheme={done ? "gray" : "red"}
                onClick={onClose}
              >
                {done ? "cerrar" : "Cancelar"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
