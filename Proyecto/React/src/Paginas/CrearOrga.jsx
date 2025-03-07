import React from 'react'
import FormCrearOrga from "../Componentes/MainContent/ComponentesOrga/FormCrearOrga.jsx"
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios.jsx';
import "./CrearOrga.css";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded.js';
import { Link } from 'react-router-dom';

//Página que pinta el contenido para crear una organización.
const CrearOrga = () => {
  const {isLoggedIn, datosUsuario} = useUsuarios(); //Extrae los estados del contexto de usuarios.

  //Si hay un usuario en sesión muestra el formulario para crear una organización, si no muestra un mensaje de información.
  return (
    <div id='CrearOrga'>
      {isLoggedIn && datosUsuario ? (
        <>
          <Link to={'/ListadoOrga'} className='volver'>
            <ArrowBackRoundedIcon />
          </Link>
          <FormCrearOrga />
        </>
      ):(
        <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
      )}
    </div>
  )
}

export default CrearOrga;