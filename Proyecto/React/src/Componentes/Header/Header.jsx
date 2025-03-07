import React from 'react'
import "./Header.css";
import SinFotoPerfil from "../../assets/images/SinFoto.jpg";
import useUsuarios from '../Contextos/hooksContextos/useUsuarios';
import ModalLogin from '../MainContent/Modales/ModalLogin';
import MenuPerfil from './MenuPerfil/MenuPerfil';

const Header = () => {
  const { mostrarIniciarSesion, setMostrarIniciarSesion, isLoggedIn, menuPerfil, ocultarMenuPerfil, mostrarMenuPerfil, datosUsuario } = useUsuarios();  //Extrae los estados del contexto de usuarios.

  //Función para iniciar sesion.
  const iniciarSesion = () => {
    setMostrarIniciarSesion(true);
  };
  //Header que contiene un mensaje y el botón de login o en caso de ya haber iniciado sesión muestra la foto de perfil en lugar del botón de login.
  return (
    <div id='Header' onClick={() => { menuPerfil && (ocultarMenuPerfil()) }}>
      <div id='ContenidoIzq'>
        {isLoggedIn && datosUsuario ? (
          <h3>{datosUsuario.nombre}</h3>  
        ) : (
          <h3>Panel de proyectos para SEO</h3>
        )}
      </div>
      <div id='ContenidoDer'>
      {isLoggedIn && datosUsuario ? (
          <div id='Perfil' onClick={(e) => { e.stopPropagation(); menuPerfil ? ocultarMenuPerfil() : mostrarMenuPerfil(); }}> {/* Hace un toggle para mostrar u ocultar el menu del perfil. */}
            <img src={datosUsuario.foto_perfil ? datosUsuario.foto_perfil : SinFotoPerfil} alt="Imagen de perfil" />
            {menuPerfil && <MenuPerfil /> /* Llama al menu que contiene el ver perfil y el cerrar sesión. */}
          </div>
        ) : (
          <div id='BotonLogin' onClick={() => iniciarSesion('test@example.com', 'password')}>
            <p>Login</p>
          </div>
        )}
      </div>
      {mostrarIniciarSesion && (
        //Llama al modal que contiene el formulario de login.
        <ModalLogin
        />
      )}
    </div>
  )
}

export default Header