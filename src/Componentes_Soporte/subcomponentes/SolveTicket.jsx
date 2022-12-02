import { Button, FormControl, FormLabel, HStack, Input, ModalBody, ModalFooter, Radio, RadioGroup, Stack, Text, Textarea, VStack } from "@chakra-ui/react"
import axios from "axios";
import React from "react";

export default function SolveTicket(props){
    const [Detail, setDetail] = React.useState('');

    const [errorMessage, setErrorMessage] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [done, setDone] = React.useState(false);
    const [doneText, setDoneText] = React.useState('');

    const checks = () => {
        let changed = false;
        setErrorMessage('');
        if (Detail === ""){
            changed = true;
            setErrorMessage("El detalle no puede estar vacio");
        }
        return changed
    }

    const solveTicket = async () => {
        setLoading(true);
        if(!checks()){
            const data = {
                state: "CERRADO",
                end_detail: Detail,
            }
           
            console.log(data);
            try{
                await axios.patch(`https://modulo-soporte.onrender.com/ticket/${props.ticket_id}`, data);
                
                setDoneText("Ticket resuelto exitosamente");
            }catch{
                setDoneText("No se pudo cerrar el ticket");
            }
            setDone(true);
        }

        setLoading(false);
    }

    const close = () => {
        setDone(false);
        setErrorMessage('');
        props.back();
    }

    return (
    <>
    <ModalBody>
    <Text color="red.600">{errorMessage}</Text>
    {done && <Text>{doneText}</Text>}
    {!done ? <FormControl>
      <FormLabel marginTop="5%">Detalle de resolucion</FormLabel>
      <Input
        bg="white"
        type="text"
        value={Detail}
        onChange={(e) => setDetail(e.target.value)}
      />
    </FormControl> : null}
    </ModalBody>
    <ModalFooter justifyContent="space-between">
        {!done && <Button isLoading={loading} colorScheme="green" onClick={solveTicket}>Enviar</Button>}
        <Button isLoading={loading} colorScheme="red" onClick={close}>{!done ? "Cancelar" : "Volver"}</Button>
    </ModalFooter>
    </>
    )
}