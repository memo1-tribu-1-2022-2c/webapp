import axios from "axios";

export const BACKEND = "http://localhost:8080";

export const CONCEPT_EP = "/api/v1/concept";

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
    state: estado
  };
  return axios.put(BACKEND + CONCEPT_EP + "/" + id, data);
}