import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import React from "react";

export default function NewProduct(props){
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [done, setDone] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    return  <>
                <Button onClick={onOpen} colorScheme="gray" width="15%">Agregar nuevo producto</Button>

                <Modal isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Nuevo Producto</ModalHeader>
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Nombre del producto</FormLabel>
                                <Input type="text" /> 
                                <FormLabel marginTop="5%">Nombre de la version</FormLabel>
                                <Input type="text" />
                                <FormHelperText marginBottom="5%">El producto debe tener al menos una version</FormHelperText>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter justifyContent="space-between">
                            <Button colorScheme="green" onClick={onClose}>Crear Producto</Button> 
                            <Button colorScheme="red" onClick={onClose}>Cancelar</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
}