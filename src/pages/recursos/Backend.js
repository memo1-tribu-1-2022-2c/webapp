import axios from "axios";

export const BACKEND = "https://squad320222c-production.up.railway.app";

export const CONCEPT_EP = "/api/v1/concept";

export const RECURSOS_EXT_EP = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos"

export const HOUR_DETAIL_EP = "/api/v1/hourDetail";
export const TIME_REGISTER_EP = "/api/v1/timeRegister";

export const PROYECTOS_BACKEND = "https://squad2-2022-2c.herokuapp.com"
export const PROJECTS_ALL_EP = "/api/v1/projects/all";

export function tryCreateConcept(nombre, descripcion, esRemunerable) {
  const data = {
    name: nombre,
    description: descripcion,
    remunerable: esRemunerable,
    status: "AVAILABLE"
  };
  return axios.post(BACKEND + CONCEPT_EP, data);
}

export function tryGetConcepts() {
  return axios.get(BACKEND + CONCEPT_EP);
}

export function tryDeleteConcept(id) {
  return axios.delete(BACKEND + CONCEPT_EP + "/" + id);
}

export function tryUpdateConcept(id, nombre, descripcion, esRemunerable, estado) {
  const data = {
    name: nombre,
    description: descripcion,
    remunerable: esRemunerable,
    status: estado
  };
  return axios.put(BACKEND + CONCEPT_EP + "/" + id, data);
}

export function tryGetRecursos() {
  return axios.get(RECURSOS_EXT_EP);
}

export function tryGetProyectos() {
  return axios.get(PROYECTOS_BACKEND + PROJECTS_ALL_EP);
}

export function tryCreateParte(parte){
  let data = {
    "startTime": "2022-12-01",
    "type": "MENSUAL",
    "workerId": 1
  }
  return axios.post("https://squad320222c-production.up.railway.app/api/v1/hourDetail", data, { headers: { accept: "*/*" } });
}

export function tryGetAllPartes(){
  return axios.get(BACKEND + HOUR_DETAIL_EP);
}

export function tryGetAllRegistros(){
  return axios.get(BACKEND + TIME_REGISTER_EP);
}

