import React from "react";
import PSAImageContainer from "../components/PSAImageContainer";
import { navData } from "../Layout";
import "../styles/home.css";

export default function Home(props) {
  React.useEffect(() => {
    props.setNavigation(navData);
    props.setTitle("Home");
  }, [props]);
  return (
    <React.Fragment>
      <PSAImageContainer />
    </React.Fragment>
  );
}
