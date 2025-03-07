import React from 'react';
import useOrganizaciones from '../../Contextos/hooksContextos/useOrganizaciones.jsx';
import "./FormCrearOrga.css";

const FormCrearOrga = () => {

    // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
    const { enviarOrganizacion, actualizarDatoOrganizacion } = useOrganizaciones();

    // Función para crear la nueva organización.
    const manejarCrearOrganizacion = (e) => {
        e.preventDefault();
        enviarOrganizacion();
    }

    // Pinta el formulario para crear una nueva organización.
    return (
        <div id="ContenedorPrincipalCrearOrganizacion">
            <div id="ContenedorFormularioCrearOrganizacion">
                <h2>Crea tu organización</h2>
                <form className="grupoFormulario">
                    <label>
                        <input type="text" name="nombre" placeholder="Nombre de la organización" onChange={actualizarDatoOrganizacion} />
                    </label>
                    <br />
                    <label>
                        <input type="email" name="email_empresa" placeholder="Email de la empresa" onChange={actualizarDatoOrganizacion} />
                    </label>
                    <br />
                    <label>
                        <input type="text" name="razon_social" placeholder="Razón Social" onChange={actualizarDatoOrganizacion} />
                    </label>
                    <br />
                    <label>
                        <input type="text" name="direccion_fiscal" placeholder="Dirección Fiscal" onChange={actualizarDatoOrganizacion} />
                    </label>
                    <br />
                    <button className="botonCrearOrganizacion" type="submit" onClick={manejarCrearOrganizacion}>
                        Crear Organización
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormCrearOrga;
