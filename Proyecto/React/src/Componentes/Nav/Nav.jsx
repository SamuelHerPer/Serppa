import React, { useState } from 'react'
import "./Nav.css";
import logo from "../../assets/images/logo-serppa.png";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import { Link } from "react-router-dom";
import useUsuarios from '../Contextos/hooksContextos/useUsuarios';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import PolicyRoundedIcon from '@mui/icons-material/PolicyRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ImportContactsRoundedIcon from '@mui/icons-material/ImportContactsRounded';
import SinFotoPerfil from '../../assets/images/SinFoto.jpg'

const Nav = () => {
    const { ocultarMenuPerfil, menuPerfil, datosUsuario, isLoggedIn, menuHamburguesa, mostrarMenuHamburguesa, ocultarMenuHamburguesa, cerrarSesion } = useUsuarios();   // Extrae los estados del contexto de usuarios.

    // Muestra el menú de navegación de la web.
  return (
    <>
    {/* Por defecto muestra este menú. */}
    <div id='Nav' onClick={() => {menuPerfil && (ocultarMenuPerfil())}}> {/* Si el menu del perfil está desplegado lo oculto de nuevo al hacer clic en este componente. */}
        <Link to="/">
            <div id='logo'>
                <img src={logo} alt="Logo"  />
            </div>
        </Link>
        <ul>
            <li className='menu-title'>Menu</li>
            <li className='link'>
                <Link to="/">
                    <div className='icono'>
                        <HomeRoundedIcon />
                    </div>
                    <div className='texto'>
                        Inicio
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/ListadoProjects">
                    <div className='icono'>
                        <BookRoundedIcon />
                    </div>
                    <div className='texto'>
                        Proyectos
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/ListadoOrga">
                    <div className='icono'>
                        <Diversity3RoundedIcon />
                    </div>
                    <div className='texto'>
                        Organizaciones
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/Contacto">
                    <div className='icono'>
                        <ImportContactsRoundedIcon />
                    </div>
                    <div className='texto'>
                        Contacto
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/">
                    <div className='icono'>
                        <InfoRoundedIcon />
                    </div>
                    <div className='texto'>
                        Sobre nosostros
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/">
                    <div className='icono'>
                        <PolicyRoundedIcon />
                    </div>
                    <div className='texto'>
                        Políticas de privacidad
                    </div>
                </Link>
            </li>
        </ul>
    </div>
    {/* Si el ancho del navegador es muuy fino salta la media query y se muestra este menú. */}
    <div id='MenuMovil'>
            <Link to="/" onClick={() => {
                menuHamburguesa && ocultarMenuHamburguesa()
                menuPerfil && ocultarMenuPerfil()
                }}>
                <HomeRoundedIcon />
            </Link>
            <Link to="/ListadoProjects" onClick={() => {
                menuHamburguesa && ocultarMenuHamburguesa()
                menuPerfil && ocultarMenuPerfil()
                }}>
                <BookRoundedIcon />
            </Link>
            <Link to="/ListadoOrga" onClick={() => {
                menuHamburguesa && ocultarMenuHamburguesa()
                menuPerfil && ocultarMenuPerfil()
                }}>
                <Diversity3RoundedIcon />
            </Link>
            <div onClick={() => {
                menuHamburguesa ? ocultarMenuHamburguesa() : mostrarMenuHamburguesa()
                menuPerfil && ocultarMenuPerfil()
                }}>
                <MenuRoundedIcon />
            </div>
    </div>
    <div id='MenuHamburguesa' className={menuHamburguesa ? "mostrar" : "oculto"}>
        <div id='HeaderMenuHamburguesa'>
            <div id='logoMenuHamburguesa'>
                <img src={logo} alt="Logo"  />
            </div>
            <div id='cerrarMenuHamburguesa' onClick={() => {ocultarMenuHamburguesa()}}>
                <CloseRoundedIcon />
            </div>
        </div>

        <ul>
            <li className='menu-title'>Menu</li>
            <li className='link'>
                <Link to="/" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                    <div className='icono'>
                        <HomeRoundedIcon />
                    </div>
                    <div className='texto'>
                        Inicio
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/ListadoProjects" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                    <div className='icono'>
                        <BookRoundedIcon />
                    </div>
                    <div className='texto'>
                        Proyectos
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/ListadoOrga" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                    <div className='icono'>
                        <Diversity3RoundedIcon />
                    </div>
                    <div className='texto'>
                        Organizaciones
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                    <div className='icono'>
                        <ImportContactsRoundedIcon />
                    </div>
                    <div className='texto'>
                        Contacto
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                    <div className='icono'>
                        <InfoRoundedIcon />
                    </div>
                    <div className='texto'>
                        Sobre nosostros
                    </div>
                </Link>
            </li>
            <li className='link'>
                <Link to="/" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                    <div className='icono'>
                        <PolicyRoundedIcon />
                    </div>
                    <div className='texto'>
                        Políticas de privacidad
                    </div>
                </Link>
            </li>
        </ul>

        {/* Si hay usuario en la sesión muestra su foto de perfil y el botón de cerrar sesión, si no no muestra nada. */}
        {isLoggedIn && datosUsuario ? (
            <div id='accionesMenuHamburguesa'>
                <div id='Perfil'>
                    <Link to="/Perfil" onClick={() => {
                        ocultarMenuHamburguesa();
                    }}>
                        <img src={datosUsuario.foto_perfil ? datosUsuario.foto_perfil : SinFotoPerfil} alt="Imagen de perfil" />
                    </Link>
                </div>
                <div className='opcion' onClick={() => {
                    ocultarMenuHamburguesa();
                    cerrarSesion();
                    }}>
                    <MeetingRoomRoundedIcon />
                    <p>Cerrar sesión</p>
                </div>
            </div>
        ) : (
            ""
        )}
    </div>
    </>
  )
}

export default Nav