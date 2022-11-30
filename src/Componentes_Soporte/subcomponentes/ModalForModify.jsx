import { Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function ModalModify(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const [title, setTitle] = React.useState(props.title);
    const [body, setBody] = React.useState(props.body);

    const [done, setDone] = React.useState(false);

    const [input, setInput] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const modify = async () => {
        setLoading(true);
        try{
            const response = await props.modify(input);
            setTitle("Modificacion exitosa");
            setBody(props.onSucces)
        }catch{
            setTitle("Modificacion fallida");
            setBody(props.onFailure)
        }
        setDone(true);
        setLoading(false)

    };

    const open = () => {
        setDone(false);
        setTitle(props.title);
        setBody(props.body)
        onOpen();
    }

    return <>
                <Button onClick={open} colorScheme="blue">{props.buttonText}</Button>
                
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody >
                            <Flex flexDirection="column" alignContent="center" justifyContent="center">
                            <Text>{body}</Text> 
                            {!done ? <Input marginTop="5%" variant='outline'
                                placeholder = {props.placeholder}
                                bg="white"
                                width='auto'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            /> : null}
                            </Flex>
                        </ModalBody>
                        <ModalFooter justifyContent="space-between">
                            {!done ? <Button isLoading={loading} colorScheme="green" onClick={modify}>Confirmar</Button> : null}
                            <Button isLoading={loading} colorScheme={done ? "gray" : "red"} onClick={onClose}>{done ? "cerrar" : "Cancelar"}</Button>
                        </ModalFooter>
                    </ModalContent>
                    </ModalOverlay>
                </Modal>
            </>;
}