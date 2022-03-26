var loadTargetLine = function (data) {
    var chart = AmCharts.makeChart("chartSentimentTargetTrend", {
        "type": "serial",
        "theme": "light",
        "dataProvider": [{
          "category": "1",
          "positive": 2025,
          "negative": 1800,
          "neutral": 1800,
        }, {
          "category": "2",
          "positive": 1863,
          "negative": 1951,
          "neutral": 1100,
        }, {
          "category": "3",
          "positive": 1610,
          "negative": 950,
          "neutral": 3800,
        }, {
          "category": "4",
          "positive": 1732,
          "negative": 1250,
          "neutral": 2800,
        }, {
          "category": "5",
          "positive": 1123,
          "negative": 765,
          "neutral": 200,
        }, {
          "category": "6",
          "positive": 985,
          "negative": 841,
          "neutral": 1300,
        }, {
          "category": "7",
          "positive": 1400,
          "negative": 1300,
          "neutral": 2200,
        }],
        "valueAxes": [{
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
          "title": "Positive",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 10,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "positive",
          "lineColor":"#67B7DC"
        }, {
          "title": "Negative",
          "balloonText": "[[title]]: <b>[[value]]</b>",
          "bullet": "round",
          "bulletSize": 10,
          "bulletBorderColor": "#ffffff",
          "bulletBorderAlpha": 1,
          "bulletBorderThickness": 2,
          "valueField": "negative",
          "lineColor":"#EA5F5F"
        }
        , {
            "title": "Neutral",
            "balloonText": "[[title]]: <b>[[value]]</b>",
            "bullet": "round",
            "bulletSize": 10,
            "bulletBorderColor": "#ffffff",
            "bulletBorderAlpha": 1,
            "bulletBorderThickness": 2,
            "valueField": "neutral",
            "lineColor":"#FFA500"
          }],
        "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "category",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0
        },
        "legend": {}
      });
}
