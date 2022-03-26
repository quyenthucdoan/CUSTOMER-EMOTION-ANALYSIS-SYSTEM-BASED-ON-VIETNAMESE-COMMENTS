
var loadSentimentArea = function (data) {
    var chart = AmCharts.makeChart("chartSentimentArea", {
        "type": "serial",
        "theme": "light",
        "marginRight":30,
        "legend": {
            "equalWidths": false,
            "periodValueText": "[[value.sum]]",
            "position": "top",
            "valueAlign": "left",
            "valueWidth": 100,
           "useMarkerColorForLabels": true,
           "useMarkerColorForValues": true
        },
        "dataProvider": data,
        "graphs": [{
            "balloonText": "<span class='big-icon margin-bottom-10'><i class='fa fa-smile-o positive'></i> </span><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            "fillAlphas":  0.6,
            "hidden": false,
            "title": "Positive",
            "valueField": "Positive",
            "fillColors":"#67B7DC"
        }, {
            "balloonText": "<span class='big-icon margin-bottom-10'><i class='fa fa-frown-o negative'></i> </span><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            "fillAlphas":  0.6,
            "title": "Negative",
            "valueField": "Negative",
            "fillColors":"#EA5F5F"
        }, {
            "balloonText": "<span class='big-icon'  style='vertical-align:top;'><i class='fa fa-meh-o neutral'></i> </span><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            "fillAlphas": 0.6,
            "title": "Neutral",
            "valueField": "Neutral",
            "fillColors":"#FFA500"
        }],
        "plotAreaBorderAlpha": 0,
        "marginTop": 10,
        "marginLeft": 0,
        "marginBottom": 0,
        "chartScrollbar": {},
        "chartCursor": {
            "cursorAlpha": 0
        },
        "valueAxes": [{
            "stackType": "regular",
            "gridAlpha": 0.07,
            "position": "left",
           
        }],
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "startOnAxis": true,
            "axisColor": "#DADADA",
            "gridAlpha": 0.07,
            "title": "Date",
            "guides": [ {
                category: "2007",
                lineColor: "#CC0000",
                lineAlpha: 1,
                dashLength: 2,
                inside: true,
                labelRotation: 90,
                label: "Sentiment hot line"
            }]
        },
        "export": {
            "enabled": false
         }
    });

    chart.zoomToIndexes(data.length - 150, data.length );
}


