import {
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

const Ticket = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEscalado,
    onOpen: onOpenEscalado,
    onClose: onCloseEscalado,
  } = useDisclosure();

  const color = (criticidad) => {
    if (criticidad === "SLA 1") {
      return "red";
    }
    if (criticidad === "SLA 2") {
      return "orange";
    }
    if (criticidad === "SLA 3") {
      return "yellow";
    }
    if (criticidad === "SLA 4") {
      return "green";
    }
  };

  return (
    <>
      <Card bg="gray.100" align="center">
        <CardHeader >
          <VStack>
            <Heading size={"md"}>{props.ticket_title}</Heading>
            <Box align="center">
              <Tag
                size="lg"
                colorScheme={
                  props.ticket_state === "CERRADO"
                    ? "blue"
                    : color(props.ticket_criticity)
                }
                borderRadius="full"
              >
                <TagLabel>{props.ticket_state}</TagLabel>
              </Tag>
              
            </Box>
            <Tag colorScheme={
                   color(props.ticket_criticity)
                }
                borderRadius="full">
                <TagLabel>{props.ticket_criticity}</TagLabel>
              </Tag>
          </VStack>
        </CardHeader>
        <CardBody bg="white" width="90%" borderRadius={10}>
          <Text>id del cliente: {props.ticket_client}</Text>
          <Text>Fecha Limite: {props.ticket_end_date}</Text>
          <Text>Persona a cargo: {props.ticket_person_in_charge}</Text>
          <Text>{props.ticket_product}</Text>
          <Text>Version del producto: {props.ticket_product_version}</Text>
        </CardBody>
        <CardFooter>
          <HStack>
            <Button onClick={onOpen} bg="gray.300" size="sm">
              Detalles
            </Button>
            {props.ticket_state !== "CERRADO" ? (
              <Button onClick={onOpenEscalado} bg="gray.300" size="sm">
                Escalar Ticket
              </Button>
            ) : null}

            <DetailsModal
              isOpen={isOpen}
              onClose={onClose}
              title={props.ticket_title}
              descripcion={props.ticket_description}
              resolucion={props.ticket_resolution}
              id={props.ticket_id}
              refresh={props.refresh}
              state={props.ticket_state}
            />

            <EscaladoModal
              isOpen={isOpenEscalado}
              back={onCloseEscalado}
              id={props.ticket_id}
              ticket_client_id={props.ticket_client}
              ticket_description={props.ticket_description}
              ticket_end_dt={props.ticket_end_date}
              ticket_criticity={props.ticket_criticity}
              ticket_end_details={props.ticket_resolution}
              ticket_project_id={props.ticket_project_id}
              ticket_start_dt={props.ticket_start_date}
              ticket_title={props.ticket_title}
              ticket_version_id={props.ticket_product_version}
              refresh={props.refresh}
            />
          </HStack>
        </CardFooter>
      </Card>
    </>
  );
};

export default Ticket;
