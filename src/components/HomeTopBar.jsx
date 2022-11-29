import { Image } from "@chakra-ui/react";
import "../styles/home.css";

export default function HomeTopBar(props) {
  return (
    <div className="TopDiv">
      <Image src={require("../styles/PSAIcon.jpg")} />
      <p className="UserInfo">Bienvenido Juan Zeo</p>
    </div>
  );
}
