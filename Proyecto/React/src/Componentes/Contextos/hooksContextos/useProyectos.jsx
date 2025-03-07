import { useContext } from "react";
import { contextProyectos } from "../ContextoProyectos.jsx";

// Hook que hace de puente para utilizar el contexto de proyectos.
const useProyectos = () => {
  const contextoProyect = useContext(contextProyectos); // Invoca al contexto de proyectos.
  return contextoProyect; // Devuelve el contexto.
};

export default useProyectos;