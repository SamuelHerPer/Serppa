import React from 'react'
import "./Miembro.css";

const Miembro = ({ foto, nombre }) => {

  // Pinta el nombre y la foto de perfil de un miembro.
  return (
    <div id='Miembro'>
        <div className='FotoMiembro'>
            <img src={foto} alt="Foto del miembro" />
        </div>
        <div className='NombreMiembro'>
            <p>{nombre}</p>
        </div>
    </div>
  )
}

export default Miembro