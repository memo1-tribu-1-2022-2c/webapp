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
        Accordion,
        AccordionItem,
        AccordionButton,
        AccordionIcon,
        AccordionPanel,
        Tag,
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
                
                    <VStack>
            <Accordion  allowToggle width="100%">
            <AccordionItem bg='white' borderTopRadius={5} width="100%">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.100'}} justifyContent="space-between">
                                <Tag size="lg" variant="outline" >Descripcion</Tag>
                                
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg='white' borderTopColor='white' justifyContent="center">
                            <Text>{props.descripcion}</Text>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>
            
            {props.state === "CERRADO" && 
            <AccordionItem bg='white' borderTopRadius={5} width="100%">
                {({ isExpanded }) => (
                    <>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'gray.100'}} justifyContent="space-between">
                                <Tag size="lg" variant="outline" >Resolucion</Tag>
                                
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg='white' borderTopColor='white' justifyContent="center">
                            <Text>{props.resolucion}</Text>
                        </AccordionPanel>
                    </>
                )}
            </AccordionItem>}
            </Accordion>
                    </VStack>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
                
                {props.state !== "CERRADO" && <Button 
                onClick={() => setSolveTicket(!solveticket)}>{'Resolver Ticket'}</Button>}
                 
                <Button onClick={close}>{"Cerrar"}</Button>
            </ModalFooter>
            </>}
            {solveticket && <SolveTicket ticket_id={props.id} back={() => {setSolveTicket(false)}} refresh={props.refresh}/>}
        </ModalContent>
    </Modal>;
}