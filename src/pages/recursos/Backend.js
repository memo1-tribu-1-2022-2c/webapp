import axios from "axios";

export const RECURSOS_BACKEND =
  "https://squad320222c-production.up.railway.app/api/v1";

export const CONCEPT_EP = RECURSOS_BACKEND + "/concept";

export const RECURSOS_EXT_EP = RECURSOS_BACKEND + "/resources";

export const HOUR_DETAIL_EP = RECURSOS_BACKEND + "/hourDetail";
export const TIME_REGISTER_EP = RECURSOS_BACKEND + "/timeRegister";

export const PROYECTOS_BACKEND = "https://squad2-2022-2c.herokuapp.com/api/v1";
export const PROJECTS_ALL_EP = PROYECTOS_BACKEND + "/projects/all";

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

export function tryCreateParte(parte) {
  return axios.post(HOUR_DETAIL_EP, parte);
}

export function tryGetAllPartes() {
  return axios.get(HOUR_DETAIL_EP);
}

export function tryGetAllRegistros() {
  return axios.get(TIME_REGISTER_EP);
}
