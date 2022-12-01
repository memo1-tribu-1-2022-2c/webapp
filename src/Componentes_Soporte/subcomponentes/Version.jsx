import { Badge, Button, HStack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import AlertPopUp from "./AlertPopUp";
import ModalModify from "./ModalForModify";

export default function Version(props) {
  const [version, setVersion] = React.useState(props.version);

  const [modLoading, setModLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [popUpTitle, setPopUpTitle] = React.useState("");
  const [popUpBody, setPopUpBody] = React.useState("");

  const modificarEstadoVersion = async (version) => {
    setModLoading(true);
    const change = {
      number: version.number,
      state_change: true,
      version_id: version.version_id.toString(),
    };
    try {
      const response = await (
        await axios.patch("https://modulo-soporte.onrender.com/version", change)
      ).data;
      version.state = response.state;
      setVersion(version);
      setPopUpTitle("Modificacion exitosa");
      setPopUpBody("La version fue modificada");
      //Estado modificado avisar
    } catch (error) {
      //Estado no modificado avisar
      setPopUpTitle("Hubo un problema");
      setPopUpBody("Fallo la modificacion de version");
      console.log(error);
    }
    onOpen();
    setModLoading(false);
  };

  const modify = async (client_id) => {
    const data = {
      client_id: client_id,
      version_id: version.version_id.toString(),
    };
    return (
      await axios.post(
        "https://modulo-soporte.onrender.com/client/products",
        data
      )
    ).data;
  };

  return (
    <>
      <AlertPopUp
        title={popUpTitle}
        body={popUpBody}
        isOpen={isOpen}
        onClose={onClose}
      />
      <HStack justifyContent="space-between">
        <Badge colorScheme="blue" padding={2} variant="outline" borderRadius={7}>
          Id de version: {version.version_id}
        </Badge>
        <Badge>{version.state}</Badge>
        <Button
          isLoading={modLoading}
          onClick={() => {
            modificarEstadoVersion(version);
          }}
          colorScheme={version.state === "Con soporte" ? "red" : "green"}
          size="sm"
        >
          {version.state === "Con soporte" ? "Deprecar" : "Reanudar soporte"}
        </Button>
        <ModalModify
          title={`Asociar cliente a version: ${version.number}`}
          body="Ingresar cliente a asociar con la version"
          buttonText="Asociar cliente"
          placeholder="Id cliente"
          modify={modify}
          onSucces={`Se asocio exitosamente el cliente a la version ${version.version_id}`}
          onFailure={`No se pudo asociar al cliente con la version ${version.version_id}`}
        />
      </HStack>
    </>
  );
}
