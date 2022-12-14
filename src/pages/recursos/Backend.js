import axios from "axios";

export const RECURSOS_BACKEND =
  "https://squad320222c-production.up.railway.app/api/v1";

export const CONCEPT_EP = RECURSOS_BACKEND + "/concepts";

export const RECURSOS_EXT_EP = RECURSOS_BACKEND + "/resources";

export const HOUR_DETAIL_EP = RECURSOS_BACKEND + "/hourDetails";
export const TIME_REGISTER_EP = RECURSOS_BACKEND + "/timeRegisters";

export const PROYECTOS_BACKEND = "https://squad2-2022-2c.herokuapp.com/api/v1";
export const PROJECTS_ALL_EP = PROYECTOS_BACKEND + "/projects/all";

export function getErrorMessage(error) {
  if (error.code === "ERR_NETWORK") {
    return "No pudo comunicarse con el servidor";
  }
  return error.response.data.apierror.message;
}

export function tryCreateConcept(nombre, descripcion, esRemunerable) {
  const data = {
    name: nombre,
    description: descripcion,
    remunerable: esRemunerable,
    status: "AVAILABLE",
  };
  return axios.post(CONCEPT_EP, data);
}

export function tryGetConcepts() {
  return axios.get(CONCEPT_EP);
}

export function tryDeleteConcept(id) {
  return axios.delete(CONCEPT_EP + "/" + id);
}

export function tryUpdateConcept(
  id,
  nombre,
  descripcion,
  esRemunerable,
  estado
) {
  const data = {
    name: nombre,
    description: descripcion,
    remunerable: esRemunerable,
    status: estado,
  };
  return axios.put(CONCEPT_EP + "/" + id, data);
}

export function tryGetRecursos() {
  return axios.get(RECURSOS_EXT_EP);
}

export function tryGetRecurso(legajo) {
  return axios.get(RECURSOS_EXT_EP + "/" + legajo);
}

export function tryGetProyectos() {
  return axios.get(PROJECTS_ALL_EP);
}

export function tryGetParte(id) {
  return axios.get(HOUR_DETAIL_EP + "/" + id);
}

export function tryCreateParte(parte) {
  return axios.post(HOUR_DETAIL_EP, parte);
}

export function tryUpdateParte(parte) {
  return axios.put(HOUR_DETAIL_EP + "/" + parte.id, parte);
}

export function tryGetAllPartes() {
  return axios.get(HOUR_DETAIL_EP);
}

export function tryGetAllRegistros() {
  return axios.get(TIME_REGISTER_EP);
}

export function tryGetRegistrosFromParte(id) {
  return axios.get(HOUR_DETAIL_EP + "/" + id + "/timeRegisters");
}

export function tryCreateRegistro(registro) {
  return axios.post(TIME_REGISTER_EP, registro);
}

export function tryUpdateRegistro(registro) {
  return axios.put(TIME_REGISTER_EP + "/" + registro.id, registro);
}

export function tryDeleteRegistro(id) {
  return axios.delete(TIME_REGISTER_EP + "/" + id);
}
