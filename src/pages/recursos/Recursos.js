import { Flex, Button, Stack } from "@chakra-ui/react";
import { Route, Routes, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useNavigateWParams from "../../routes/navigation";
import MenuAuditor from "./MenuAuditor";
import Partes from "./Partes";

const Action = (props) => {
  useEffect(() => props.action());
};

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
          <Route index element={<Action action={() => navigate("partes")} />} />
          <Route forceRefresh={true} path="partes/*" element={<Partes />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route index element={<Action action={() => navigate("partes")} />} />
      <Route path="menu" element={<MenuAuditor />} />
    </Routes>
  );
}

export default Recursos;
