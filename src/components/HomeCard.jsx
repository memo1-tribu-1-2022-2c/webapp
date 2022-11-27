import "../styles/home.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";

export default function HomeCard(props) {
  return (
    <Button
      colorScheme={"blue"}
      className="ContainerButton"
      onClick={props.onClick}
    >
      <p className="HomeButtonText">{props.text}</p>
    </Button>
  );
}
