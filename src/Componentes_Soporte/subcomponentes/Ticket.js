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
} from "@chakra-ui/react";
import React from "react";

const Ticket = ({
  ticket_id = "ticket id de prueba",
  ticket_title = "titulo del ticket",
}) => {
  console.log(ticket_id + ticket_title);

  return (
    <>
      {/*<Accordion allowToggle>
      <AccordionItem bg="white" borderTopRadius={5}>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton _expanded={{ bg: "gray.100" }}>
                <Box pr={14} flex="1" textAlign="left">
                  {ticket_title} ticket_id: {ticket_id}
                </Box>
                {isExpanded ? (
                  <Button>Ocultar Productos</Button>
                ) : (
                  <Button>Ver Productos</Button>
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg="white" borderTopColor="white">
              Soy el Ticket {ticket_id}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion> 
                */}

      <Card bg='gray.100' align='center'>
        <CardHeader>
          <VStack >
          <Heading size={'md'}>Titulo</Heading >
            <Box align='center'>
              <Tag size='lg' colorScheme='blue' borderRadius='full'>
                <TagLabel>Cerrado</TagLabel>
              </Tag>
            </Box>
          </VStack>
        </CardHeader>
        <CardBody bg='white' width='90%' borderRadius={10}>
          <Text>Cliente</Text>
          <Text>Fecha de Finalizacion</Text>
          <Text>Persona a Cargo</Text>
          <Text>Producto</Text>
        </CardBody>
        <CardFooter>
          <HStack>
            <Button bg='gray.300' size='sm' >Detalles</Button>
            <Button bg='gray.300' size='sm' >Escalar Ticket</Button>
          </HStack>
        </CardFooter>
      </Card>
    </>
  );
};

export default Ticket;
