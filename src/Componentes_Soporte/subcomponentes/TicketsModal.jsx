import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import TicketsCliente from "./TicketsCliente";
import TicketSimplificado from "./TicketSimplificado";

export default function TicketsModal(props){
    const [newTicket, setNewTicket] = React.useState(false);
    const [viewTickets, setViewTickets] = React.useState(false);

    const close = () => {
        setNewTicket(false);
        setViewTickets(false);
        props.onClose();
    }

    const obtenerTexto = () => {
        if (viewTickets){
            return "Volver"
        }

        if (newTicket){
            return "Cancelar"
        }
    }

    return <Modal isOpen={props.isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent bg="gray.300">
            <ModalHeader>
                {!newTicket && !viewTickets && `Soporte producto ${props.product_name} (${props.version.number}) para ${props.razon_social}`}
                {newTicket && `Nuevo ticket para ${props.razon_social} en la version ${props.version.number} del producto ${props.product_name}`}
                {viewTickets && `Tickets de ${props.razon_social} para la version ${props.version.number} del producto ${props.product_name}`}
            </ModalHeader>
            {!newTicket && !viewTickets &&
            <>
            <ModalBody>
                
            </ModalBody>
            <ModalFooter justifyContent="space-between">
                
                <Button 
                onClick={() => setNewTicket(!newTicket)}>{"Nuevo ticket"}</Button>
                 
                <Button 
                onClick={() => setViewTickets(!viewTickets)}>{viewTickets ? "Volver" : "Ver tickets"}</Button>
                <Button onClick={close} 
                        colorScheme={newTicket ? "red" : null}>{"Cerrar"}</Button>
            </ModalFooter>
            </>}
            {newTicket && <TicketSimplificado version={props.version} project={props.project} client_id={props.client_id} back={() => {setNewTicket(false)}}/>}
            {viewTickets && <TicketsCliente version={props.version} client_id={props.client_id} back={() => {setViewTickets(false)}}/>}
        </ModalContent>
    </Modal>;
}