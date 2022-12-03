import axios from "axios";

export const BACKEND = "https://squad320222c-production.up.railway.app";

export const CONCEPT_EP = "/api/v1/concept";

export const RECURSOS_EXT_EP =
  "https://squad320222c-production.up.railway.app/api/v1/resources";

export const HOUR_DETAIL_EP = "/api/v1/hourDetail";
export const TIME_REGISTER_EP = "/api/v1/timeRegister";

export const PROYECTOS_BACKEND = "https://squad2-2022-2c.herokuapp.com";
export const PROJECTS_ALL_EP = "/api/v1/projects/all";

export function tryCreateConcept(nombre, descripcion, esRemunerable) {
  const data = {
    name: nombre,
    description: descripcion,
    remunerable: esRemunerable,
    status: "AVAILABLE",
  };
  return axios.post(BACKEND + CONCEPT_EP, data);
}

export function tryGetConcepts() {
  return axios.get(BACKEND + CONCEPT_EP);
}

export function tryDeleteConcept(id) {
  return axios.delete(BACKEND + CONCEPT_EP + "/" + id);
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
  return axios.put(BACKEND + CONCEPT_EP + "/" + id, data);
}

export function tryGetRecursos() {
  return axios.get(RECURSOS_EXT_EP);
}

export function tryGetRecurso(legajo) {
  return axios.get(RECURSOS_EXT_EP + "/" + legajo);
}

export function tryGetProyectos() {
  return axios.get(PROYECTOS_BACKEND + PROJECTS_ALL_EP);
}

export function tryCreateParte(parte) {
  return axios.post(BACKEND + HOUR_DETAIL_EP, parte);
}

export function tryGetAllPartes() {
  return axios.get(BACKEND + HOUR_DETAIL_EP);
}

export function tryGetAllRegistros() {
  return axios.get(BACKEND + TIME_REGISTER_EP);
}
