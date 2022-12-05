import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function TicketSimplificado(props) {
  const [titulo, setTitulo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [fecha_finalizacion, setFin] = React.useState(new Date());
  const [person_in_charge, setInCharge] = React.useState("");
  const [criticidad, setCriticidad] = React.useState("");

  const [employees, setEmployees] = React.useState([]);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [doneText, setDoneText] = React.useState("");

  const checks = () => {
    let changed = false;
    setErrorMessage("");
    if (titulo === "") {
      changed = true;
      setErrorMessage("El titulo del ticket no puede estar vacio");
    }

    if (descripcion === "") {
      changed = true;
      setErrorMessage("La descripcion del ticket no puede estar vacia");
    }

    if (person_in_charge === "") {
      changed = true;
      setErrorMessage("La persona a cargo no puede estar vacia");
    }

    if (new Date(fecha_finalizacion) < new Date()) {
      changed = true;
      setErrorMessage("La fecha de finalizacion no debe haber pasado");
    }

    return changed;
  };
  const loadPersonal = async () => {
    setLoading(true);
    try{
      const personal = await (await axios.get("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")).data;
      setEmployees(personal);
      
    }catch{

    }
    setLoading(false);
  }
  const criticidadAPrioridad = (criticidad) => {
    if (criticidad === "SLA 1") {
      return "URGENT";
    }
    if (criticidad === "SLA 2") {
      return "HIGH";
    }
    if (criticidad === "SLA 3") {
      return "MEDIUM";
    }

    if (criticidad === "SLA 4") {
      return "LOW";
    }

    return "NONE";
  };

  const createTicket = async () => {
    setLoading(true);
    if (!checks()) {
      const data = {
        ticket_client_id: parseInt(props.client_id),
        ticket_criticity: criticidad,
        ticket_description: descripcion,
        ticket_end_dt: new Date(fecha_finalizacion).toISOString().split("T")[0],
        ticket_person_in_charge: person_in_charge,
        ticket_project_id: props.project.projectId,
        ticket_start_dt: new Date().toISOString().split("T")[0],
        ticket_state: "ABIERTO",
        ticket_title: titulo,
        ticket_version_id: props.version.version_id,
      };
      const taskData = {
        projectId: props.project.projectId,
        name: titulo,
        description: descripcion,
        state: "NUEVO",
        startingDate: new Date().toISOString(),
        endingDate: new Date(fecha_finalizacion).toISOString(),
        realEndingDate: new Date(fecha_finalizacion).toISOString(),
        priority: criticidadAPrioridad(criticidad),
        estimatedHours: 0,
        previousTaskId: 0,
      };

      console.log(data);
      try {
        await axios.post("https://modulo-soporte.onrender.com/ticket", data);
        await axios.post(
          "https://squad2-2022-2c.herokuapp.com/api/v1/projects/createtask",
          taskData
        );
        setDoneText("Ticket creado exitosamente");
      } catch {
        setDoneText("No se pudo crear el ticket");
      }
      setDone(true);
    }

    setLoading(false);
  };

  const close = () => {
    setDone(false);
    setErrorMessage("");
    props.back();
  };

  React.useEffect(() => {loadPersonal()}, [])

  return (
    <>
      <ModalBody>
        <Text color="red.600">{errorMessage}</Text>
        {done && <Text>{doneText}</Text>}
        {!done ? (
          <FormControl>
            <FormLabel marginTop="5%">Titulo del ticket</FormLabel>
            <Input
              bg="white"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <FormLabel marginTop="5%">Descripción del ticket</FormLabel>
            <Textarea
              bg="white"
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <FormLabel marginTop="5%">Criticidad</FormLabel>
            <RadioGroup onChange={setCriticidad} value={criticidad}>
              <Stack direction="column">
                <Radio bg="white" value="SLA 1">
                  SLA 1
                </Radio>
                <Radio bg="white" value="SLA 2">
                  SLA 2
                </Radio>
                <Radio bg="white" value="SLA 3">
                  SLA 3
                </Radio>
                <Radio bg="white" value="SLA 4">
                  SLA 4
                </Radio>
              </Stack>
            </RadioGroup>
            <FormLabel marginTop="5%">
              Fecha de finalización del ticket
            </FormLabel>
            <Input
              bg="white"
              type="date"
              value={fecha_finalizacion}
              onChange={(e) => setFin(e.target.value)}
            />
            
                <FormLabel marginTop="5%">Elegir Empleado a cargo</FormLabel>
                <Select bg="white" onChange={(e) => setInCharge(e.target.value)}>
                      <option value="">Seleccione un encargado</option>
                      {employees.map(encargado => {
                          
                            return <option value={encargado.legajo}>{encargado.Nombre + " " + encargado.Apellido} (Legajo:{encargado.legajo})</option>  
                          
                      })}
                    </Select>
          </FormControl>
        ) : null}
      </ModalBody>
      <ModalFooter justifyContent="space-between">
        {!done && (
          <Button
            isLoading={loading}
            colorScheme="green"
            onClick={createTicket}
          >
            Crear ticket
          </Button>
        )}
        <Button isLoading={loading} colorScheme="red" onClick={close}>
          {!done ? "Cancelar" : "Volver"}
        </Button>
      </ModalFooter>
    </>
  );
}
