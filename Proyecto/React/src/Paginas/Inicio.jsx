import React from "react";
import "./inicio.css"
import useUsuarios from "../Componentes/Contextos/hooksContextos/useUsuarios.jsx"
import Dashboard from "../Componentes/MainContent/ComponentesInicio/Dashboard.jsx";

const Inicio = () => {
  const { isLoggedIn, datosUsuario } = useUsuarios(); //Extrae los estados del contexto de usuarios.

  //Muestra la página que contiene los elementos que apareceran en el inicio dependiendo de si hay un usuario en la sesión o no.
  return (
    <div className="contenedorInicio">
      <div className="bloqueInfoInicio" >
        {isLoggedIn && datosUsuario ? (
          <>
            <section>
              <h1>¡Bienvenido a Serppa! La mejor página de gestión de proyectos del mundo.</h1>
            </section>
            <Dashboard /> {/* Llama al componente Dashboard. */}
          </>
        ) : (
          <section className="InicioCrearSesion">
            <h2>Gestiona tus proyectos de la mejor manera</h2>
          </section>
        )}
      </div>
    </div>

  );
};

export default Inicio;