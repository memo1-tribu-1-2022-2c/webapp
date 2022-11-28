import { Flex, Button, Stack } from "@chakra-ui/react";
import { Route, Routes, Outlet } from "react-router-dom";
import { useNavigateWParams, NavigateWP } from "../routes/navigation";
import MenuAuditor from "./recursos/MenuAuditor";
import Partes from "./recursos/Partes";

function Recursos(props) {
  const navigate = useNavigateWParams();
  const volver = () => {
    navigate("../");
  };
  return (
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
          </>
        )}
      </Route>
    </Routes>
  );
}

export default Recursos;
