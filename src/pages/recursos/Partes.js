import { Route, Routes } from "react-router-dom";

import CrearParte from "./CrearParte";
import InformacionParte from "./InformacionParte";
import ListadoDePartes from "./ListadoDePartes";

const partes = [
  {
    id: "1",
    tipo: "semanal",
    fechaInicio: "12/11/2022",
    estado: "emitido",
    horas: 30,
  },
  {
    id: "2",
    tipo: "mensual",
    fechaInicio: "1/12/2022",
    estado: "en borrador",
    horas: 20,
  },
];

function Partes(props) {
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
