import { Route, Routes } from "react-router-dom";
import ListarPartesAuditor from "./ListarPartesAuditor";
import ValidacionDeParte from "./ValidacionParte";

function ValidacionDePartes(props) {
  return (
    <Routes>
      <Route index element={<ListarPartesAuditor />} />
      <Route path=":id" element={<ValidacionDeParte />} />
    </Routes>
  );
}

export default ValidacionDePartes;
