import React from 'react'
import { Link } from 'react-router-dom'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import "./TarjetaProyecto.css";
import Grafico from "../../../../assets/images/Grafico.png";
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import useProyectos from '../../../Contextos/hooksContextos/useProyectos';
import Barchart from '../../Graficas/Barchart';

const TarjetaProyecto = ({proyecto, color, volverA}) => {

    // Se extraen los estados y funciones necesarias del contexto utilizando el hook.
    const { setProyectoSeleccionado, setColorProyecto, setVolverA} = useProyectos();

    // Pinta el proyecto que le entra por props en una tarjeta.
  return (
    <div id='TarjetaProyecto'>
        <div id='InformacionProyecto'>
            <div id='NombreProyecto'>
                <Link to={`/DatosProjects`} className={color} onClick={() => {
                    setColorProyecto(color);
                    setProyectoSeleccionado(proyecto.id);
                    setVolverA(volverA);
                }}>
                    {proyecto.nombre_dominio}
                </Link>
            </div>
            <div id='Enlaces'>
                <div id='PrimeraFila'>
                    <ArticleRoundedIcon />
                    <LeaderboardRoundedIcon />
                    <TimelineRoundedIcon />
                    <LinkRoundedIcon />
                    <FolderRoundedIcon />
                </div>
            </div>
        </div>

        <div id='Resumen'>
            <div id='DatosResumen'>
                <div className='DatoResumen'>
                    <p>Tareas Pdtes: <span className='neutro'>999</span></p>
                    <p>Críticas: <span className='negativo'>999</span></p>
                </div>
                <div className='DatoResumen'>
                    <p>MoM: <span className='positivo'>+10,25%</span></p>
                    <p>YoY: <span className='negativo'>-2,25%</span></p>
                </div>
            </div>
            <div id='Grafico'>
                <Barchart />
            </div>
        </div>

    </div>
  )
}

export default TarjetaProyecto