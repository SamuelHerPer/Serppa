import React, { useState, useEffect, createContext } from "react";


const contextUsuarios = createContext();  // Crea el contexto.

const ContextoUsuarios = ({ children }) => {

  // Se declaran los estados necesarios.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [datosLogin, setDatosLogin] = useState({
    email: '',
    password: ''
  });
  const [mostrarIniciarSesion, setMostrarIniciarSesion] = useState(false);
  const [menuPerfil, setMenuPerfil] = useState(false);
  const [informacion, setInformacion] = useState("");
  const [error, setError] = useState("");
  const [menuHamburguesa, setMenuHamburguesa] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    empresa: '',
    pais: '',
    ciudad: ''
  });

  // Función que verifica si hay una sesión activa.
  const verifySession = async () => {
    try {
      //Realiza una solicitud HTTP GET al servidor para verificar el token de sesión
      const response = await fetch('http://localhost:8000/verify-token', {
        credentials: 'include',  //Indica que las cookies, incluyendo las credenciales de sesión, deben ser enviadas con la solicitud
      });
      if (!response.ok) {
        throw new Error('Failed to fetch session status');
      }
      //Procesamos la respuesta para extraer el JSON que contiene el estado de la sesión
      const data = await response.json();
      //Actualiza el estado de sesión en la aplicación/cliente basado en la respuesta del servidor
      setIsLoggedIn(data.isLoggedIn);
    } catch (error) {
      console.error("Verification error:", error);
      setIsLoggedIn(false); //Asume que el usuario no está logueado si ocurre un error
    }
  };


  // Función para enviar el nuevo usuario a la API de FastAPI
  const enviarUsuario = async (formData) => {
    try {
      const respuesta = await fetch('http://localhost:8000/usuarios', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (!respuesta.ok) {
        throw new Error(`Error al insertar el usuario: ${respuesta.statusText}`);
      }
      const data = await respuesta.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Función que se encarga de iniciar sesión.
  const manejarInicioSesion = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosLogin),
        credentials: 'include', // Necesario para enviar/recibir cookies
      });
      if (!respuesta.ok) {
        throw new Error('Falló el inicio de sesión');
      }
      const result = await respuesta.json();
      setIsLoggedIn(true);  //Actualizar el estado de sesión a true para poder ocultar o mostrar elementos según sesión.
      setMostrarIniciarSesion(false);
    } catch (error) {
      alert('Error durante el inicio de sesión: ' + error.message);
    }
  };


  // Manejamos la entrada del formulario en el login.
  const actualizarDatoLogIn = (e) => {
    const { name, value } = e.target;
    setDatosLogin(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  // Funciona exactamente igual que login pero a la inversa.
  const cerrarSesion = async () => {
    try {
      const respuesta = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include', // Necesario para enviar/recibir cookies
      });
      if (!respuesta.ok) {
        throw new Error('Falló el cierre de sesión');
      }
      setIsLoggedIn(false);
      setMostrarIniciarSesion(false);
      setDatosLogin({
        email: '',
        password: ''
      });
    } catch (error) {
    }
  };

  // Función para obtener los datos del usuario que está en sesión.
  const obtenerDatosUsuario = async () => {
    try {
      const response = await fetch('http://localhost:8000/perfil-usuario', {
        method: 'GET',
        credentials: 'include', // Para enviar/recibir cookies
      });
      if (!response.ok) {
        throw new Error(`Error al obtener los datos del usuario: ${response.statusText}`);
      }
      const dataUsuario = await response.json();
      // Aquí puedes actualizar el estado con los datos del usuario
      setDatosUsuario(dataUsuario); // Almacena los datos del usuario en el estado
    } catch (error) {
    }
  };

  // Función para actualizar el perfil del usuario.
  const actualizarPerfilUsuario = async (usuarioId, formData) => {
    try {
        const response = await fetch(`http://localhost:8000/perfil-usuario/${usuarioId}`, {
            method: 'PUT',
            body: formData,
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        const result = await response.json();
        setInformacion('Perfil actualizado correctamente');
        obtenerDatosUsuario();
    } catch (error) {
        setError('Error updating profile: ' + error.message);
    }
};
  
  // Función para actualizar el estado que almacena los nuevos cambios del perfil.
  const actualizarDatosPerfil = (e) => {
    const { name, value } = e.target;
    setDatosFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Verifica si hay un usuario en sesión, en caso afirmativo se obtienen los datos de dicho usuario.
  useEffect(() => {
    verifySession().then(() => {
      if (isLoggedIn) {
        obtenerDatosUsuario().then(dataUsuario => {
        }).catch(error => {
        });
      }
    });
  }, [isLoggedIn]); // Le indicamos que se ejecute cada vez que isLoggedIn cambie de valor.

  // Función que muestra el menu de perfil al hacer clic en la foto de perfil.
  const mostrarMenuPerfil = () => {
    setMenuPerfil(true);
  };

  // Función que oculta el menu de perfil al hacer clic en la foto de perfil.
  const ocultarMenuPerfil = () => {
    setMenuPerfil(false);
  };

  // Función para vaciar el mensaje de información.
  const vaciarInformacion = () => {
    setInformacion("");
  };

  // Función para vaciar el mensaje de error.
  const vaciarError = () => {
    setError("");
  };

  // Función que muestra el menú hamburguesa al hacer clic en su icono.
  const mostrarMenuHamburguesa = () => {
    setMenuHamburguesa(true);
  };

  // Función que oculta el menú hamburguesa al hacer clic en su icono.
  const ocultarMenuHamburguesa = () => {
    setMenuHamburguesa(false);
  };

  // Función para manejar el cambio de imagen
  const cambiarImagen = (e) => {
    const file = e.target.files[0];  // Obtiene el archivo
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDatosUsuario({ ...datosUsuario, foto_perfil: imageUrl, fotoPerfilFile: file });
    }
};

  // Objeto que exporta los estados y las funciones necesarias.
  const contextValue = {
    enviarUsuario,
    manejarInicioSesion,
    cerrarSesion,
    actualizarDatoLogIn,
    obtenerDatosUsuario,
    datosUsuario,
    setDatosUsuario,
    isLoggedIn,
    mostrarIniciarSesion,
    setMostrarIniciarSesion,
    actualizarPerfilUsuario,
    menuPerfil,
    mostrarMenuPerfil,
    ocultarMenuPerfil,
    actualizarDatosPerfil,
    vaciarInformacion,
    datosFormulario,
    setDatosFormulario,
    vaciarError,
    informacion,
    error,
    cambiarImagen,
    menuHamburguesa,
    mostrarMenuHamburguesa,
    ocultarMenuHamburguesa
  };

  // Se devuelve el proveedor del contexto (el componente que se va a ejectuar en App.jsx).
  return (
    <contextUsuarios.Provider value={contextValue}>
      {children}
    </contextUsuarios.Provider>
  );
};

// Se exporta el componente y el contexto.
export default ContextoUsuarios;
export { contextUsuarios };