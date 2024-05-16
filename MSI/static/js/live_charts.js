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

            test = ['2024-05-14 23:00:00', '2024-05-15 00:00:00', '2024-05-15 01:00:00', '2024-05-15 02:00:00', '2024-05-15 03:00:00', '2024-05-15 04:00:00', '2024-05-15 05:00:00', '2024-05-15 06:00:00', '2024-05-15 07:00:00', '2024-05-15 08:00:00', '2024-05-15 09:00:00', '2024-05-15 10:00:00', '2024-05-15 11:00:00', '2024-05-15 12:00:00', '2024-05-15 13:00:00', '2024-05-15 14:00:00', '2024-05-15 15:00:00', '2024-05-15 16:00:00', '2024-05-15 17:00:00', '2024-05-15 18:00:00', '2024-05-15 19:00:00', '2024-05-15 20:00:00', '2024-05-15 21:00:00', '2024-05-15 22:00:00', '2024-05-15 23:00:00', '2024-05-16 00:00:00', '2024-05-16 01:00:00', '2024-05-16 02:00:00', '2024-05-16 03:00:00', '2024-05-16 04:00:00', '2024-05-16 05:00:00', '2024-05-16 06:00:00', '2024-05-16 07:00:00', '2024-05-16 08:00:00', '2024-05-16 09:00:00', '2024-05-16 10:00:00', '2024-05-16 11:00:00', '2024-05-16 12:00:00', '2024-05-16 13:00:00', '2024-05-16 14:00:00', '2024-05-16 15:00:00', '2024-05-16 16:00:00', '2024-05-16 17:00:00', '2024-05-16 18:00:00', '2024-05-16 19:00:00', '2024-05-16 20:00:00', '2024-05-16 21:00:00', '2024-05-16 22:00:00', '2024-05-16 23:00:00'];

            console.log(datetime);
            console.log(temperature);

            myChart.data.labels = datetime;
            myChart.data.datasets[0].data = temperature;
            myChart.data.datasets[1].data = dew_point;
            myChart.options.scales.x.ticks.stepSize = 2 * interval_duration;
            myChart.update();

//            Update_Current_Charts(datetime, temperature, dew_point, interval_duration);

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