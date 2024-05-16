//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------

let datetime_data = $('#current_temperature_chart').attr('values-x').split(',').slice(0, -1);
let temperature_data = $('#current_temperature_chart').attr('values-y').split(',').slice(0, -1).map(Number);
let dew_point_data = $('#current_temperature_chart').attr('values-z').split(',').slice(0, -1).map(Number);
console.log(datetime_data);
console.log(temperature_data);

// setup
const data = {
    labels: datetime_data,
    datasets: [{
        label: 'Température',
        data: temperature_data,
        borderColor: 'rgba(255, 26, 104, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(255, 53, 71, 1)',
        pointHoverBackgroundColor: 'rgba(255, 53, 71, 1)',
    },
    {
        label: 'Point de rosée',
        data: dew_point_data,
        borderColor: 'rgba(41, 247, 255, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(41, 247, 255, 1)',
        pointHoverBackgroundColor: 'rgba(41, 247, 255, 1)',
    }]
};

// config
const config = {
    type: 'line',
    data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(251, 251, 251, .6)',
                },
            },
            tooltip: {
                borderWidth: 1,
                borderColor: 'rgba(251, 251, 251, .3)',
                displayColors: false,
                callbacks:{
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return 'Température : ' + context.parsed.y.toFixed(1) + ' °C';
                        }
                        else if (context.datasetIndex === 1) {
                            return 'Point de rosée : ' + context.parsed.y.toFixed(1) + ' °C';
                        }

                    }
                },
            },
        },
        scales: {
            x:{
                type: 'time',
                time: {
                    unit: 'hour',
                    tooltipFormat: "dd'/'MM'/'yyyy 'à' HH':'mm",
                    displayFormats:
                    {
                        hour: "HH'h'",
                    },
                },

                ticks: {
                    stepSize: 2,
                    color: 'rgba(251, 251, 251, .5)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

            },
            y: {
                grid: {
                    color: 'rgba(251, 251, 251, .1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, .5)',
                },
            }
        }
    }
};

// render init block
const myChart = new Chart(
    document.getElementById('currentTemperatureChart'),
    config
);

//----------------Update Charts-----------------------------------------------------------------------------------------

function Update_Current_Charts(date, temperature, dew_point, interval_duration)
{
    //    Temperature chart
//    myChart.data.labels = date;
//    myChart.data.datasets[0].data = temperature;
//    myChart.data.datasets[1].data = dew_point;
    myChart.options.scales.x.ticks.stepSize = 2*interval_duration;
    myChart.update();
}

//----------------Ajax request------------------------------------------------------------------------------------------

$('#select_charts_duration').change(function() {
    let interval_duration_string = $(this).val();
    let interval_duration = convertSelectResponseToDays(interval_duration_string);

    //Ajax
    $.ajax({
        type : 'POST',
        url : '/data/saint-martin-d-heres/live-charts',
        data : {'interval_duration': interval_duration},

        success:function(results)
        {
            let datetime = results["live_charts"]["datetime"];
            let temperature = results["live_charts"]["temperature"];
            let dew_point = results["live_charts"]["dew_point"];

            console.log(datetime);
            console.log(temperature);

            Update_Current_Charts(datetime, temperature, dew_point, interval_duration);

        },

        error:function()
        {
            console.log("error");
        },

        complete:function()
        {
            console.log("oudine");
        },

    })
})

function convertSelectResponseToDays(interval_duration_string) {
    const durations = {
        "24 heures": 1,
        "48 heures": 2,
        "72 heures": 3,
        "1 semaine": 7
    };

    return durations[interval_duration_string] || 1;
}