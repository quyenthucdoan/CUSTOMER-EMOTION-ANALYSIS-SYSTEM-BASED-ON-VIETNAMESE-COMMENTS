window.chartColors = ['rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'];
var loadTargetChart = function(data){
    let dataValueArray = [];
    let backgroundColorArray = [];
    let labelArray = [];
    backgroundColorArray.push(window.chartColors);
    data.forEach(function (element) {
        dataValueArray.push(element.value);
        labelArray.push(element.category);
    });

    let config = {
        type: 'doughnut',

        data: {
            datasets: [{
                data: dataValueArray,
                backgroundColor: window.chartColors,
                label: 'Chart by target'
            }],
            labels: labelArray
        },
        options: {
            responsive: false,
            legend: {
                display: true,
                position: 'bottom'
            }
        }
    };

    let ctx = document.getElementById("chart-by-target").getContext("2d");
    let myNewChart = new Chart(ctx, config);

    $("#chart-by-target").click(
        function(evt){
            var activePoints = myNewChart.getElementsAtEvent(evt);
            if (activePoints[0]) {
                let category = activePoints[0]._chart.config.data.labels[activePoints[0]._index];

                fetchSubCategories(category);
            }
        }
    );
    fetchSubCategories(data[0].category);
};

function fetchSubCategories(category) {
    $('#bar-chart-horizontal').remove(); // this is my <canvas> element
    $('#target-chart-container').append('<canvas id="bar-chart-horizontal" width="100%" ><canvas>');
    $.ajax({
        url: "http://localhost:5000/tweets/market/sub-categories?category=" + category,
        context: document.body,
        success: function(response){
            let data = response.data;
            loadTargetBar(data);
        }
    });
}

var loadTargetBar = function(data) {
    let dataValueArray = [];
    let backgroundColorArray =window.chartColors;
    let labelArray = [];
    data.forEach(function (element) {
        dataValueArray.push(element.value);
        labelArray.push(element.sub_category);
        //backgroundColorArray.push(getRandomColor());
    });
    let config = {
        type: 'horizontalBar',
        
        data: {
            labels: labelArray,
            datasets: [
                {
                    label: "Tweets",
                    backgroundColor: backgroundColorArray,
                    data: dataValueArray
                }
            ]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{
                    barThickness: 30,
                }]},
            title: {
                display: true,
                text: 'Tweets by target'
            }
        }
    };
    let canvas = document.getElementById("bar-chart-horizontal")
    let ctx = canvas.getContext("2d");
    let myNewBar = new Chart(ctx, config);
}

function getRandomColor() {
    
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


    
