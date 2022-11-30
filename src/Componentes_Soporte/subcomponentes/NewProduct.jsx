import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import axios from "axios";
import React from "react";

export default function NewProduct(props){
    const {isOpen, onOpen, onClose} = useDisclosure();

    const [done, setDone] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [versionName, setVersionName] = React.useState('');
    const [productName, setProductName] = React.useState('');

    const [errorVersion, setErrorVersion] = React.useState(false);
    const [errorTextVersion, setErrorTextVersion] = React.useState('')


    const [errorProduct, setErrorProduct] = React.useState(false);
    const [errorTextProduct, setErrorTextProduct] = React.useState('')

    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState('')


    const onChangeVersion = e => setVersionName(e.target.value);
    const onChangeProduct = e => setProductName(e.target.value);
    
    const open = () => {
        setError(false);
        setErrorProduct(false);
        setErrorTextVersion(false);
        setProductName('');
        setVersionName('');
        setDone(false);
        setErrorText("");
        setErrorTextProduct("");
        setErrorTextVersion("");
        setErrorProduct(false);
        setErrorVersion(false);
        onOpen();
    }

    const checkNames = () => {
        let changed = false;
        if (versionName === ''){
            changed = true;
            setErrorTextVersion("El nombre de la version no puede estar vacio");
            setErrorVersion(true);
            
        } 

        if (productName === ''){
            changed = true;
            setErrorTextProduct("El producto debe tener un nombre");
            setErrorProduct(true);
        }

        return changed;
    }  

    const createPoduct = async () => {
        setLoading(true);
        setError(false);
        const check_result = checkNames();

        if (!check_result) {
            try{
                const data ={
                    product: productName,

                    versions: [
                        {
                            number: versionName
                        }
                    ]
                };
                const response = await (await axios.post("https://modulo-soporte.onrender.com/product", data)).data
                props.loadNewProduct(response);
                setErrorText(`Producto creado exitosamente con id: ${response.product_id}`);
                setDone(true);
            }catch{
                setError(true);
                setErrorText("Fallo al crear el producto");
            }   
        }
        
        setLoading(false)

    }

    return  <>
                <Button onClick={open} colorScheme="gray" width="15%">Agregar nuevo producto</Button>

                <Modal isOpen={isOpen}>
                    <ModalOverlay />
                    <ModalContent bg="gray.300">
                        <ModalHeader>Nuevo Producto</ModalHeader>
                        <ModalBody>
                        <Text marginTop="2.5%"  marginBottom="2.5%" fontSize="18px" color={error ? "red.600" : 'blackAlpha.900'}>{errorText}</Text>
                            {!done ? <FormControl>
                                <FormLabel color={errorProduct ? "red.600" : "blackAlpha.900"}>{errorProduct ? errorTextProduct : "Nombre del producto"}</FormLabel>
                                <Input bg="white" type="text" value={productName} onChange={onChangeProduct}/> 
                                <FormLabel marginTop="5%" color={errorVersion ? "red.600" : "blackAlpha.900"}>{errorVersion ? errorTextVersion : "Nombre de la version"}</FormLabel>
                                <Input bg="white" type="text" value={versionName} onChange={onChangeVersion}/>
                                <FormHelperText marginBottom="5%">El producto debe tener al menos una version</FormHelperText>
                            </FormControl>:
                            null}
                        </ModalBody>
                        <ModalFooter justifyContent="space-between">
                            {done ? null : <Button isLoading={loading} colorScheme="green" onClick={createPoduct}>Crear Producto</Button>} 
                            <Button isLoading={loading} colorScheme={done ? "gray": "red"} onClick={onClose}>{done ? "Cerrar" : "Cancelar"}</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
}