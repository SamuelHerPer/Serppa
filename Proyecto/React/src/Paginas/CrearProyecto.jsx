import React from 'react'
import FormCrearProyecto from '../Componentes/MainContent/ComponentesProjects/FormCrearProyecto.jsx';
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios.jsx';
import useOrganizaciones from '../Componentes/Contextos/hooksContextos/useOrganizaciones.jsx';
import "./CrearProyecto.css";

//Página que pinta el contenido para crear un proyecto.
const CrearProyecto = () => {
  const { organizacionSeleccionada } = useOrganizaciones(); // Extrae el estado del contexto de organizaciones.
  const {isLoggedIn, datosUsuario} = useUsuarios(); // Extrae los estados del contexto de usuarios.

  //Si hay un usuario en sesión muestra el formulario para crear un proyecto, si no muestra un mensaje de información.
  return (
    <div id='CrearProyecto'>
      {isLoggedIn && datosUsuario ? (
        <>
          <FormCrearProyecto orgId={organizacionSeleccionada} />  {/* Llama al componente que contiene el formulario para crear el proyecto pasándole en el parámetro orgId el id de la organización a la que va a pertenecer el proyecto. */}
        </>
      ):(
        <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
      )}
    </div>
  )
}

export default CrearProyecto;