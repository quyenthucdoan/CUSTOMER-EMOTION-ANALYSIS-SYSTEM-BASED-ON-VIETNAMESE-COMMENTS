import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import DashboardServices from '../../../services/DashboardServices';
import { listColors } from '../../master/const';

const EmotionPie = () => {
  const [emotionStats, setEmotionStats] = useState({});

  useEffect(() => {
    // Fetch emotionStats
    DashboardServices.getEmotionStats().then((res) => {
      res = res.results;
      const labels = [];
      const data = [];
      for (let i = 0; i < res.length; i += 1) {
        labels.push(res[i].emotion);
        data.push(res[i].countemotion);
      }
      setEmotionStats({
        labels,
        datasets: [
          {
            data,
            borderWidth: 1,
            backgroundColor: listColors,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <div>
        <Doughnut
          data={emotionStats}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            height: 240,
            pieceLabel: {
              render(args) {
                return `${args.value.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })} (${args.percentage}%)`;
              },
              fontSize: 14,
              arc: true,
            },
            legend: {
              display: true,
              position: 'right',
              align: 'top',
              labels: {
                boxWidth: 40,
                fontSize: 12,
                fontColor: 'black',
              },
            },
            tooltips: {
              enabled: true,
              mode: 'nearest',
              callbacks: {
                label(tooltipItem, data) {
                  // eslint-disable-next-line prefer-destructuring
                  const index = tooltipItem.index;
                  const total = data.datasets[0].data[index];
                  const label = data.labels[index];
                  return `${label}: ${total.toLocaleString()}`;
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EmotionPie;
