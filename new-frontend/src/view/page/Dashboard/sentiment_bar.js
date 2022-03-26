/* eslint-disable no-loop-func */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DashboardServices from '../../../services/DashboardServices';
import { listColors } from '../../master/const';

const SentimentBar = () => {
  const [chartData, setChartData] = useState({});

  const fetchData = () => {
    DashboardServices.getCmsSentiment().then((res) => {
      // const stage1 = [];
      // const stage2 = [];
      // const stage3 = [];
      const data = res.results;

      console.log(res);
      //   const labels = ["CMS"];
      // for (let i = 0; i < res.length; i += 1) {
      //     if (labels.indexOf(res[i].sentimentsource) < 0) {
      //         labels.push(res[i].sentimentsource);
      //     }
      //     break;
      // }

      const datasets = data.map((e) => {
        switch (e.sentiment) {
          case 1:
            return {
              label: 'Positive',
              backgroundColor: listColors[0],
              data: [e.value],
            };
          case 0:
            return {
              label: 'Neutral',
              backgroundColor: listColors[1],
              data: [e.value],
            };
          case -1:
            return {
              label: 'Negative',
              backgroundColor: listColors[2],
              data: [e.value],
            };
          default:
            return null;
        }
      });
      setChartData({
        // labels,
        datasets,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            height: 800,
            padding: 7,
            legend: {
              display: true,
              position: 'right',
              labels: {
                boxWidth: 40,
                fontSize: 12,
              },
            },
            tooltips: {
              mode: 'index',
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    maxTicksLimit: 6,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: '#Num of items',
                    fontSize: 16,
                  },
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'CSM',
                    float: 'right',
                    fontSize: 16,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default SentimentBar;
