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
  Badge,
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

  const getEmployee = (id) => {
    const empleado = props.employees.filter(value => {
      return value.legajo == id
    });
    if (empleado.length > 0){
      return empleado[0].Nombre + " " + empleado[0].Apellido
    }

    return "Sin encargado"
  }

  return (
    <>
      <Card bg="gray.100" align="center" width="100%">
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
        <CardBody bg="white" width="98%" borderRadius={10}>
          <VStack>
          <Tag marginTop="3%">Ticket Id: <Badge size="sm">{props.ticket_id}</Badge></Tag>
          <Tag marginTop="3%">id del cliente: <Badge size="sm">{props.ticket_client}</Badge></Tag>
          <Tag marginTop="3%">Fecha Limite: <Badge size="sm">{props.ticket_end_date}</Badge></Tag>
          <Tag marginTop="3%">Persona a cargo: <Badge size="sm">{getEmployee(props.ticket_person_in_charge)}</Badge></Tag>
          <Tag marginTop="3%">Version del producto: <Badge size="sm">{props.ticket_product_version}</Badge></Tag>
          </VStack>
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
              employees={props.employees}
            />
          </HStack>
        </CardFooter>
      </Card>
    </>
  );
};

export default Ticket;
