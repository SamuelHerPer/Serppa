import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Barchart = () => {
    // Definimos los datos a pintar.
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Visitas',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(242, 190, 16, 0.2)',
            borderColor: 'rgba(242, 190, 16, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      // Definimos en las opciones que empiece desde 0.
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      // Devolvemos la gráfica pintada.
  return (
    <Bar data={data} options={options} />
  )
}

export default Barchart