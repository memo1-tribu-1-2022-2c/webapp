import { Flex, Button, Stack } from "@chakra-ui/react";
import { Route, Routes, Outlet } from "react-router-dom";
import { useNavigateWParams, Action } from "../../routes/navigation";
import MenuAuditor from "./MenuAuditor";
import Partes from "./Partes";

function Recursos(props) {
  const navigate = useNavigateWParams();
  const volver = () => {
    navigate(-1);
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
            <Route
              index
              element={<Action action={() => navigate("partes")} />}
            />
            <Route forceRefresh={true} path="partes/*" element={<Partes />} />
          </>
        ) : (
          // AUDITOR
          <>
            <Routes>
              <Route
                index
                element={<Action action={() => navigate("partes")} />}
              />
              <Route path="menu" element={<MenuAuditor />} />
            </Routes>
          </>
        )}
      </Route>
    </Routes>
  );
}

export default Recursos;
