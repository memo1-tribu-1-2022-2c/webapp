import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Input,
    FormLabel,
    FormControl,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";

export default function DetailsModal(props) {
    const [errorMessage, setErrorMessage] = React.useState('');
    const [empleado, setEmpleado] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [doneText, setDoneText] = React.useState('');
    const [done, setDone] = React.useState(false);

    const close = () => {
        setDone(false);
        setErrorMessage('');
        props.back();
    }


    const checks = () => {
        let changed = false;
        setErrorMessage('');
        if (empleado === "") {
            changed = true;
            setErrorMessage("Debe ingresar un empleado");
        }
        return changed
    }

    const escalarTicket = async () => {
        setLoading(true);
        if (!checks()) {
            const data = {
                ticket_person_in_charge: empleado,
                ticket_client_id: props.ticket_client_id,
                ticket_description : props.ticket_description,
                ticket_end_dt : props.ticket_end_dt,
                ticket_end_details : props.ticket_end_details,
                ticket_project_id : props.ticket_project_id,
                ticket_start_dt : props.ticket_start_dt,
                ticket_title : props.ticket_title,
                ticket_version_id : props.ticket_version_id,
                ticket_state: "ENANALISIS",
                ticket_id : props.id,
        
            }

            console.log(data);
            try {
                await axios.patch(`https://modulo-soporte.onrender.com/ticket/${props.id}`, data);

                setDoneText("Ticket escalado exitosamente");
            } catch {
                setDoneText("No se pudo escalar el ticket");
            }
            setDone(true);
        }

        setLoading(false);
    }

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={close}>
                <ModalOverlay />
                <ModalContent bg="gray.300">
                    <ModalHeader>
                        <Text>{props.title}</Text>
                        <Text>Numero de ticket: {props.id}</Text>
                    </ModalHeader>
                    <ModalBody>
                        <Text color="red.600">{errorMessage}</Text>
                        {done && <Text>{doneText}</Text>}
                        {!done ? <FormControl>
                            <FormLabel marginTop="5%">Elegir Empleado a cargo</FormLabel>
                            <Input
                                bg="white"
                                type="text"
                                value={empleado}
                                onChange={(e) => setEmpleado(e.target.value)}
                            />
                        </FormControl> : null}
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        {!done && <Button isLoading={loading} colorScheme="green" onClick={escalarTicket}>Escalar</Button>}
                        <Button isLoading={loading} colorScheme="red" onClick={close}>{!done ? "Cancelar" : "Volver"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}