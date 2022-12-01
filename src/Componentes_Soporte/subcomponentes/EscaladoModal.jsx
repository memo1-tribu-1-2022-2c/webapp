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
    const [escalar, setEscalar] = React.useState(false);
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
            setErrorMessage("El detalle no puede estar vacio");
        }
        return changed
    }

    const escalarTicket = async () => {
        setLoading(true);
        if (!checks()) {
            const data = {
                person_in_charge: empleado,
                ticket_state: "ENANALISIS",
                ticket_id: props.id,
            }

            console.log(data);
            try {
                await axios.patch("https://modulo-soporte.onrender.com/ticket", data);

                setDoneText("Ticket resuelto exitosamente");
            } catch {
                setDoneText("No se pudo cerrar el ticket");
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
                                onChange={(e) => setEscalar(e.target.value)}
                            />
                        </FormControl> : null}
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        {!done && <Button isLoading={loading} colorScheme="green" onClick={escalarTicket}>Escalar</Button>}

                        <Button isLoading={loading}  onClick={close}>{"Cancelar"}</Button>
                    </ModalFooter>
        </ModalContent>
    </Modal>;
    </>
    )
}