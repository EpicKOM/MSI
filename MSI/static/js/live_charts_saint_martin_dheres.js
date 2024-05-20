//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------

// setup
const temperatureData = {
    labels:[],
    datasets: [{
        label: 'Température',
        data:[],
        borderColor: 'rgba(255, 26, 104, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(255, 26, 104, 1)',
        pointHoverBackgroundColor: 'rgba(255, 26, 104, 1)',
    },
    {
        label: 'Point de rosée',
        data: [],
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
const temperatureConfig = {
    type: 'line',
    data: temperatureData,
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

//------------------WIND CHART------------------------------------------------------------------------------------------

// setup
const windData = {
    labels:[],
    datasets: [{
        label: 'Vent moyen',
        data:[],
        borderColor: 'rgba(89, 243, 166, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(89, 243, 166, 1)',
        pointHoverBackgroundColor: 'rgba(89, 243, 166, 1)',
    },
    {
        label: 'Rafales',
        data: [],
        borderColor: 'rgba(20, 164, 77, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(20, 164, 77, 1)',
        pointHoverBackgroundColor: 'rgba(20, 164, 77, 1)',
    }]
};

// config
const windConfig = {
    type: 'line',
    data: windData,
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
                            return 'Vent moyen : ' + context.parsed.y + ' km/h';
                        }
                        else if (context.datasetIndex === 1) {
                            return 'Rafales : ' + context.parsed.y.toFixed(1) + ' km/h';
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

//Chart Init
const temperatureChart = new Chart(document.getElementById('currentTemperatureChart'), temperatureConfig);
const windChart = new Chart(document.getElementById('currentWindChart'), windConfig);

//------------------LOGIQUE---------------------------------------------------------------------------------------------
$(document).ready(function(){

    $('#select_charts_duration').change(function() {
        let interval_duration_string = $(this).val();
        let interval_duration_chart_title = convertSelectResponseToChartTitle(interval_duration_string);
        let interval_duration = convertSelectResponseToDays(interval_duration_string);

        ajaxRequest(interval_duration, interval_duration_chart_title);
    });

    // Initial AJAX request
    ajaxRequest(1, "24h");

    document.addEventListener("visibilitychange", event => {
        if (document.visibilityState === "visible") {
            temperatureChart.update();
            windChart.update();
        }
    });
});

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(interval_duration, interval_duration_chart_title) {
    $.ajax({
        type : 'POST',
        url : '/data/saint-martin-d-heres/live-charts',
        data : {'interval_duration': interval_duration},

        success:function(results)
        {
            let datetime = results["live_charts"]["datetime"];
            let temperature = results["live_charts"]["temperature"];
            let dew_point = results["live_charts"]["dew_point"];
            let wind = results["live_charts"]["wind"];
            let gust = results["live_charts"]["gust"];

            updateLiveCharts(datetime, temperature, dew_point, wind, gust, interval_duration);

            $('#currentTemperatureChartTitle').text(`Température sur ${interval_duration_chart_title} (°C)`);
            $('#currentWindChartTitle').text(`Vent sur ${interval_duration_chart_title} (km/h)`);

            $('#live-charts-message-errors').remove();
            $("#live_charts_container").show();
        },

        error:function()
        {
            $('#live-charts-message-errors').remove();
            $("#live_charts_container").hide();
            $("#live_charts_container").before('<p class="text-danger mt-5 text-center lead" id="live-charts-message-errors"><i class="fa-solid fa-xmark me-2"></i>Erreur lors de la tentative de récupération des données. Veuillez réessayer plus tard.</p>');
        },

        complete:function()
        {

        },
    })
}

//----------------Update Charts-----------------------------------------------------------------------------------------
function updateLiveCharts(datetime, temperature, dew_point, wind, gust, interval_duration)
{
    //Temperature chart
    temperatureChart.data.labels = datetime;
    temperatureChart.data.datasets[0].data = temperature;
    temperatureChart.data.datasets[1].data = dew_point;
    temperatureChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Wind chart
    windChart.data.labels = datetime;
    windChart.data.datasets[0].data = wind;
    windChart.data.datasets[1].data = gust;
    windChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Update chart
    temperatureChart.update();
    windChart.update();
}

function convertSelectResponseToDays(interval_duration_string) {
    const durations = {
        "24 heures": 1,
        "48 heures": 2,
        "72 heures": 3,
        "7 jours": 7
    };

    return durations[interval_duration_string] || 1;
}

function convertSelectResponseToChartTitle(interval_duration_string) {
    const durations_title = {
        "24 heures": "24h",
        "48 heures": "48h",
        "72 heures": "72h",
        "7 jours": "7 jours"
    };

    return durations_title[interval_duration_string] || "24h";
}