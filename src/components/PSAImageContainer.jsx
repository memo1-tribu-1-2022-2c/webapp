import { Image } from "@chakra-ui/react";
import "../styles/home.css";

export default function PSAImageContainer(props) {
  return (
    <div className="TopDiv">
      <Image src={require("../styles/PSAIcon.jpg")} />
    </div>
  );
}
