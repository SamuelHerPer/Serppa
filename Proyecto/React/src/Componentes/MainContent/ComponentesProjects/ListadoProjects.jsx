import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProyectos from '../../Contextos/hooksContextos/useProyectos.jsx';
import "./ListadoProjects.css";
import TarjetaProyecto from './Tarjetas/TarjetaProyecto.jsx';


const ListadoProjects = () => {

  // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
  const { proyectos, obtenerProyectos, setProyectoSeleccionado } = useProyectos();

  // Obtiene los proyectos del usuario y vacía el estado que contiene el proyecto seleccionado actualmente.
  useEffect(() => {
    obtenerProyectos();
    setProyectoSeleccionado("");
  }, []); // Array vacío para que se ejecute una vez cada vez que se monta el componente.

  // Pinta el listado de tarjetas de los proyectos del usuario.
  return (
    <div id='ListadoProjects'>
      <p id='TituloPaginaProyectos'>Proyectos</p>
      <Link className="botonCrearUserInicio" to="/FormCrearProyecto">+ Añadir</Link>
      <div id='ListadoProyectos'>
        {proyectos.length > 0 ? (
          <ul>
            {proyectos.map((proj, index) => (
              <li key={index}>
                <TarjetaProyecto proyecto={proj} color={`color-${index % 6}`} volverA='/ListadoProjects'/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay proyectos asociadas a este usuario.</p>
        )}
      </div>
    </div>
  );
};

export default ListadoProjects