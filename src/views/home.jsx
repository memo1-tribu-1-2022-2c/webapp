import React from "react";

import "../styles/home.css";
import HomeCard from "../components/HomeCard";
import HomeTopBar from "../components/HomeTopBar";
import Routing from "../routes/config";
import useNavigateWParams from "../routes/navigation";

export default function Home(props) {
  const navigate = useNavigateWParams();

  const toRecursos = () => {
    navigate(Routing.Recursos);
  };

  const toSoporte = () => {
    navigate(Routing.Soporte);
  };

  const toProyectos = () => {
    navigate(Routing.Proyectos);
  };

  return (
    <React.Fragment>
      <HomeTopBar />
      <div className="HomeDiv">
        <HomeCard text="Soporte" onClick={toSoporte} />
        <HomeCard text="Proyectos" onClick={toProyectos} />
      </div>
      <div className="HomeDiv">
        <HomeCard text="Recursos" onClick={toRecursos} />
      </div>
    </React.Fragment>
  );
}
