import React, { useEffect } from 'react';
import useProyectos from '../../Contextos/hooksContextos/useProyectos.jsx';
import "./datosAnalytics.css";

const DatosAnalytics = () => {
  const { proyectoSeleccionado, googleAnalyticsData, cargarDatosGoogleAnalytics, proyectos } = useProyectos();

  useEffect(() => {

    if (proyectos.length > 0) {
      const projFond = proyectos.find(proj => proj.id === proyectoSeleccionado);

      if (projFond && projFond.google_analytics_property_id) {
        cargarDatosGoogleAnalytics(projFond.id, projFond.google_analytics_property_id);
      } else {
      }
    }
  }, [proyectos, proyectoSeleccionado]);

  useEffect(() => {
  }, [googleAnalyticsData]);

  return (
    <div id='DatosAnalytics'>
      <h1>Datos de Google Analytics</h1>
      {googleAnalyticsData.length > 0 ? (
        <div>
          <ul>
            {googleAnalyticsData.map((item, index) => (
              <li key={index}>
                Landing Page: {item.landingPagePlusQueryString}, Fecha: {item.date}, Fuente: {item.sessionSource}, Medio: {item.sessionMedium}, Sesiones: {item.sessions}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay datos de Google Analytics que mostrar.</p>
      )}
    </div>
  );
}

export default DatosAnalytics;
