import React from "react";

import "../styles/home.css"
import HomeCard from "../components/HomeCard";
import HomeTopBar from "../components/HomeTopBar";
import { useNavigate, useNavigation } from "react-router-dom";
import Routing from "../routes/config";

export default function Home(props){

    const navigation = useNavigate();

    const toRecursos = () => {
        navigation(Routing.Recursos);
    };

    const toSoporte = () => {
        navigation(Routing.Soporte);
    }

    const toProyectos = () => {
        navigation(Routing.Proyectos);
    }

    return <React.Fragment>
            <HomeTopBar />
            <div className="HomeDiv">
                <HomeCard text="Soporte" onClick={toSoporte}/>
                <HomeCard text="Proyectos" onClick={toProyectos}/>
            </div>
            <div className="HomeDiv">
                <HomeCard text="Recursos" onClick={toRecursos}/>
            </div>
            </React.Fragment>;
}