import React from 'react'
import { Link } from 'react-router-dom'
import "./TarjetaOrga.css";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import useOrganizaciones from '../../../Contextos/hooksContextos/useOrganizaciones';

const TarjetaOrga = ({orga, color}) => {
  // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
  const { setOrganizacionSeleccionada, setColorOrga } = useOrganizaciones();

  // Pinta la organización que le entra por props en una tarjeta.
  return (
    <div id='TarjetaOrga'>
        <div id='NombreOrga'>
          <div className={'avatar ' + color}>
            <span>{(orga.nombre).charAt(0).toUpperCase()}</span>
          </div>
          <p>{orga.nombre}</p>
        </div>
        <div id='InformacionOrga'>
          <div id='DatosOrga'>
            <div className='Dato'>
              <p>Usuarios</p>
              <h5>999</h5>
            </div>
            <div className='Dato'>
              <p>Proyectos</p>
              <h5>999</h5>
            </div>
          </div>
          <div id='MasInformacion'>
            <Link to={`/DatosOrga`} onClick={() => {
              setColorOrga(color);
              setOrganizacionSeleccionada(orga.id);
            }}>
              ver más
              <ArrowForwardRoundedIcon />
            </Link>
          </div>
        </div>
    </div>
  )
}

export default TarjetaOrga