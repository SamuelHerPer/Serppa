import React from 'react'
import DatosOrga from "../Componentes/MainContent/ComponentesOrga/DatosOrga.jsx"
import "./PerfilOrga.css";
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios.jsx';

export const PerfilOrga = () => {
    const {isLoggedIn, datosUsuario} = useUsuarios();   //Extrae los estados del contexto de usuarios.

    //Si hay un usuario en la sesión muestra la página de perfil de una organización, si no muestra un mensaje informativo.
    return (
        <div id='PerfilOrga'>
            {isLoggedIn && datosUsuario ? (
                <>
                    <p id='TituloPaginaPerfilOrga'>Perfil de organización</p>
                    <DatosOrga />   {/* Llama a DatosOrga que pinta todos los datos de una organización. */}
                </>
            ) : (
                <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
            )}
        </div>
    )
}

export default PerfilOrga