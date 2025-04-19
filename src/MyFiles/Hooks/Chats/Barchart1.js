import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

const Barchart1 = () => {

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
      );

    const data = {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
          {
            label: '# of Votes',
            data: [2, 9, 3, 5, 2, 3],
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1,
          },
        ],
      };
   
    return (
        <div>
                <div className="container">
                   <Radar data={data} />
                </div>
        </div>
    );
};

export default Barchart1;
