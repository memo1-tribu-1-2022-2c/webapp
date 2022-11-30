import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function NewTicket(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [loading, setLoading] = React.useState(false);
    const [done, setDone] = React.useState(false);
    const [resultTitle, setTitle] = React.useState('');
    const [resultBody, setBody] = React.useState('');
    const [input, setInput] = React.useState("");

    const handleChange = (e) => setInput(e.target.value);

    const createNewTicket = async () => {
        setLoading(true);
        try {
            const data = {
                ticket_id: props.ticket.ticket_id,
                ticket_title: props.ticket.ticket_title
            };
            await axios.post("https://modulo-soporte.onrender.com/ticket", data);
            props.new_ticket(props.ticket.ticket_id);
            setTitle("Creacion de un nuevo ticket exitoso!")
            setBody("El nuevo ticket fue creado");
        } catch {
            setTitle("Hubo un problema");
            setBody("No se pudo crear el ticket");
        }

        setDone(true);
        setLoading(false);
    }

    const open = () => {
        setInput("");
        setDone(false);
        onOpen();
    }

    return <>
        <Button onClick={open} colorScheme="gray" width="15%">Crear nuevo ticket</Button>
        <Modal isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {done ? resultTitle : `Nuevo ticket: ${props.ticket.ticket_title}`}
                </ModalHeader>
                <ModalBody>
                    {done ? resultBody :
                        <FormControl>
                            <FormLabel>Nombre del ticket</FormLabel>
                            <Input type="text" value={input} onChange={handleChange} />
                        </FormControl>
                    }
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    {done ? null : <Button isLoading={loading} onClick={createNewTicket} colorScheme="green">Crear ticket</Button>}
                    <Button isLoading={loading} onClick={onClose} colorScheme="gray" >{done ? "Cerrar" : "Cancelar"} </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>;
}