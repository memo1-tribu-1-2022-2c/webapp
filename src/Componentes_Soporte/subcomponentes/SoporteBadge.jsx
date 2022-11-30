import { Tag } from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function SoporteBadge(props){

    const [loading, setLoading] = React.useState(true);
    const [hasSupport, setHasSupport] = React.useState(false);
    

    const find_support_status = async () => {
        try{
            const response = await (await axios.get(`https://squad2-2022-2c.herokuapp.com/api/v1/projects/client/${props.client_id}`)).data
            const has_support = response.filter(value => {
                return value.versionId == props.version && value.projectType == "SOPORTE"
            });
            setLoading(false)
            setHasSupport(has_support.length > 0)
        }catch{
            setLoading(false);
            setHasSupport(false)
        }
    }

    React.useEffect(() => {find_support_status()}, [])

    return (<>
        {loading ? 
            <Tag colorScheme="gray">Cargando</Tag>
            :
            <Tag colorScheme={hasSupport ? "green" : "red"}>{hasSupport ? "Con soporte" : "Sin soporte"}</Tag>}
        </>)
}