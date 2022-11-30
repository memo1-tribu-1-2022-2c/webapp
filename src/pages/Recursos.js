import { Flex, Button, Stack } from "@chakra-ui/react";
import { Route, Routes, Outlet } from "react-router-dom";
import { useNavigateWParams, NavigateWP } from "../routes/navigation";
import MenuAuditor from "./recursos/MenuAuditor";
import Partes from "./recursos/Partes";
import { ContextoRecursosProvider } from "./recursos/Contexto";
import React from "react";
import ABMConceptos from "./recursos/ABMConceptos";
import ReportesEmpleados from "./recursos/ReportesEmpleados";
import ReporteIndividual from "./recursos/ReporteIndividual";

function Recursos(props) {
  
  React.useEffect(() => {
    props.setNavigation([ 
    ]);
    props.setTitle("Recursos")
  }, [])

  const navigate = useNavigateWParams();
  const volver = () => {
    navigate("../");
  };
  return (
    <ContextoRecursosProvider>
    <Routes>
      <Route
        element={
          <>
            <Stack m={4}>
              <Flex>
                <Button onClick={volver}>Volver</Button>
              </Flex>
              <Outlet />
            </Stack>
          </>
        }
      >
        {props.legajo != null ? (
          // EMPLEADO
          <>
            <Route index element={<NavigateWP to="partes" />} />
            <Route forceRefresh={true} path="partes/*" element={<Partes />} />
          </>
        ) : (
          // AUDITOR
          <>
            <Route index element={<NavigateWP to="menu" />} />
            <Route path="menu" element={<MenuAuditor />} />
            <Route path="abm-conceptos" element={<ABMConceptos setTitle={props.setTitle} />} />
            <Route path="reportes-empleados" element={<ReportesEmpleados setTitle={props.setTitle} />} />
            <Route path="reporte-individual" element={<ReporteIndividual setTitle={props.setTitle} />} />
          </>
        )}
      </Route>
    </Routes>
    </ContextoRecursosProvider>
  );
}

export default Recursos;
