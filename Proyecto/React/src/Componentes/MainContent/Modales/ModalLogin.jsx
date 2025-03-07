import "./modalLogin.css";
import React from "react";
import { Link } from "react-router-dom";

import useUsuarios from "../../Contextos/hooksContextos/useUsuarios.jsx";

const ModalLogin = () => {

    // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
    const { actualizarDatoLogIn, manejarInicioSesion, setMostrarIniciarSesion } = useUsuarios();

    // Pinta el formulario para iniciar sesión.
    return (
        <div className="IniciarSesion">
            <div className="formularioInicioSesion">
                <div
                    className="botonCerrarInicioSesion"
                    onClick={() => {

                        setMostrarIniciarSesion(false);
                    }}
                >
                    &times;
                </div>
                <h2>Iniciar sesión</h2>

                <form>
                    <label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            required
                            onChange={(e) => {
                                actualizarDatoLogIn(e);
                            }}
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            required
                            onChange={(e) => {
                                actualizarDatoLogIn(e);
                            }}
                        />
                    </label>
                    <br />
                    <div className="contenedorBotonesInicio">
                        <button
                            className="botonIniciar"
                            onClick={(e) => {
                                e.preventDefault(); // Prevenir el comportamiento por defecto aquí
                                manejarInicioSesion(e); // Asegurarse de pasar el evento
                                setMostrarIniciarSesion(false);
                            }}
                        >
                            Iniciar Sesión
                        </button>

                        <p className="avisoNoCuenta">
                            ¿No tienes una cuenta? Haz click aquí
                        </p>

                        <Link
                            className="botonCrearUser"
                            to="/FormularioCrearUser"
                            onClick={() => setMostrarIniciarSesion(false)}
                        >
                            Crear Usuario
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalLogin;