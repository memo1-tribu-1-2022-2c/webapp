import {
  Routes,
  Route
} from 'react-router-dom'
import ProyectsList from './proyectsList'
import CreateProyect from './createProyect'
import Proyect from './proyect'
import CreateTask from './createTask'
import EditProyect from './editProyect'
import Task from './task'
import EditTask from './editTask'
import { NavigateWP } from "../routes/navigation";
import React from "react";

function Proyectos(props) {
  React.useEffect(() => {
    props.setNavigation([]);
    props.setTitle("Proyectos");
  }, [props]);
  return (
    <Routes>

      <Route index element={<NavigateWP to="proyectsList" />} />
      <Route path='proyectsList' element={<ProyectsList/>}/>
      <Route path='proyectsList/createProyect' element={<CreateProyect/>}/>
      <Route path='proyectsList/:proyectId' element={<Proyect/>}/>
      <Route path='proyectsList/:proyectId/editProyect' element={<EditProyect/>}/>
      <Route path='proyectsList/:proyectId/createTask' element={<CreateTask/>}/>
      <Route path='proyectsList/:proyectId/:taskId' element={<Task/>}/>
      <Route path='proyectsList/:proyectId/:taskId/editTask' element={<EditTask/>}/>
    </Routes>
  );
}

export default Proyectos;
