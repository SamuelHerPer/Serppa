import React from 'react'
import DatosProjects from '../Componentes/MainContent/ComponentesProjects/DatosProjects.jsx';
import DatosAnnalytics from '../Componentes/MainContent/ComponentesProjects/DatosAnalytics.jsx';
import "./PerfilProjects.css";
import useUsuarios from '../Componentes/Contextos/hooksContextos/useUsuarios.jsx';

export const PerfilProjects = () => {
    const { isLoggedIn, datosUsuario } = useUsuarios(); //Extrae los estados del contexto de usuarios.

    //Si hay un usuario en la sesión muestra la página de perfil de un proyecto, si no muestra un mensaje informativo.
    return (
        <div id='PerfilProjects'>
            {isLoggedIn && datosUsuario ? (
                <>
                    <p id='TituloPaginaPerfilProyecto'>Perfil de proyecto</p>
                    <DatosProjects />   {/* Llama a DatosProjects que pinta todos los datos de un proyecto. */}
                    <DatosAnnalytics/>
                </>
            ) : (
                <h2 className='mensajeAnonimo'>Debes iniciar sesión para acceder a esta página.</h2>
            )}
        </div>
    )
}

export default PerfilProjects