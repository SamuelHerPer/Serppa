import { Fragment } from 'react'
import { BrowserRouter } from "react-router-dom";
import './App.css'
import ContextoUsuarios from './Componentes/Contextos/ContextoUsuarios'
import MainContent from "./Componentes/MainContent/MainContent.jsx"
import Nav from './Componentes/Nav/Nav.jsx';
import ContextoOrganizaciones from './Componentes/Contextos/ContextoOrganizaciones.jsx';
import ContextoProyectos from './Componentes/Contextos/ContextoProyectos.jsx';

function App() {
  /**
   * Instalar iconos: npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
   * Buscar iconos: https://mui.com/material-ui/material-icons/
   */

  // Esta es la estructura principal de la página
  return (
    <Fragment>
      <BrowserRouter>
        <ContextoUsuarios>
          <ContextoOrganizaciones>
            <ContextoProyectos>
              <Nav />
              <MainContent />
            </ContextoProyectos>
          </ContextoOrganizaciones>
        </ContextoUsuarios>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
