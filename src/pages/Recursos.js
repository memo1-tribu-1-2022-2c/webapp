import { Route, Routes } from "react-router-dom";
import { NavigateWP } from "../routes/navigation";
import MenuAuditor from "./recursos/MenuAuditor";
import Partes from "./recursos/Partes";
import { ContextoRecursosProvider } from "./recursos/Contexto";
import React from "react";
import ABMConceptos from "./recursos/ABMConceptos";
import ReportesEmpleados from "./recursos/ReportesEmpleados";
import ReporteIndividual from "./recursos/ReporteIndividual";

function Recursos(props) {
  React.useEffect(() => {
    props.setNavigation([]);
    props.setTitle("Recursos");
  }, [props]);

  return (
    <ContextoRecursosProvider>
      <Routes>
        {props.legajo != null ? (
          // EMPLEADO
          <>
            <Route index element={<NavigateWP to="partes" replace />} />
            <Route forceRefresh path="partes/*" element={<Partes />} />
          </>
        ) : (
          // AUDITOR
          <>
            <Route index element={<NavigateWP to="menu" replace />} />
            <Route path="menu" element={<MenuAuditor />} />
            <Route
              path="abm-conceptos"
              element={<ABMConceptos setTitle={props.setTitle} />}
            />
            <Route
              path="reportes-empleados"
              element={<ReportesEmpleados setTitle={props.setTitle} />}
            />
            <Route
              path="reporte-individual"
              element={<ReporteIndividual setTitle={props.setTitle} />}
            />
          </>
        )}
      </Routes>
    </ContextoRecursosProvider>
  );
}

export default Recursos;
