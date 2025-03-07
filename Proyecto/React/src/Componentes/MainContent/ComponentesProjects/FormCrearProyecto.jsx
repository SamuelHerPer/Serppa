import React, { useEffect, useState } from 'react';
import useProyectos from '../../Contextos/hooksContextos/useProyectos.jsx';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded.js';
import "./FormCrearProyecto.css";
import useOrganizaciones from '../../Contextos/hooksContextos/useOrganizaciones.jsx';

const FormCrearProyecto = ({ orgId }) => {

    // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
    const { enviarProyecto, actualizarDatoProyecto } = useProyectos();
    const { organizacionSeleccionada, obtenerOrganizaciones, organizaciones } = useOrganizaciones();

    // Se declaran los estados necesario en ámbito local.
    const [ idSeleccionado, setIdSeleccionado ] = useState('');

    // Crea el proyecto con el id que ha entrado por props.
    const manejarCrearProyecto = (e) => {
        e.preventDefault();
        enviarProyecto(orgId);
    }

    // Crea el proyecto con el id seleccionado en el desplegable.
    const manejarCrearProyectoSeleccionandoId = (e) => {
        e.preventDefault();
        enviarProyecto(idSeleccionado);
    }

    // Almacena el id seleccionado en el desplegable.
    const seleccionarId = (e) => {
        setIdSeleccionado(e.target.value);
    }

    // Se trae todas las organizaciones.
    useEffect(() => {
        obtenerOrganizaciones();
    }, []);

    // Pinta el formulario para crear un nuevo proyecto.
    return (
        <div id="ContenedorPrincipalCrearProyecto">
            {organizacionSeleccionada ?
            (<Link to={'/DatosOrga'} className='volver'>
                <ArrowBackRoundedIcon />
            </Link>)
            :
            (
                <Link to={'/ListadoProjects'} className='volver'>
                    <ArrowBackRoundedIcon />
                </Link>
            )}
            <div id="ContenedorFormularioCrearProyecto">
                <h2>Crea tu proyecto</h2>
                <form className="grupoFormulario">
                    {!organizacionSeleccionada ? (
                        <label>Organización:
                            {organizaciones ? (
                                <select name="organizacion_id" required onChange={seleccionarId}>
                                    <option value="">Selecciona una organizacion</option>
                                    {organizaciones.map((v, i, a) => {
                                        return <option key={i} value={v.id}>{v.nombre}</option>
                                    })}
                                </select>
                            ):(
                                <p className='mensajeError'>**No se han encotrado organizaciones**</p>
                            )}
                        </label>
                    ):(
                        <label>
                            <input type="hidden" name="organizacion_id" value={orgId} readOnly />
                        </label>
                    )}
                    <label>
                        <input type="text" name="nombre_dominio" placeholder="Nombre del dominio" onChange={actualizarDatoProyecto} />
                    </label>
                    <label>
                        <textarea name="descripcion" placeholder="Descripción del proyecto" onChange={actualizarDatoProyecto} />
                    </label>
                    {/* Comprueba si le ha entrado una organización. Si le ha entrado crea el proyecto con esa organización si no lo crea con la organización seleccionada en el desplegable. */}
                    {organizacionSeleccionada ? (
                        <button className="botonCrearProyecto" type="submit" onClick={manejarCrearProyecto}>
                            Crear Proyecto
                        </button>
                    ) : (
                        <button className="botonCrearProyecto" type="submit" onClick={manejarCrearProyectoSeleccionandoId}>
                            Crear Proyecto
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default FormCrearProyecto;
