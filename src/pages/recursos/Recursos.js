import { Flex, Button, Stack } from "@chakra-ui/react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import useNavigateWParams from "../../routes/navigation";
import MenuAuditor from "./MenuAuditor";
import Partes from "./Partes";

function Recursos(props) {
  const navigate = useNavigateWParams();
  const volver = () => {
    navigate(-1);
  };
  if (props.legajo != null) {
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
          <Route index element={<Navigate to="partes" />} />
          <Route forceRefresh={true} path="partes/*" element={<Partes />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route index element={<Navigate to="menu" />} />
      <Route path="menu" element={<MenuAuditor />} />
    </Routes>
  );
}

export default Recursos;
