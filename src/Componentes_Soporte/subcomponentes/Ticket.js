import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Heading,
  Tag,
  TagLabel,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import DetailsModal from "./DetailsModal";
import EscaladoModal from "./EscaladoModal";

const Ticket = ({
  ticket_id = "ticket id",
  ticket_title = "Titulo",
  ticket_state="OTRACOSA",
  ticket_client="cliente",
  ticket_end_date="fecha de finalizacion",
  ticket_person_in_charge="persona a cargo",
  ticket_description="Donec ullamcorper nec justo quis gravida. Nam posuere tortor quis orci feugiat eleifend ac a purus. Nulla ipsum sem, mollis quis lorem vel, tempor mollis ipsum. Aliquam vel neque dapibus, posuere ligula ut, convallis orci. Vivamus cursus arcu non bibendum pulvinar. Quisque varius a lacus ac tristique. Sed laoreet dignissim lectus, non scelerisque erat commodo sit amet.",
  ticket_product="producto",
  ticket_product_version="version",
  ticket_criticity="SLA 2",
  ticket_resolution="",
}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen:isOpenEscalado, onOpen: onOpenEscalado, onClose: onCloseEscalado} = useDisclosure();

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
  
  return (
    <>
      <Card bg='gray.100' align='center'>
        <CardHeader>
          <VStack >
          <Heading size={'md'}>{ticket_title}</Heading >
            <Box align='center'>
              <Tag size='lg' colorScheme={ticket_state === 'CERRADO' ? 'blue' : color(ticket_criticity)} borderRadius='full'>
                <TagLabel>{ticket_state}</TagLabel>
              </Tag>
            </Box>
          </VStack>
        </CardHeader>
        <CardBody bg='white' width='90%' borderRadius={10}>
          <Text>{ticket_client}</Text>
          <Text>{ticket_end_date}</Text>
          <Text>{ticket_person_in_charge}</Text>
          <Text>{ticket_product}</Text>
          <Text>{ticket_product_version}</Text>
        </CardBody>
        <CardFooter>
          <HStack>
            <Button onClick={onOpen} bg='gray.300' size='sm' >Detalles</Button>
            <Button onClick={onOpenEscalado} bg='gray.300' size='sm' >Escalar Ticket</Button>
 
                        <DetailsModal   isOpen={isOpen}
                                        onClose={onClose}
                                        title={ticket_title}
                                        descripcion={ticket_description}
                                        resolucion={ticket_resolution}
                                        id={ticket_id}
                                        />
                                        :
                        <EscaladoModal  isOpen={isOpenEscalado}
                                        onClose={onCloseEscalado}
                                        id={ticket_id}
                                        />



          </HStack>
        </CardFooter>
      </Card>
    </>
  );
};

export default Ticket;
