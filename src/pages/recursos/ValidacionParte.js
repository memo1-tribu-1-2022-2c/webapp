import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Stack,
  Button,
  ButtonGroup,
  useBoolean,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNavigateWParams from "../../routes/navigation";
import {
  tryGetParte,
  tryGetRegistrosFromParte,
  tryUpdateParte,
} from "./Backend";

const RegistroHoras = (props) => {
  return (
    <Tr>
      <Th>{props.registro.fecha}</Th>
      <Th>{`${props.registro.tipo}: ${props.registro.id}`}</Th>
      <Th isNumeric>{props.registro.horas}</Th>
    </Tr>
  );
};

function ValidacionDeParte() {
  const { id } = useParams();

  const [registros, setRegistros] = useState([]);
  const [parte, setParte] = useState({});

  const navigate = useNavigateWParams();

  const [isLoadingParte, loadingParte] = useBoolean(false);
  const [isLoadingAprobar, loadingAprobar] = useBoolean(false);
  const [isLoadingRechazar, loadingRechazar] = useBoolean(false);

  useEffect(() => {
    const getRegisters = async () => {
      loadingParte.on();
      try {
        let response = await tryGetParte(id);

        setParte(response.data);
      } catch (e) {
        console.log(e);
      }
      try {
        let response = await tryGetRegistrosFromParte(id);

        setRegistros(response.data);
      } catch (e) {
        console.log(e);
      }
      loadingParte.off();
    };
    getRegisters();
  }, [id]);

  const aprobar = () => {
    const aprove = async () => {
      loadingAprobar.on();
      let actualizado = {
        ...parte,
      };
      actualizado.status = "APROBADO";
      console.log(actualizado);
      try {
        await tryUpdateParte(actualizado);
        navigate("../");
      } catch (error) {
        console.log(error);
      }
      loadingAprobar.off();
    };
    aprove();
  };

  const rechazar = () => {
    const reject = async () => {
      loadingRechazar.on();
      let actualizado = {
        ...parte,
      };
      actualizado.status = "RECHAZADO";
      console.log(actualizado);
      try {
        await tryUpdateParte(actualizado);
        navigate("../");
      } catch (error) {
        console.log(error);
      }
      loadingRechazar.off();
    };
    reject();
  };

  return (
    <TableContainer>
      <Stack alignContent="center" mb={8}>
        <Text alignSelf="center" fontSize={32}>
          Horas registradas en el parte {parte.type ?? ""}
        </Text>
        <Text alignSelf="center" fontSize={20} mb={6}>
          ( {parte.startTime ?? ""} - {parte.endTime ?? ""} )
        </Text>
        <Stack alignSelf="center" direction="row" mb={8} ml={12}>
          <ButtonGroup spacing="6">
            <Button
              colorScheme="green"
              leftIcon={<CheckIcon />}
              isLoading={isLoadingAprobar}
              isDisabled={isLoadingParte || isLoadingRechazar}
              onClick={aprobar}
            >
              Aprobar
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<NotAllowedIcon />}
              isLoading={isLoadingRechazar}
              isDisabled={isLoadingParte || isLoadingAprobar}
              onClick={rechazar}
            >
              Rechazar
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Descripción</Th>
            <Th isNumeric>Horas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {registros.map((registro) => {
            const key = registro.type + registro.id;
            return <RegistroHoras key={key} registro={registro} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ValidacionDeParte;
