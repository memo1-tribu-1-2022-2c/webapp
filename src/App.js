import './App.css';
import { Text } from "@chakra-ui/react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Home from './views/home';
import Routing from './routes/config';

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // null == no hay usuario
  const usuarioActual = searchParams.has("legajo")
    ? parseInt(searchParams.get("legajo"))
    : null;
  const esAuditor = searchParams.has("auditor");
  const estaLoggeado = usuarioActual !== null || esAuditor;

  const login = (legajo) => {
    legajo = parseInt(legajo);
    if (legajo !== "") {
      navigate({ pathname: "/", search: `?legajo=${legajo}` });
    }
  };
  const auditor = () => {
    navigate({ pathname: "/", search: "?auditor=1" });
  };
  const logout = () => {
    navigate({ pathname: "/login" });
  };

  let nombreUsuario;
  if (estaLoggeado) {
    nombreUsuario = esAuditor ? "Auditor" : "Empleado";
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login login={login} auditor={auditor} />}
      />
      <Route
        path="/"
        element={<Layout usuario={nombreUsuario} logout={logout} />}
      >
        {estaLoggeado ? null : (
          <Route index element={<Navigate to="/login" />} />
        )}
        <Route index element={<Home />} />
        <Route path={Routing.Proyectos} element={<Text>Proyectos</Text>} />
        <Route path={Routing.Soporte} element={<Text>Soporte</Text>} />
        <Route path={Routing.Recursos} element={<Text>Recursos</Text>} />
      </Route>
    </Routes>
  );
}

export default App;
