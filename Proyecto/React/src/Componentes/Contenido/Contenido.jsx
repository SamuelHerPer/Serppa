import React from 'react'
import "./Contenido.css";
import Rutas from '../Rutas/Rutas';
import useUsuarios from '../Contextos/hooksContextos/useUsuarios';

const Contenido = () => {
  const { ocultarMenuPerfil, menuPerfil } = useUsuarios();  //Extrae los estados del contexto de usuarios.

  //Muestra el div donde se van a mostrar todas las páginas (este es el div principal de la página).
  return (
    <div id='Contenido' onClick={() => {menuPerfil && (ocultarMenuPerfil())}}>  {/* Si el menú del perfil esta visible, al hacer clic en cualquier parte lo oculta */}
        <Rutas /> {/* Llama al componente rutas que es el que indica que página se tiene que mostrar. */}
    </div>
  )
}

export default Contenido