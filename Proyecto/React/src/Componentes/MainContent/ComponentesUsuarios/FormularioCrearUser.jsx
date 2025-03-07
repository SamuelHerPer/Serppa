import React, { useRef } from 'react';
import useUsuarios from "../../Contextos/hooksContextos/useUsuarios.jsx"
import "./formularioCrearUser.css"

const FormularioCrearUser = () => {

    // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
    const { enviarUsuario, isLoggedIn } = useUsuarios();

    // Se declaran los estados necesario en ámbito local.
    const formRef = useRef(null);

    // Función para crear un nuevo usuario.
    const manejarCrearCuenta = async (e) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        try {
            await enviarUsuario(formData);
            console.log('Formulario enviado y procesado');
        } catch (error) {
            console.error('Error al enviar el formulario:', error.message);
        }
    };

    // Si hay un usuario en sesión le informa de que ya ha iniciado sesión si no, muestra el formulario para crear un nuevo usuario.
    return (
        <>
            {isLoggedIn ? (
                <h1>¡Ya has iniciado sesión!</h1>
            ) : (
                <div className="contenedorPrincipalCrear">
                    <div className="contenedorFormularioCrea">
                        <h2>Crea tu usuario</h2>
                        <form ref={formRef} className="grupoFormulario" onSubmit={manejarCrearCuenta}>
                            <label>
                                <input type="text" name="nombre" placeholder="Nombre completo" />
                            </label>

                            <label>
                                <input type="email" name="email" placeholder="Correo electrónico" />
                            </label>

                            <label>
                                <input type="password" name="password" placeholder="Contraseña" />
                            </label>


                            <button type="submit" className='botonCrearCuenta'>Crear cuenta</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormularioCrearUser;