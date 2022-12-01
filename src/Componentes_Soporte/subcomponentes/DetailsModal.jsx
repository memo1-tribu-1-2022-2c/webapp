import {Button, 
        Modal, 
        ModalBody, 
        ModalContent,
        ModalFooter, 
        ModalHeader, 
        ModalOverlay, 
        Text, 
        Flex,
        VStack,
    } from "@chakra-ui/react";
import React from "react";
import SolveTicket from "./SolveTicket";

export default function DetailsModal(props){
    const [solveticket, setSolveTicket] = React.useState(false);

    const close = () => {
        setSolveTicket(false);
        props.onClose();
    }


    return <Modal isOpen={props.isOpen} onClose={close}>
        <ModalOverlay />
        <ModalContent bg="gray.300">
            <ModalHeader>
                <Text>{props.title}</Text>
                <Text>Numero de ticket: {props.id}</Text>
            </ModalHeader>
            {!solveticket &&
            <>
            <ModalBody>
                <Flex bg='white' borderRadius={5} padding={3} >
                    <VStack>
                        <Text>{props.descripcion}</Text>
                        <Text>{props.resolucion}</Text>
                    </VStack>
                </Flex>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
                
                <Button 
                onClick={() => setSolveTicket(!solveticket)}>{'Resolver Ticket'}</Button>
                 
                <Button onClick={close}>{"Cerrar"}</Button>
            </ModalFooter>
            </>}
            {solveticket && <SolveTicket ticket_id={props.id} back={() => {setSolveTicket(false)}}/>}
        </ModalContent>
    </Modal>;
}