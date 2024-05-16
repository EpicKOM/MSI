//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------

let datetime_data = $('#current_temperature_chart').attr('values-x').split(',').slice(0, -1);
let temperature_data = $('#current_temperature_chart').attr('values-y').split(',').slice(0, -1).map(Number);

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
                            return 'Température : ' + context.parsed.y.toFixed(1) + ' °C';
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