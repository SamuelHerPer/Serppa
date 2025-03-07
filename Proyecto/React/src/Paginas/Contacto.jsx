import React from 'react'
import './Contacto.css'
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios';
import FormularioContacto from '../Componentes/MainContent/ComponentesContacto/FormularioContacto';

const Contacto = () => {
    const {isLoggedIn, datosUsuario} = useUsuarios(); //Extrae los estados del contexto de usuarios.

    //Si hay un usuario en sesión muestra el formulario de contacto, si no muestra un mensaje de información.
  return (
    <div id='Contacto'>
        {isLoggedIn && datosUsuario ? (
            <>
                <h1>Deja tu mensaje</h1>
                <FormularioContacto />
            </>
      ):(
        <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
      )}
    </div>
  )
}

export default Contacto