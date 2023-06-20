import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';


import WebFont from 'webfontloader';

const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'Helvetica' ,//['Helvetica','Sans-serif'], //'vni-impact', //'/new-frontend/public/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf',
  fontSizes: [36, 120],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 5,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: ['linear','log','sqrt'],//'sqrt',
  spiral: 'archimedean',
  transitionDuration: 1000,
  // alignItems: "center",
  // justifyContent: "center",
  // maxWords: 15

};
 
const size = [400, 300];
const WordcloudControl = props => {
  // console.log("props.words" , props.word)
  return <ReactWordcloud options={options} words={props.word}  />

};

export default WordcloudControl;
