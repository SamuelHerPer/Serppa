import React, { useEffect, useState } from 'react';
import useProyectos from '../../Contextos/hooksContextos/useProyectos.jsx';
import "./DatosProjects.css";
import Miembro from '../ComponentesOrga/Miembros/Miembro.jsx';
import sinFoto from "../../../assets/images/SinFoto.jpg";
import FotoPerfil from "../../../assets/images/FotoPerfil.jpeg";
import Logo from "../../../assets/images/layout_set_logo.jpeg";
import Serppa from "../../../assets/images/logo-serppa.png";
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded.js';

const DatosProjects = () => {

  // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
  const { proyectos, obtenerProyectos, proyectoSeleccionado, colorProyecto, enviarPropiedadGoogleAnalytics, googleAnalyticsData, volverA } = useProyectos();

  // Se declaran los estados necesario en ámbito local.
  const [proyecto, setProyecto] = useState(null);
  const [googlePropertyId, setGooglePropertyId] = useState('');

  // Obtiene los proyectos del usuario que está en sesión.
  useEffect(() => {
    obtenerProyectos();
  }, []); // Array vacío para que se ejecute una vez cada vez que se monta el componente.

  // Busca el proyecto seleccionado y lo almacena.
  useEffect(() => {
    if (proyectos.length > 0) {
      const projFond = proyectos.find(proj => proj.id === proyectoSeleccionado);
      setProyecto(projFond);
    }
  }, [proyectos, proyectoSeleccionado]); // Se ejecuta cada vez que proyectos y proyectoSeleccionado se actualizan.

  // Función para enviar la propiedad de GA4 del proyecto seleccionado.
  const handleSubmit = () => {
    enviarPropiedadGoogleAnalytics(proyectoSeleccionado, googlePropertyId);
  };

  // Pinta los datos del proyectos seleccionad.
  return (
    <>
    <Link to={volverA} className='volver'>
      <ArrowBackRoundedIcon />
    </Link>
    <div id='DatosProjects'>
      {proyecto ? (
        <>
          <div id='InformacionGeneralProyecto'>
            <div id='InformacionPerfilProyecto'>
              <div id='HeaderInformacionPerfilProyecto'>
                <div className={'avatar ' + colorProyecto}>
                  <span>{(proyecto.nombre_dominio).charAt(0).toUpperCase()}</span>
                </div>
                <p>{proyecto.nombre_dominio}</p>
              </div>
              <p className="TituloSeccion">Datos</p>
              <p><span>Organización {'>'}</span> {proyecto.nombre_organizacion ? proyecto.nombre_organizacion : "No se ha encontrado este dato."}</p>
              <p><span>Descripcion {'>'}</span> {proyecto.descripcion ? proyecto.descripcion : "No se ha encontrado este dato."}</p>
              <p><span>API Key {'>'}</span> {proyecto.api_key ? proyecto.api_key : "No se ha encontrado este dato."}</p>
              <p><span>Control de tareas {'>'}</span> {proyecto.control_tareas ? proyecto.control_tareas : "No se ha encontrado este dato."}</p>
              <p><span>Dashboard {'>'}</span> {proyecto.dashboard ? proyecto.dashboard : "No se ha encontrado este dato."}</p>
              <p><span>Monitor de posiciones {'>'}</span> {proyecto.monitor_posiciones ? proyecto.monitor_posiciones : "No se ha encontrado este dato."}</p>
              <p><span>Control de enlaces {'>'}</span> {proyecto.control_enlaces ? proyecto.control_enlaces : "No se ha encontrado este dato."}</p>
              <p><span>Drive {'>'}</span> {proyecto.drive ? proyecto.drive : "No se ha encontrado este dato."}</p>
              <p><span>ID flujo de datos {'>'}</span> {proyecto.id_flujo_datos ? proyecto.id_flujo_datos : "No se ha encontrado este dato."}</p>
              <p><span>ID de medición {'>'}</span> {proyecto.id_medicion ? proyecto.id_medicion : "No se ha encontrado este dato."}</p>
            </div>
            <div id='InformacionMiembrosProyecto'>
              <p className='TituloSeccion'>Miembros</p>
              <div id='MiembrosProyecto'>
                <Miembro foto={sinFoto} nombre={"Samuel Hernández Pérez"} />
                <Miembro foto={FotoPerfil} nombre={"Miguel Ángel Pau"} />
                <Miembro foto={Logo} nombre={"Alejandro Manuel Lluch"} />
                <Miembro foto={Serppa} nombre={"Serppa"} />
                <Miembro foto={sinFoto} nombre={"Nombre y Apellidos"} />
              </div>
            </div>
          </div>
          <div id='ProyectoAnalytics'>
            <h1>Datos de Analytics</h1>
            <input 
              type="text" 
              value={googlePropertyId} 
              onChange={(e) => setGooglePropertyId(e.target.value)} 
              placeholder="ID de Propiedad de Google Analytics" 
            />
            <button onClick={handleSubmit}>Enviar ID de Propiedad</button>
          </div>
        </>
      ) : (
        <p>No se encontró el proyecto.</p>
      )}
    </div>
    </>
  );
}

export default DatosProjects;
