import { Route, Routes } from "react-router-dom";

import CrearParte from "./CrearParte";
import InformacionParte from "./InformacionParte";
import ListadoDePartes from "./ListadoDePartes";

function Partes({legajo}) {
  return (
    <Routes>
      <Route path=":id/" element={<InformacionParte legajo={legajo} />} />
      <Route path=":id/edit" element={<CrearParte legajo={legajo} />} />
      <Route path="crear/" element={<CrearParte legajo={legajo} />} />
      <Route index element={<ListadoDePartes legajo={legajo} />} />
    </Routes>
  );
}

export default Partes;
