import React, { useState, createContext, useContext } from "react";

const contextProyectos = createContext();   // Crea el contexto.

const ContextoProyectos = ({ children }) => {

    // Se declaran los estados necesarios.
    const [proyecto, setProyecto] = useState({
        nombre_dominio: '',
        descripcion: '',
        organizacion_id: null,
        google_analytics_property_id: ''
    });
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState("");
    const [colorProyecto, setColorProyecto] = useState("");
    const [googleAnalyticsData, setGoogleAnalyticsData] = useState([]);
    const [volverA, setVolverA] = useState("");

    // Función que envía el proyecto al backend.
    const enviarProyecto = async (orgId) => {
        const proyectoData = {
            nombre_dominio: proyecto.nombre_dominio,
            descripcion: proyecto.descripcion,
            organizacion_id: parseInt(orgId),
            google_analytics_property_id: proyecto.google_analytics_property_id || '',
            google_credentials: proyecto.google_credentials || {}
        };
    
        try {
            const respuesta = await fetch('http://localhost:8000/proyectos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(proyectoData),
            });
            if (!respuesta.ok) {
                throw new Error('Error al insertar el proyecto');
            }
            const data = await respuesta.json();
            console.log('Proyecto creado exitosamente:', data);
        } catch (error) {
            console.error('Error al crear proyecto:', error.message);
        }
    };

    // Función que obtiene los proyectos desde el backend.
    const obtenerProyectos =  async () => {
        try {
            const respuesta = await fetch('http://localhost:8000/proyectos-usuario/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!respuesta.ok) {
                throw new Error('Error al obtener los proyectos');
            }
            const data = await respuesta.json();
            setProyectos(data);

            if (proyectoSeleccionado) {
                const projFond = data.find(proj => proj.id === proyectoSeleccionado);
                setProyecto(projFond);
            }
        } catch (error) {
            console.error('Error al cargar proyectos:', error.message);
        }
    };

    // Función que envía la propiedad de GA4 para realizar la medición.
    const enviarPropiedadGoogleAnalytics = async (proyectoId, propertyId) => {
        try {
            const respuesta = await fetch(`http://localhost:8000/proyectos/${proyectoId}/actualizar-google-analytics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ property_id: propertyId }),
            });
            if (!respuesta.ok) {
                const errorResponse = await respuesta.json();
                throw new Error(errorResponse.detail || 'Error al actualizar el ID de propiedad de Google Analytics');
            }
            console.log('ID de propiedad actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar ID de propiedad:', error.message);
        }
    };

    const cargarDatosGoogleAnalytics = async (proyectoId, propertyId) => {
        try {
            const respuesta = await fetch(`http://localhost:8000/proyectos/${proyectoId}/google-analytics`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ property_id: propertyId }),
            });
            if (!respuesta.ok) {
                const errorResponse = await respuesta.json();
                throw new Error(errorResponse.detail || 'Error al obtener los datos de Google Analytics');
            }
            const data = await respuesta.json();
            setGoogleAnalyticsData(data);
        } catch (error) {
            console.error('Error al obtener los datos de Google Analytics:', error.message);
        }
    };

    // Función que actualizar el estado de proyecto cada vez que se modifican los inputs.
    const actualizarDatoProyecto = (e) => {
        const { name, value } = e.target;
        setProyecto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Objeto que exporta los estados y las funciones necesarias.
    const contextValue = {
        enviarProyecto,
        actualizarDatoProyecto,
        proyecto,
        proyectos,
        obtenerProyectos,
        setProyectoSeleccionado,
        proyectoSeleccionado,
        colorProyecto,
        setColorProyecto,
        enviarPropiedadGoogleAnalytics,
        googleAnalyticsData,
        setGoogleAnalyticsData,
        cargarDatosGoogleAnalytics, 
        volverA,
        setVolverA
    };

    // Se devuelve el proveedor del contexto (el componente que se va a ejectuar en App.jsx).
    return (
        <contextProyectos.Provider value={contextValue}>
            {children}
        </contextProyectos.Provider>
    );
};

// Se exporta el componente y el contexto.
export default ContextoProyectos;
export { contextProyectos };
