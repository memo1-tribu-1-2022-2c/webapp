import React from "react";

import "../styles/home.css"
import HomeCard from "../components/HomeCard";
import HomeTopBar from "../components/HomeTopBar";

export default function Home(props){

    return <React.Fragment>
            <HomeTopBar />
            <div className="HomeDiv">
                <HomeCard text="Soporte"/>
                <HomeCard text="Proyectos"/>
            </div>
            <div className="HomeDiv">
                <HomeCard text="Recursos"/>
            </div>
            </React.Fragment>;
}