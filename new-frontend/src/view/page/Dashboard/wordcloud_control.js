import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import DashboardServices from '../../../services/DashboardServices';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';


import WebFont from 'webfontloader';


const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: ['Helvetica'],//['UTM Impact.ttf'],//['vni-impact','bold'], //'/new-frontend/public/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf',//"Baloo-Regular.ttf",
  fontSizes: [25, 150],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
  alignItems: "center",
  justifyContent: "center",
  maxWords: 150,
  deterministic: false
};

const WordcloudControl = () => {
  const [words, setWords] = useState([]);
  const fectData = () => {
    DashboardServices.getKeyword('keybert', 50).then((res) => {
      res = res.results;
      const wordList = [];
      for (let i = 0; i < res.length; i += 1) {
        const word = {
          text: res[i].keyword.trim(),
          value: res[i].pseudo_freq,
        };

        wordList.push(word);
      }

      setWords(wordList);
    });
  };
  useEffect(() => {
    fectData();
  }, []);


  const w = [
    {
      text: 'quyên',
      value: 64,
    },
    {
      text: 'đêm đến',
      value: 11,
    },
    {
      text: 'lo lắng',
      value: 16,
    },
    {
      text: 'bị bệnh',
      value: 17,
    },
    {
      text: 'Hằng',
      value: 17,
    },
  ]

  return <ReactWordcloud options={options} words={words}  />;
};

export default WordcloudControl;
