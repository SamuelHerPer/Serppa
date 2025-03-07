import React from 'react'
import ListadoOrga from '../Componentes/MainContent/ComponentesOrga/ListadoOrga.jsx'
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios.jsx';
import "./Organizaciones.css";

const Organizaciones = () => {
  const {isLoggedIn, datosUsuario} = useUsuarios(); //Extrae los estados del contexto de usuarios.

  // Si hay un usuario en sesión muestra el listado de organizaciones que tiene ese usuario, si no muestra un mensaje informativo.
  return (
    <div id='Organizaciones'>
      {isLoggedIn && datosUsuario ? (
          <ListadoOrga /> // Llama al componente que pinta el listado de organizaciones.
      ):(
        <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
      )}
    </div>
  )
}

export default Organizaciones