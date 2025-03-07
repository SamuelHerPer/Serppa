import React, { useEffect, useState } from 'react'
import "./PerfilUsuario.css";
import useUsuarios from '../Contextos/hooksContextos/useUsuarios';
import SinFotoPerfil from "../../assets/images/SinFoto.jpg";

const PerfilUsuario = () => {
    const { informacion, error, vaciarInformacion, vaciarError, datosUsuario, cambiarImagen, datosFormulario, setDatosFormulario, actualizarPerfilUsuario, actualizarDatosPerfil } = useUsuarios(); //Extrae los estados del contexto de usuarios.

    // Vacía los mensajes de error e información y autorrellena el formulario con los datos del usuario.
    useEffect(() => {
        vaciarInformacion();
        vaciarError();
        if (datosUsuario) {
            setDatosFormulario({
                nombre: datosUsuario.nombre || '',
                empresa: datosUsuario.empresa || '',
                pais: datosUsuario.pais || '',
                ciudad: datosUsuario.ciudad || ''
            });
        }
    }, []); // El array vacío para que se ejecute solo al cargar el componente.

    // Maneja el cambio de datos para actualizar el perfil.
    const handleActualizarPerfil = async () => {
        const formData = new FormData();
        formData.append('nombre', datosFormulario.nombre);
        formData.append('empresa', datosFormulario.empresa);
        formData.append('pais', datosFormulario.pais);
        formData.append('ciudad', datosFormulario.ciudad);
        if (datosUsuario.fotoPerfilFile) {
            formData.append('foto_perfil', datosUsuario.fotoPerfilFile);
        }
    
        await actualizarPerfilUsuario(datosUsuario.id, formData);
    };

    // Pinta el componente que contiene todos los datos del usuario en sesión y permite modificarlos.
    return (
        <div id='PerfilUsuario'>
            <p id='TituloPaginaPerfil'>Perfil</p>
            <div id='DatosPerfil'>
                <div id='ContenidoPerfil'>
                    <div id='Imagen'>
                        <label htmlFor="inputFotoPerfil">
                        <img src={datosUsuario.foto_perfil ? datosUsuario.foto_perfil : SinFotoPerfil} alt="Imagen de perfil" />
                        </label>
                        <input type="file" id="inputFotoPerfil" onChange={cambiarImagen} />
                    </div>
                    <div id='Datos'>
                        <p>{datosUsuario ? datosUsuario.nombre : ''}</p>
                        <p>{datosUsuario ? datosUsuario.email : ''}</p>
                    </div>
                </div>
            </div>

            <p id='TituloActualizarPerfil'>Actualizar datos del usuario</p>
            <div id='ActualizarPerfil'>
                <form id='FormularioPerfil'>
                    <div className='inputFormulario'>
                    <label className='labelFormulario'>Nombre</label>
                        <input type="text" name="nombre" id="nombre" placeholder='Introduce el nuevo nombre' value={datosFormulario.nombre || ''} onChange={actualizarDatosPerfil}/>
                        <label className='labelFormulario'>Empresa</label>
                        <input type="text" name="empresa" id="empresa" placeholder='Introduce la nueva empresa' value={datosFormulario.empresa || ''} onChange={actualizarDatosPerfil}/>
                        <label className='labelFormulario'>País</label>
                        <input type="text" name="pais" id="pais" placeholder='Introduce el nuevo país' value={datosFormulario.pais || ''} onChange={actualizarDatosPerfil}/>
                        <label className='labelFormulario'>Ciudad</label>
                        <input type="text" name="ciudad" id="ciudad" placeholder='Introduce la nueva ciudad' value={datosFormulario.ciudad || ''} onChange={actualizarDatosPerfil}/>
                    </div>
                </form>
                {informacion && (
                    <h4 className='correcto'>{informacion}</h4>
                )}
                {error && (
                    <h4 className='error'>{error}</h4>
                )}
                <button id='BotonActualizar' onClick={handleActualizarPerfil}>Actualizar perfil</button>
            </div>
        </div>
    )
}

export default PerfilUsuario;