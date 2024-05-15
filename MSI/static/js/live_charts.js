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
            borderColor: 'rgba(255, 53, 71, .8)',

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
        scales:
        {
            x:
            [{
                type: 'time',
                time:
                {
                    unit: 'hour',
                    displayFormats:
                    {
                        hour: 'HH[h]',
                    }
                },
            }],
        },
    }
});