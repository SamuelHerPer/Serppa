import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOrganizaciones from '../../Contextos/hooksContextos/useOrganizaciones.jsx';
import "./ListadoOrga.css";
import TarjetaOrga from './Tarjetas/TarjetaOrga.jsx';

const ListadoOrga = () => {

  // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
  const { organizaciones, obtenerOrganizaciones, setOrganizacionSeleccionada } = useOrganizaciones();

  // Obtiene las organizaciones del usuario y vacía el estado que contiene la organización seleccionada actualmente.
  useEffect(() => {
    obtenerOrganizaciones();
    setOrganizacionSeleccionada("");
  }, []); // Array vacío para que se ejecute una vez cada vez que se monta el componente.

  // Pinta el listado de tarjetas de las organizaciones del usuario.
  return (
    <div id='ListadoOrga'>
      <p id='TituloPaginaOrganizaciones'>Organizaciones</p>
      <Link className="botonCrearUserInicio" to="/FormCrearOrga">+ Añadir</Link>
      <div id='ListaOrganizaciones'>
        {organizaciones.length > 0 ? (
          <ul>
            {organizaciones.map((org, index)=> (
              <li key={index}>
                <TarjetaOrga orga={org} color={`color-${index % 6}`}/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay organizaciones asociadas a este usuario.</p>
        )}
      </div>
    </div>
  );
};

export default ListadoOrga