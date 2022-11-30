import "./App.css";
import { Text } from "@chakra-ui/react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import Layout, { navData } from "./Layout";
import Login from "./pages/Login";
import Home from "./views/home";
import Recursos from "./pages/Recursos";
import Routing from "./routes/config";
import Proyectos from "./pages/proyectMain";
import Tickets from "./Componentes_Soporte/Tickets";
import Clientes from "./Componentes_Soporte/Clientes";
import Productos from "./Componentes_Soporte/Productos";
import React from "react";

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [actualNavData, setNavData] = React.useState(navData)
  const [title, setTitle] = React.useState("Home")
  // null == no hay usuario
  const legajo = searchParams.has("legajo")
    ? parseInt(searchParams.get("legajo"))
    : null;
  const esAuditor = searchParams.has("auditor");
  const estaLoggeado = legajo !== null || esAuditor;

  const login = (legajo) => {
    legajo = parseInt(legajo);
    if (legajo !== "") {
      navigate({
        pathname: Routing.Home,
        search: createSearchParams({ legajo: legajo }).toString(),
      });
    }
  };
  const auditor = () => {
    navigate({
      pathname: Routing.Home,
      search: createSearchParams({ auditor: 1 }).toString(),
    });
  };
  const logout = () => {
    navigate({ pathname: Routing.Login });
  };

  let nombreUsuario;
  if (estaLoggeado) {
    nombreUsuario = esAuditor ? "Auditor" : "Empleado";
  }

  return (
    <Routes>
      <Route
        path={Routing.Login}
        element={<Login login={login} auditor={auditor} />}
      />
      <Route
        path={Routing.Home}
        element={<Layout navData={actualNavData} title={title} usuario={nombreUsuario} logout={logout} />}
      >
        <Route
          index
          element={estaLoggeado ? <Home /> : <Navigate to={Routing.Login} />}
        />
        <Route path={Routing.Proyectos + "/*"} element={<Proyectos setNavigation={setNavData} setTitle={setTitle}/>} />
        <Route path={Routing.Tickets + "/*"} element={<Tickets setNavigation={setNavData} setTitle={setTitle}/>} />
        <Route path={Routing.Clientes + "/*"} element={<Clientes setNavigation={setNavData} setTitle={setTitle}/>} />
        <Route path={Routing.Productos + "/*"} element={<Productos setNavigation={setNavData} setTitle={setTitle}/>} />
        <Route
          path={Routing.Recursos + "/*"}
          element={<Recursos usuario={nombreUsuario} legajo={legajo} setNavigation={setNavData} setTitle={setTitle}/>}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
