import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from "@faker-js/faker";

const Horizontalbar = () =>{

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
      const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Emaployee 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'gray',
            backgroundColor: '#0070ad',
          },
          {
            label: 'Emaployee 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'gray',
            backgroundColor: '#12abdb',
          },
        ],
      };

    return(
        <div>
          <Bar options={options} data={data} />
        </div>
    )
}

export default Horizontalbar;