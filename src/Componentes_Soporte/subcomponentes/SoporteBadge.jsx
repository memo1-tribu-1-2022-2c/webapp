import { Button, Tag, Td, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import CreateSupportProyect from "./CreateSupportProyect";
import TicketsModal from "./TicketsModal";

export default function SoporteBadge(props){

    const [loading, setLoading] = React.useState(true);
    const [hasSupport, setHasSupport] = React.useState(false);
    const [supportProyect, setSupportProyect] = React.useState([]);
    
    const {isOpen, onOpen, onClose} = useDisclosure();

    const find_support_status = async () => {
        try{
            const response = await (await axios.get(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/client/${props.client_id}`)).data
            const has_support = response.filter(value => {
                return value.versionId == props.version.version_id && value.projectType == "SOPORTE"
            });
            setLoading(false)
            setHasSupport(has_support.length > 0)
            if (has_support.length > 0){
                setSupportProyect(has_support[0])
            }
        }catch{
            setLoading(false);
            setHasSupport(false)
        }
    }

    React.useEffect(() => {find_support_status()}, [])

    return (<>
        {loading ? 
            <><Td><Tag colorScheme="gray">Cargando</Tag></Td><Td><Tag colorScheme="gray">Cargando</Tag></Td></>
            :
            <>
            <Td><Tag colorScheme={hasSupport ? "green" : "red"}>{hasSupport ? "Con soporte" : "Sin soporte"}</Tag></Td>
            <Td><Button onClick={onOpen} size="sm" colorScheme={hasSupport ? "green" : "blue"}>{hasSupport ? "Tickets": "Alta soporte"}</Button></Td>
            </>}
        {hasSupport ? 
                        <TicketsModal version={props.version} client_id={props.client_id} proyect={supportProyect}/> 
                    : 
                        <CreateSupportProyect isOpen={isOpen} 
                                                onClose={onClose}
                                                razon_social={props.razon_social} 
                                                product_name={props.product_name}
                                                version={props.version} 
                                                client_id={props.client_id}
                                                support={setHasSupport}/>

        }
        </>)
}