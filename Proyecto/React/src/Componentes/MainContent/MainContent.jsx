import {Fragment} from 'react';
import "./mainContent.css";
import Footer from '../Footer/Footer.jsx';
import Contenido from '../Contenido/Contenido.jsx';
import Header from '../Header/Header.jsx';

const MainContent = () => {
  // Pinta la estructura principal de la página.
  return (
    <Fragment>
      <div className='contenedorMain'>
        <Header />
        <Contenido />
        <Footer />
      </div>
    </Fragment>
  )
}

export default MainContent