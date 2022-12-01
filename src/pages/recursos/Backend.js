import axios from "axios";

export const BACKEND = "http://localhost:8080";

export const CONCEPT_EP = "/api/v1/concept";

export function tryCreateConcept(nombre, descripcion, esRemunerable) {
  return axios.post(
    BACKEND + CONCEPT_EP,
    JSON.stringify({
        name: nombre,
        description: descripcion,
        remunerable: esRemunerable,
      }),
  );
}
