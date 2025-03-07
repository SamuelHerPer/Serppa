import React from 'react'
import FormularioCrearUser from "../Componentes/MainContent/ComponentesUsuarios/FormularioCrearUser.jsx"

const CrearUsuario = () => {

  //Página que muestra el div que contiene el formulario para crear un nuevo usuario (Registrarse).
  return (
    <div>
        <FormularioCrearUser/>  {/* Llama al componente que contiene el formulario para crear el usuario. */}
    </div>
  )
}

export default CrearUsuario;