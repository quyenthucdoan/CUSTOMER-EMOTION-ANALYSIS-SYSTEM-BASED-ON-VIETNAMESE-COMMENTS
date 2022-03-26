import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import DashboardServices from '../../../services/DashboardServices';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'impact',
  fontSizes: [40, 100],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: 'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
};

const WordcloudControl = () => {
  const [words, setWords] = useState([]);
  const fectData = () => {
    DashboardServices.getKeyword('keybert', 50).then((res) => {
      res = res.results;
      const wordList = [];
      for (let i = 0; i < res.length; i += 1) {
        const word = {
          text: res[i].keyword,
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

  return <ReactWordcloud options={options} words={words} />;
};

export default WordcloudControl;
