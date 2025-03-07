import React from 'react'
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios'
import PerfilUsuario from '../Componentes/PerfilUsuario/PerfilUsuario';
import "./Perfil.css";

const Perfil = () => {
  const {isLoggedIn, datosUsuario} = useUsuarios(); //Extrae los estados del contexto de usuarios.

  //Si hay un usuario en la sesión muestra los datos de dicho usuario para poder consultarlos o modificarlos, si no muestra un mensaje informativo.
  return (
    <div id='PaginaPerfil'>
      {isLoggedIn && datosUsuario ? (
        <PerfilUsuario /> //Llama al componente que pinta los datos del usuario.
      ):(
        <h2 id='Advertencia'>Debes iniciar sesión para acceder a esta página.</h2>
      )}
    </div>
  )
}

export default Perfil