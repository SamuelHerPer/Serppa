import { useContext } from "react";
import { contextOrganizaciones } from "../ContextoOrganizaciones.jsx";

// Hook que hace de puente para utilizar el contexto de organizaciones.
const useOrganizaciones = () => {
  const contextoOrga = useContext(contextOrganizaciones); // Invoca al contexto de organizaciones.
  return contextoOrga;  // Devuelve el contexto.
};

export default useOrganizaciones;