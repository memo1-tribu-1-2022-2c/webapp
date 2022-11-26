import { Text } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Text>Login</Text>} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Text>Home</Text>} />
        <Route path="proyectos" element={<Text>Proyectos</Text>} />
        <Route path="tickets" element={<Text>Tickets</Text>} />
        <Route path="partesDeHoras" element={<Text>PartesDeHoras</Text>} />
      </Route>
    </Routes>
  );
}

export default App;
