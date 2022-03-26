import React, { useState, useEffect } from "react";
import CsmServices from "../../../services/CsmServices";
import { listColors } from "../../master/const";
// import { chartColors } from "./colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend}from 'chart.js';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SentimentPie = () => {
// function SentimentPie(){
  const [tweetSentiment, setTweetSentiment] = useState({});

  const labelSentimentValue = (value) => {
    if (value === 1) {
      return "Positive";
    } else if (value === -1) {
      return "Negative";
    }
    return "Neutral";
  };

  useEffect(() => {
    // Fetch tweet sentiment
    const labels = [];
    const datas = [];
    CsmServices.getSentimentSummary().then((res) => {
      res = res.results;
      for (let i = 0; i < res.length; i += 1) {
        labels.push(labelSentimentValue(res[i].sentiment));
        datas.push(res[i].value);
      }
      setTweetSentiment({
        labels,
        datas      
      });
    });
  }, []);

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    height: 240, 
    pieceLabel: {
      render(args) {
        return `${args.value.toLocaleString(navigator.language, {
          minimumFractionDigits: 0
        })} (${args.percentage}%)`;
      },
      fontSize: 14,
      arc: true,
    },
    legend: {
      display: true,
      position: "right",
      align: "top",
      labels: {
        boxWidth: 40,
        fontSize: 12,
        fontColor: "black",
      },
    },
    tooltips: {
      enabled: true,
      mode: "index",
      callbacks: {
        label(tooltipItem, data) {
          // eslint-disable-next-line prefer-destructuring
          const index = tooltipItem.index;
          const total = data.datasets[0].data[index];
          const label = data.labels[index];
          return `${label}: ${total.toLocaleString()}`;
        },
        // afterLabel(tooltipItem, data) {
        //   const index = tooltipItem.index;
        //   const total = data.datasets[0].data[index];
        //   const label = data.labels[index];
        //   var percent = Math.round(( label / total) * 100)
        //   return `'(' + ${percent} + '%)'`;
        // }
      },
    },
  }
 
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      height: 500,
      legend: {
        display: true,
        position: 'right',
        // align: "center",
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
      // pieceLabel: {
      //   render(args) {
      //     return `${args.value.toLocaleString(navigator.language, {
      //       minimumFractionDigits: 0
      //     })} (${args.percentage}%)`;
      //   },
      //   fontSize: 14,
      //   arc: true,
      // },
      // tooltips: {
      //   enabled: true,
      //   mode: "nearest",
      //   callbacks: {
      //     label(tooltipItem, data) {
      //       // eslint-disable-next-line prefer-destructuring
      //       const index = tooltipItem.index;
      //       const total = data.datasets[0].data[index];
      //       const label = data.labels[index];
      //       return `${label}: ${total.toLocaleString()}`;
      //     },
      //     // afterLabel(tooltipItem, data) {
      //     //   const index = tooltipItem.index;
      //     //   const total = data.datasets[0].data[index];
      //     //   const label = data.labels[index];
      //     //   var percent = Math.round(( label / total) * 100)
      //     //   return `'(' + ${percent} + '%)'`;
      //     // }
      //   },
      // },
    },
  };
  const data = {
    labels: tweetSentiment.labels, //['aa', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: tweetSentiment.datas, //[ 3162, 4974, 7163], 
        backgroundColor: listColors,
        borderColor: listColors,
        borderWidth: 1,
      },
    ], 
  };

  
  return (
    <div class = "d-inline-block max-height: 100%">
        <Doughnut 
          type='doughnut'
          options={options} 
          data={data} 
          // height={600}
           /> 
    </div>
  );
};

// className="h-100 d-inline-block"

export default SentimentPie;
