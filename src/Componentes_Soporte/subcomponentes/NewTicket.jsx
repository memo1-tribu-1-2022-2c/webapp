import { Button, FormControl, FormHelperText, FormLabel, Textarea ,Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
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
                ticket_client_id: input.client_id,
                ticket_description: input.descripcion,
                ticket_end_dt: input.fecha_finalizacion,
                ticket_person_in_charge: input.person_in_charge,
                ticket_proyect_id: input.proyect_id,
                ticket_start_dt: input.fecha_inicio,
                ticket_state: input.estado,
                ticket_title: input.titulo,
                ticket_version_id: input.version_id
            };
            await axios.post("https://modulo-soporte.onrender.com/ticket", data);
            /* props.new_ticket(10); */
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
        <Button onClick={open} colorScheme="gray" width="45%">Crear nuevo ticket</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {done ? resultTitle : `Creación del ticket`}
                </ModalHeader>
                <ModalBody>
                    {done ? resultBody :
                        <FormControl>
                            <FormLabel>Titulo del ticket</FormLabel>
                            <Input type="text" value={input.titulo} onChange={handleChange} />
                            <FormLabel>Descripción del ticket</FormLabel>
                            <Textarea  type="text" value={input.descripcion} onChange={handleChange} />
                            <FormLabel>Estado del ticket</FormLabel>
                            <Input type="text" value={input.estado} onChange={handleChange} />
                            <FormLabel>Version del ticket</FormLabel>
                            <Input type="text" value={input.version_id} onChange={handleChange} />
                            <FormLabel>Fecha de inicio del ticket</FormLabel>
                            <Input type="text" value={input.fecha_inicio} onChange={handleChange} />
                            <FormLabel>Fecha de finalización del ticket</FormLabel>
                            <Input type="text" value={input.fecha_finalizacion} onChange={handleChange} />
                            <FormLabel>Id del cliente</FormLabel>
                            <Input type="text" value={input.client_id} onChange={handleChange} />
                            <FormLabel>Id del proyecto</FormLabel>
                            <Input type="text" value={input.proyect_id} onChange={handleChange} />
                            <FormLabel>Persona a cargo</FormLabel>
                            <Input type="text" value={input.person_in_charge} onChange={handleChange} />
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