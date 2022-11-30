import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import React from "react";

const Ticket = ({
  ticket_id = "ticket id de prueba",
  ticket_title = "titulo del ticket",
}) => {
  console.log(ticket_id + ticket_title);

  return (
    <Accordion allowToggle>
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
  );
};

export default Ticket;
