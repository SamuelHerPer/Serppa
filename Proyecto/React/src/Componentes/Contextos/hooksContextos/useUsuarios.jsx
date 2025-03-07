import { useContext } from "react";
import { contextUsuarios } from "../ContextoUsuarios.jsx";

// Hook que hace de puente para utilizar el contexto de usuarios.
const useUsuarios = () => {
  const contexto = useContext(contextUsuarios); // Invoca al contexto de usuarios.
  return contexto;  // Devuelve el contexto.
};

export default useUsuarios;