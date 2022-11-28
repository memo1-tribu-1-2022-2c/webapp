import React from "react";
import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import ProyectsList from "./pages/proyectsList";
import CreateProyect from "./pages/createProyect";
import Proyect from "./pages/proyect";
import CreateTask from "./pages/createTask";
import EditProyect from "./pages/editProyect";
import Task from "./pages/task";
import EditTask from "./pages/editTask";

function _layout() {
  return (
    <>
      <Flex as="main" w="full" h="100vh" direction="column">
        <Routes>
          <Route path="/proyectsList" element={<ProyectsList />} />
          <Route
            path="/proyectsList/createProyect"
            element={<CreateProyect />}
          />
          <Route path="/proyectsList/:proyectId" element={<Proyect />} />
          <Route
            path="/proyectsList/:proyectId/editProyect"
            element={<EditProyect />}
          />
          <Route
            path="/proyectsList/:proyectId/createTask"
            element={<CreateTask />}
          />
          <Route path="/proyectsList/:proyectId/:taskId" element={<Task />} />
          <Route
            path="/proyectsList/:proyectId/:taskId/editTask"
            element={<EditTask />}
          />
        </Routes>
      </Flex>
    </>
  );
}

export default _layout;
