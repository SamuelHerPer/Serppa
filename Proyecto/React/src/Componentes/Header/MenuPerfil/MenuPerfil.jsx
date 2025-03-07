import React from 'react'
import "./MenuPerfil.css";
import { Link } from 'react-router-dom'
import useUsuarios from '../../Contextos/hooksContextos/useUsuarios'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';

const MenuPerfil = () => {
    const {cerrarSesion} = useUsuarios();   //Extrae la función del contexto de usuarios.
    //Muestra el menú al hacer click en la foto de perfil.
  return (
    <div className='menu'>
        <div className='opciones'>
            <Link to="Perfil" className='opcion'>   {/* Redirige a Perfil al hacer clic */}
                <PersonRoundedIcon />
                <p>Ver perfil</p>
            </Link>
            <div className='opcion' onClick={() => {cerrarSesion()}}>   {/* Cierra la sesión al hacer clic */}
                <MeetingRoomRoundedIcon />
                <p>Cerrar sesión</p>
            </div>
        </div>
    </div>
  )
}

export default MenuPerfil