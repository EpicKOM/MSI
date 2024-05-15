//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------

let datetime_data = $('#current_temperature_chart').attr('values-x').split(',').slice(0, -1);
let temperature_data = $('#current_temperature_chart').attr('values-y').split(',').slice(0, -1).map(Number);

var temperature_canvas = document.getElementById("currentTemperatureChart").getContext('2d');
var temperature_chart = new Chart(temperature_canvas,
{
    type: 'line',
    data:
    {
        labels: datetime_data,
        datasets:
        [{
            data: temperature_data,
            backgroundColor:
            [
                'rgba(105, 0, 132, .2)',
            ],
            borderColor:
            [
                'rgba(255, 53, 71, .8)',
            ],
            tension: 0,
            borderWidth: 2,
            pointStyle: 'circle',
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(255, 53, 71, 1)',
            pointHoverBackgroundColor: 'rgba(255, 53, 71, 1)',
        }]
    },
    options:
    {
        tooltips:
        {
            displayColors: false,
            callbacks:
            {
                label: function(tooltipItems, data) {
                        return 'Température : ' + tooltipItems.yLabel + ' °C';
                        }
            },
        },

        legend:
        {
            display: false,
        },
        scales:
        {
            xAxes:
            [{
                ticks:
                {
                    fontColor: '#e2e2e2',
                    fontFamily: 'Roboto',
                },
                type: 'time',
                time:
                {
                    unit: 'hour',
                    unitStepSize: 1,
                    tooltipFormat:'DD/MM/YYYY à HH:mm',
                    displayFormats:
                    {
                        hour: 'HH[H]',
                    }
                },
                gridLines:
                {
                    color: 'rgba(255,255,255,.4)',
                    lineWidth: .3,
                },
            }],
            yAxes:
            [{
               ticks:
                {
                    fontColor: '#e2e2e2',
                    fontFamily: 'Roboto',
                },
                gridLines:
                {
                    color: 'rgba(255,255,255,.4)',
                    lineWidth: .3,
                },
            }]
        },
    }
});