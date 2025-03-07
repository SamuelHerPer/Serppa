import React, { useEffect, useState } from 'react';
import useOrganizaciones from '../../Contextos/hooksContextos/useOrganizaciones.jsx';
import useProyectos from '../../Contextos/hooksContextos/useProyectos.jsx';
import "./DatosOrga.css";
import Miembro from './Miembros/Miembro.jsx';
import sinFoto from "../../../assets/images/SinFoto.jpg";
import FotoPerfil from "../../../assets/images/FotoPerfil.jpeg";
import Logo from "../../../assets/images/layout_set_logo.jpeg";
import Serppa from "../../../assets/images/logo-serppa.png";
import TarjetaProyecto from '../ComponentesProjects/Tarjetas/TarjetaProyecto.jsx';
import { Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded.js';

const DatosOrga = () => {

  // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
  const { organizaciones, obtenerOrganizaciones, organizacionSeleccionada, colorOrga } = useOrganizaciones();
  const { obtenerProyectosPorOrganizacion, proyectos } = useProyectos();

  // Se declaran los estados necesario en ámbito local.
  const [organizacion, setOrganizacion] = useState(null);

  // Obtiene las organizaciones del usuario y obtiene los proyectos de la organización seleccionada que le entra por parámetro.
  useEffect(() => {
    obtenerOrganizaciones();
  }, []); // Array vacío para que se ejecute una vez cada vez que se monta el componente.

  // Obtiene la organización seleccionada.
  useEffect(() => {
    if (organizaciones.length > 0) {
      const orgFound = organizaciones.find(org => org.id === organizacionSeleccionada);
      setOrganizacion(orgFound);
    }
  }, [organizaciones, organizacionSeleccionada]); // Se ejecuta cada vez que organizaciones y organizacionSeleccionada cambian su valor/contenido

  // Pinta los datos de la organización seleccionada así como sus proyectos asociados.
  return (
    <>
    <Link to={'/ListadoOrga'} className='volver'>
      <ArrowBackRoundedIcon />
    </Link>
    <div id='DatosOrganizacion'>
      {organizacion ? (
        <>
        <div id='InformacionGeneralOrganizacion'>
          <div id='InformacionOrganizacion'>
            <div id='HeaderInformacionOrganizacion'>
              <div className={'avatar ' + colorOrga}>
                <span>{(organizacion.nombre).charAt(0).toUpperCase()}</span>
              </div>
              <p>{organizacion.nombre}</p>
            </div>
            <p className="TituloSeccion">Datos</p>
            <p><span className='DatoOrga'>Email {'>'}</span> {organizacion.email_empresa}</p>
            <p><span className='DatoOrga'>Razón social {'>'}</span> {organizacion.razon_social}</p>
            <p><span className='DatoOrga'>Dirección fiscal {'>'}</span> {organizacion.direccion_fiscal}</p>
          </div>
          <div id='InformacionMiembrosOrga'>
            <p className='TituloSeccion'>Miembros</p>
            <div id='MiembrosOrga'>
              <Miembro foto={sinFoto} nombre={"Samuel Hernández Pérez"}/>
              <Miembro foto={FotoPerfil} nombre={"Miguel Ángel Pau"} />
              <Miembro foto={Logo} nombre={"Alejandro Manuel Lluch"} />
              <Miembro foto={Serppa} nombre={"Serppa"} />
              <Miembro foto={sinFoto} nombre={"Nombre y Apellidos"} />
            </div>
          </div>
        </div>
        <div id='ProyectosOrganizacion'>
          <h1>Proyectos</h1>
          <Link className="botonCrearProyectoEnOrga" to={`/FormCrearProyecto`}>
            Crear Proyecto
          </Link>
          {proyectos.length > 0 ? (
            <ul>
              {proyectos.map((proj, index) => (
                <li key={index}>
                  <TarjetaProyecto proyecto={proj} color={`color-${index % 6}`} volverA='/DatosOrga' />
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay proyectos asociadas a esta organización.</p>
          )}
        </div>
        </>
      ) : (
        <p>No se encontró la organización.</p>
      )}
    </div>
    </>
  )
}

export default DatosOrga;
