import React, { useState, createContext, useEffect } from "react";

const contextOrganizaciones = createContext();  // Crea el contexto.

const ContextoOrganizaciones = ({ children }) => {

    // Se declaran los estados necesarios.
    const [organizacion, setOrganizacion] = useState({
        nombre: '',
        email_empresa: '',
        razon_social: '',
        direccion_fiscal: ''
    });
    const [organizaciones, setOrganizaciones] = useState([]);
    const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState("");
    const [colorOrga, setColorOrga] = useState("");
    
    // Función para obtener las organizaciones.
    const obtenerOrganizaciones = async () => {
        try {
            const respuesta = await fetch('http://localhost:8000/organizaciones-usuario/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!respuesta.ok) {
                throw new Error('Error al obtener las organizaciones');
            }
            const data = await respuesta.json();
            setOrganizaciones(data); //Almacenamos los datos obtenidos del servidor en el estado.
        } catch (error) {
            console.error('Error al cargar organizaciones:', error.message);
        }
    };

    // Función para enviar el fomulario de creación de organización.
    const enviarOrganizacion = async () => {
        try {
            const respuesta = await fetch('http://localhost:8000/organizaciones/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(organizacion),
            });
            if (!respuesta.ok) {
                throw new Error('Error al insertar la organización');
            } else {
                
                console.log('Organización creada exitosamente');
            }
        } catch (error) {
            console.error('Error al crear organización:', error.message);
        }
    };

    // Manejo la entrada del formulario de creación de organización
    const actualizarDatoOrganizacion = (e) => {
        const { name, value } = e.target;
        setOrganizacion(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Objeto que exporta los estados y las funciones necesarias.
    const contextValue = {
        enviarOrganizacion,
        actualizarDatoOrganizacion,
        organizacion,
        organizaciones,
        obtenerOrganizaciones,
        setOrganizacionSeleccionada,
        organizacionSeleccionada,
        colorOrga,
        setColorOrga,
    }

    // Se devuelve el proveedor del contexto (el componente que se va a ejectuar en App.jsx).
    return (
        <contextOrganizaciones.Provider value={contextValue}>
            {children}
        </contextOrganizaciones.Provider>
    );
};


// Se exporta el componente y el contexto.
export default ContextoOrganizaciones;
export { contextOrganizaciones };
