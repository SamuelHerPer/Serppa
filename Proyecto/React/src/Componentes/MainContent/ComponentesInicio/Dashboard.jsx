import React, { useEffect } from 'react'
import "./Dashboard.css";
import useProyectos from '../../Contextos/hooksContextos/useProyectos.jsx';

const Dashboard = () => {
    // Se extraen los estados y las funciones necesarias del contexto utilizando el hook.
    const { proyectos, obtenerProyectos } = useProyectos();

    // Obtiene los proyectos del usuario en sesión.
    useEffect(() => {
        obtenerProyectos();
    }, []); // Con el array vacío indicamos que se ejecuta una vez cada vez que se monte el componente.

    // Pinta el dashboard principal del usuario en la página de inicio.
  return (
    <div id='Dashboard'>
        <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard