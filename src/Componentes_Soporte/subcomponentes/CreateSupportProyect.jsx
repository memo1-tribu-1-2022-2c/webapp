import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function CreateSupportProyect(props) {
  const [proyectTitle, setTitle] = React.useState("");
  const [proyectDescription, setDescription] = React.useState("");
  const [proyectEndDate, setEndDate] = React.useState("");

  const [titleLabel, setTitleLabel] = React.useState("Nombre del proyecto");
  const [descriptionLabel, setDescriptionLabel] = React.useState(
    "Descripcion del proyecto"
  );
  const [dateLabel, setDateLabel] = React.useState(
    "Fecha de finalizacion del soporte"
  );

  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [doneTitle, setDoneTitle] = React.useState("");
  const [doneBody, setDoneBody] = React.useState("");
  const [failed, setFailed] = React.useState(false);

  const checkData = () => {
    let changed = false;

    if (proyectTitle === "") {
      setTitleLabel("El nombre no puede estar vacio");
      setTitleError(true);
      changed = true;
    }

    if (proyectDescription === "") {
      setDescriptionLabel("La descripcion no puede estar vacia");
      setDescriptionError(true);
      changed = true;
    }
    if (new Date(proyectEndDate) < new Date()) {
      setDateLabel("El proyecto no puede finalizar antes de hoy");
      setDateError(true);
      changed = true;
    }

    return changed;
  };

  const handleClose = () => {
    if (done && !failed) {
      props.support();
    }

    setTitleLabel("Nombre del proyecto");
    setTitleError(false);
    setDescriptionLabel("Descripcion del proyecto");
    setDescriptionError(false);
    setDateLabel("Fecha de finalizacion del soporte");
    setDateError(false);
    setDone(false);
    props.onClose();
  };

  const createProyect = async () => {
    setLoading(true);
    if (!checkData()) {
      try {
        const now = new Date();
        const data = {
          name: proyectTitle,
          description: proyectDescription,
          startingDate: now.toISOString(),
          endingDate: new Date(proyectEndDate).toISOString(),
          projectType: "SOPORTE",
          clientId: parseInt(props.client_id),
          versionId: props.version.version_id,
        };
        const response = await (
          await axios.post(
            "https://squad2-2022-2c.herokuapp.com/api/v1/projects",
            data
          )
        ).data;
        setDoneTitle(`Alta de cliente para ${props.razon_social} exitosa`);
        setDoneBody(`Id del proyecto de soporte: ${response.projectId}`);
        setDone(true);
      } catch {
        setDoneTitle(`Ocurrio un problema`);
        setDoneBody(
          `El proyecto de soporte para ${props.razon_social} no pudo ser dado de alta`
        );
        setDone(true);
        setFailed(true);
      }
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg="gray.300">
        <ModalHeader>
          {!done ? `Dar de alta soporte para ${props.razon_social}` : doneTitle}
        </ModalHeader>
        <ModalBody>
          <Text marginBottom="5%" fontWeight="bold">
            {!done
              ? `Crear un proyecto de soporte para la version ${props.version.number} del producto ${props.product_name}`
              : doneBody}
          </Text>
          {!done ? (
            <FormControl>
              <FormLabel marginTop="5%" color={titleError ? "red" : null}>
                {titleLabel}
              </FormLabel>
              <Input
                size="md"
                bg="white"
                type="text"
                value={proyectTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormLabel marginTop="5%" color={descriptionError ? "red" : null}>
                {descriptionLabel}
              </FormLabel>
              <Textarea
                bg="white"
                type="text"
                value={proyectDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormLabel marginTop="5%" color={dateError ? "red" : null}>
                {dateLabel}
              </FormLabel>
              <Input
                bg="white"
                type="date"
                value={proyectEndDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>
          ) : null}
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          {!done ? (
            <Button
              isLoading={loading}
              onClick={createProyect}
              colorScheme="green"
            >
              Crear proyecto
            </Button>
          ) : null}
          <Button
            isLoading={loading}
            onClick={handleClose}
            colorScheme={!done ? "red" : "gray"}
          >
            {!done ? "Cancelar" : "Cerrar"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
