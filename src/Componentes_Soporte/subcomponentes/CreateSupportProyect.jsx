import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
import React from "react";


export default function CreateSupportProyect(props){

    const [proyectTitle, setTitle] = React.useState('');
    const [proyectDescription, setDescription] = React.useState('');
    const [proyectEndDate, setEndDate] = React.useState(''); 


    const [titleLabel, setTitleLabel] = React.useState("Nombre del proyecto");
    const [descriptionLabel, setDescriptionLabel] = React.useState("Descripcion del proyecto");
    const [dateLabel, setDateLabel] = React.useState("Fecha de finalizacion del soporte");

    const [titleError, setTitleError] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState(false);
    const [dateError, setDateError] = React.useState(false);

    const checkData = () => {
        let changed = false;

        if(proyectTitle === ''){
            changed = true;
        }

        if (proyectDescription == ""){
            changed = true;
        }

        if (proyectEndDate < new Date()){
            changed = true;
        }

        return changed
    }

    return <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent bg="gray.300">
                    <ModalHeader>Dar de alta soporte para {props.razon_social}</ModalHeader>
                    <ModalBody>
                        <Text marginBottom="5%" fontWeight="bold">
                        Crear un proyecto de soporte para la version {props.version.number} del producto {props.product_name}
                        </Text>
                        <FormControl>
                            <FormLabel marginTop="5%" color={titleError ? "red" : null}>{titleLabel}</FormLabel>
                            <Input size="md" bg="white" type="text" 
                                value={proyectTitle} onChange={e => setTitle(e.target.value)}
                            />
                            <FormLabel marginTop="5%" color={descriptionError ? "red" : null}>{descriptionLabel}</FormLabel>
                            <Textarea bg="white" type="text" 
                                value={proyectDescription} onChange={e => setDescription(e.target.value)}/>
                            <FormLabel marginTop="5%" color={dateError ? "red" : null}>{dateLabel}</FormLabel>
                            <Input bg="white" type="date" 
                                value={proyectEndDate} onChange={e => setEndDate(e.target.value)}/>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="space-between">
                        <Button colorScheme="green">Crear proyecto</Button>
                        <Button onClick={props.onClose} colorScheme="red" >Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
    </Modal>
}