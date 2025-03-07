import React from 'react'
import "./Footer.css";
import useUsuarios from '../Contextos/hooksContextos/useUsuarios';

const Footer = () => {
  const { ocultarMenuPerfil, menuPerfil } = useUsuarios();  //Extrae los estados del contexto de usuarios.
  return (
    <div id='Footer' onClick={() => {menuPerfil && (ocultarMenuPerfil())}}> {/* Si el menú del perfil esta visible, al hacer clic en cualquier parte lo oculta */}
        <div id='Copyright'>
            <p>2024 &copy; Serppa</p>
        </div>
        <div id='Authors'>
            <p>Design & Develop by Alejandro Lluch & Samuel Hernández</p>
        </div>
    </div>
  )
}

export default Footer