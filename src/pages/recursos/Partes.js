import { Route, Routes } from "react-router-dom";

import CrearParte from "./CrearParte";
import InformacionParte from "./InformacionParte";
import ListadoDePartes from "./ListadoDePartes";

function Partes() {
  return (
    <Routes>
      <Route path=":id/" element={<InformacionParte/>} />
      <Route path=":id/edit" element={<CrearParte />} />
      <Route path="crear/" element={<CrearParte />} />
      <Route index element={<ListadoDePartes />} />
    </Routes>
  );
}

export default Partes;
