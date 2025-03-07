import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../../Paginas/Inicio.jsx";
import Error from "../../Paginas/Error.jsx";
import CrearUsuario from "../../Paginas/CrearUsuario.jsx";
import Perfil from "../../Paginas/Perfil.jsx";
import CrearOrga from "../../Paginas/CrearOrga.jsx";
import Organizaciones from "../../Paginas/Organizaciones.jsx";
import PerfilProjects from "../../Paginas/PerfilProjects.jsx";
import PerfilOrga from "../../Paginas/PerfilOrga.jsx";
import Proyectos from "../../Paginas/Proyectos.jsx";
import CrearProyecto from "../../Paginas/CrearProyecto.jsx";
import Contacto from "../../Paginas/Contacto.jsx";


const Rutas = () => {
  // Indica que componente cargar dependiendo de la ruta.
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='*' element={<Error />} />
        <Route path='/Perfil' element={<Perfil />} />
        <Route path='/FormularioCrearUser' element={<CrearUsuario/>} /> 
        <Route path='/FormCrearOrga' element={<CrearOrga/>} /> 
        <Route path='/ListadoOrga' element={<Organizaciones/>} /> 
        <Route path='/DatosOrga' element={<PerfilOrga/>} /> 
        <Route path='/FormCrearProyecto' element={<CrearProyecto />} /> 
        <Route path='/ListadoProjects' element={<Proyectos/>} />
        <Route path='/DatosProjects' element={<PerfilProjects />} /> 
        <Route path='/Contacto' element={<Contacto />} /> 
      </Routes>
    </Fragment>
  );
};

export default Rutas;
