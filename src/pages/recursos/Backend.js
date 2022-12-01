import axios from "axios";

export const BACKEND = "http://localhost:8080";

export const CONCEPT_EP = "/api/v1/concept";

export function tryCreateConcept(nombre, descripcion, esRemunerable) {
  const data = {
    name: nombre,
    description: descripcion,
    remunerable: esRemunerable,
  };
  return axios.post(BACKEND + CONCEPT_EP, data);
}
