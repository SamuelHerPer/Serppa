import React from 'react'
import ListadoProjects from '../Componentes/MainContent/ComponentesProjects/ListadoProjects.jsx'
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios.jsx'
import "./Proyectos.css";


const Proyectos = () => {
  const {isLoggedIn, datosUsuario} = useUsuarios(); //Extrae los estados del contexto de usuarios.

  //Si hay un usuario en la sesión muestra el listado de proyectos que tiene asociados, si no muestra un mensaje informativo.
  return (
    <div id='Proyectos'>
      {isLoggedIn && datosUsuario ? (
          <ListadoProjects /> //Llama al componente ListadoProjects que pinta el listado de proyectos.
      ):(
        <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
      )}
    </div>
  )
}

export default Proyectos