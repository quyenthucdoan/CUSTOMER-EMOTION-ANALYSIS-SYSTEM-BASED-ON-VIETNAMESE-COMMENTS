var loadSentimentPie = function (data) {
  var chart = AmCharts.makeChart("m_sentiment_pie", {
    "type": "pie",
    "startAngle": 0,
    "radius": "90%",
    "innerRadius": "40%",
    "pullOutRadius": 0,
    "pieY": "95%",
    "theme": "light",
    "alphaField": "alpha",
    "dataProvider": [
     
      {
        "type": data[0].type,
        "value": data[0].value,
        "color": "#67B7DC"
      }, {
        "type": data[1].type,
        "value": data[1].value,
        "color": "#EA5F5F"
      }, {
        "type": data[2].type,
        "value": data[2].value,
        "color": "#FFA500"
      },
      {
        "value": data[0].value + data[1].value + data[2].value,
        "alpha": 0,
      }],
    "valueField": "value",
    "titleField": "type",
    "balloon": {
      "fixedPosition": false
    },
    "export": {
      "enabled": false
    },
    "labelRadius": -20,
    "labelText": "[[percents]]%",
    "colorField": "color",
    "labelColorField": "color",
  });
};