import "../styles/home.css"
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

export default function HomeCard(props){

    return (
        <Card className="ContainerCard">
            <CardBody className="CardBody">
                {props.text}
            </CardBody>
        </Card>
    )

}