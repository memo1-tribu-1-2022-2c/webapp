import { Button, ModalBody, ModalFooter } from "@chakra-ui/react";

export default function TicketsCliente(props){
    return <>
            <ModalBody></ModalBody>
            <ModalFooter justifyContent="space-between">
                <Button onClick={props.back}>Volver</Button>
            </ModalFooter>
            </>
}