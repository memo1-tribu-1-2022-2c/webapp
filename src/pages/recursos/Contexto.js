import React, { useContext, useState } from "react";

const ContextoRecursos = React.createContext();

export function GetContextoRecursos() {
  return useContext(ContextoRecursos);
}

export function ContextoRecursosProvider({ children }) {
  const partes_init = [
    {
      id: "1",
      tipo: "semanal",
      fechaInicio: "12/11/2022",
      estado: "emitido",
      horas: 30,
    },
    {
      id: "2",
      tipo: "mensual",
      fechaInicio: "1/12/2022",
      estado: "en borrador",
      horas: 20,
    },
  ]
  const [partes, setPartes] = useState(partes_init);


  const listaEmpleados = [
    { nombre: "Juan", apellido: "Perez", legajo: 12345678, horas: 100 },
    { nombre: "Pedro", apellido: "Gomez", legajo: 12554321, horas: 200 },
  ];

  return (
    <ContextoRecursos.Provider
      value={{
        partes: {getPartes: () => partes, agregarParte: (parte) => setPartes([...partes, parte]) ,
          restartPartes: () => setPartes(partes_init)} ,
        empleados: {getEmpleados: () => listaEmpleados},
      }}
    >
      {children}
    </ContextoRecursos.Provider>
  );
}
