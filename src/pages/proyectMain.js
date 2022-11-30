import { Routes, Route } from "react-router-dom";
import CreateProyect from "./proyectos/createProyect";
import EditProyect from "./proyectos/editProyect";
import Proyect from "./proyectos/proyect";
import ProyectsList from "./proyectos/proyectsList";
import CreateTask from "./proyectos/createTask";
import Task from "./proyectos/task";
import EditTask from "./proyectos/editTask";
import { NavigateWP } from "../routes/navigation";
import React from "react";

function Proyectos(props) {

  React.useEffect(() => {
    props.setNavigation([ 
    ]);
    props.setTitle("Proyectos")
  }, [props])
  return (
    <Routes>
      <Route index element={<NavigateWP to="proyectsList" />} />
      <Route path="proyectsList" element={<ProyectsList />} />
      <Route path="proyectsList/createProyect" element={<CreateProyect />} />
      <Route path="proyectsList/:proyectId" element={<Proyect />} />
      <Route
        path="proyectsList/:proyectId/editProyect"
        element={<EditProyect />}
      />
      <Route
        path="proyectsList/:proyectId/createTask"
        element={<CreateTask />}
      />
      <Route path="proyectsList/:proyectId/:taskId" element={<Task />} />
      <Route
        path="proyectsList/:proyectId/:taskId/editTask"
        element={<EditTask />}
      />
    </Routes>
  );
}

export default Proyectos;
