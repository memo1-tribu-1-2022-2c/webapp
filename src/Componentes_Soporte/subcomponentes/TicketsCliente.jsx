import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, HStack, ModalBody, ModalFooter, Tag, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function TicketsCliente(props){
    const [mensaje, setMensaje] = React.useState("Cargando tickets")

    const [cargado, setCargado] = React.useState(false);

    const [tickets, setTickets] = React.useState([]);

    const cargarTickets = async () => {
        try{
            const data = await (await axios.get(`https://modulo-soporte.onrender.com/ticket/client/${props.client_id}`)).data
            const retrieved_tickets = data.tickets.filter(ticket => {
                
                return ticket.version_id == props.version.version_id
            })
            if (retrieved_tickets.length > 0){
                console.log(retrieved_tickets);
                setTickets(retrieved_tickets)
                setCargado(true)
            }else{
                setMensaje("El cliente no tiene tickets para este producto");
            }
        }catch{
            setMensaje("Hubo un problema cargando los tickets")
        }
    }

    React.useEffect(() =>{
        cargarTickets()
    }, [])

    const color = (criticidad) => {
        if (criticidad === "SLA 1"){
            return "red"
        }
        if (criticidad === "SLA 2"){
            return "orange"
        }
        if (criticidad === "SLA 3"){
            return "yellow"
        }
        if (criticidad === "SLA 4"){
            return "green"
        }
    }

    return <>
            <ModalBody>
                {!cargado && mensaje}
                {cargado && 
                <Accordion  allowToggle>
                {tickets.map(ticket => {
                   return <AccordionItem bg='white' borderTopRadius={5}>
                    {({ isExpanded }) => (
                        <>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'gray.100'}} justifyContent="space-between">
                                    <Tag size="lg" variant="outline" >{ticket.title}</Tag>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} bg='white' borderTopColor='white' justifyContent="space-between">
                            <HStack>
                                <Tag size="md" colorScheme={color(ticket.criticity)} variant="outline">{ticket.criticity}</Tag>
                                <Tag size="md" colorScheme={color(ticket.criticity)} variant="outline">{ticket.end_dt}</Tag>
                                <Tag size="md" colorScheme={ticket.state === "ABIERTO" ? "red" : "green"} variant="outline">{ticket.state}</Tag>
                            </HStack>
                            <HStack>
                                <Tag variant="outline" marginTop="2%">Encargado: {ticket.person_in_charge}</Tag>
                            </HStack>
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
                })}
                </Accordion>}
            </ModalBody>
            <ModalFooter justifyContent="space-between">
                <Button onClick={props.back}>Volver</Button>
            </ModalFooter>
            </>
}