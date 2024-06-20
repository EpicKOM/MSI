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

//------------------RAIN CHART------------------------------------------------------------------------------------------

// setup
const rainData = {
    labels:[],
    datasets: [{
        label: 'Pluie',
        data:[],
        borderColor: 'rgba(74, 171, 237, 1)',
        backgroundColor: 'rgba(74, 171, 237, .2)',
        borderWidth: 2,
        borderRadius: 4,
    }]
};

// config
const rainConfig = {
    type: 'bar',
    data: rainData,
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
                            return 'Pluie sur 1h : ' + context.parsed.y.toFixed(1) + ' mm';
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
}

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

//------------------WIND DIRECTION CHART--------------------------------------------------------------------------------

// setup
const windDirectionData = {
    labels: ['N',
            'NNE',
            'NE',
            'ENE',
            'E',
            'ESE',
            'SE',
            'SSE',
            'S',
            'SSO',
            'SO',
            'OSO',
            'O',
            'ONO',
            'NO',
            'NNO'],
    datasets: [
    {
        label: 'Rose des vents',
        data: [],
        borderColor: 'rgba(29, 233, 182, 1)',
        backgroundColor: 'rgba(29, 233, 182, .3)',
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(29, 233, 182, 1)',
        pointBackgroundColor: 'rgba(29, 233, 182, 1)',
        pointHoverBorderColor: 'rgba(29, 233, 182, 1)',
        pointHoverBackgroundColor: 'rgba(29, 233, 182, 1)',
    }]
};

const windDirectionConfig = {
    type: 'radar',
    data: windDirectionData,
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
                            return context.parsed.r.toFixed(1) + ' %';
                        }
                    }
                },
            },
        },
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(251, 251, 251, .7)',
                },

                grid: {
                    color: 'rgba(251, 251, 251, .4)',
                },

                pointLabels: {
                    color: 'rgba(255, 255, 255, 1)',
                },

                ticks: {
                    color: 'rgba(251, 251, 251, 1)',
                    backdropColor: 'rgba(0, 0, 0, 0)',
                },
            }
        },
    },
};

//------------------Humidity CHART-----------------------------------------------------------------------------------

// setup
const humidityData = {
    labels:[],
    datasets: [{
        label: 'Humidité',
        data:[],
        borderColor: 'rgba(84, 179, 211, 1)',
        backgroundColor: 'rgba(26, 35, 126, .2)',
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(84, 179, 211, 1)',
        pointHoverBackgroundColor: 'rgba(84, 179, 211, 1)',
    }]
};

// config
const humidityConfig = {
    type: 'line',
    data: humidityData,
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
                            return 'Humidité : ' + context.parsed.y + ' %';
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
}

//------------------UV CHART--------------------------------------------------------------------------------------------

// setup
const uvData = {
    labels:[],
    datasets: [{
        label: 'Radiations',
        data:[],
        borderColor: 'rgba(255, 193, 7, 1)',
        backgroundColor: 'rgba(230, 81, 0, .2)',
        borderWidth: 2,
        borderRadius: 4,
    }]
};

// config
const uvConfig = {
    type: 'bar',
    data: uvData,
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
                            return 'Radiations : ' + context.parsed.y + ' W/m²';
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
}

//Chart Init
const temperatureChart = new Chart(document.getElementById('currentTemperatureChart'), temperatureConfig);
const temperatureChartModal = new Chart(document.getElementById('currentTemperatureChartModal'), temperatureConfig);
const rainChart = new Chart(document.getElementById('currentRainChart'), rainConfig);
const rainChartModal = new Chart(document.getElementById('currentRainChartModal'), rainConfig);
const windChart = new Chart(document.getElementById('currentWindChart'), windConfig);
const windChartModal = new Chart(document.getElementById('currentWindChartModal'), windConfig);
const windDirectionChart = new Chart(document.getElementById('currentWindDirectionChart'), windDirectionConfig);
const windDirectionChartModal = new Chart(document.getElementById('currentWindDirectionChartModal'), windDirectionConfig);
const humidityChart = new Chart(document.getElementById('currentHumidityChart'), humidityConfig);
const humidityChartModal = new Chart(document.getElementById('currentHumidityChartModal'), humidityConfig);
const uvChart = new Chart(document.getElementById('currentUvChart'), uvConfig);
const uvChartModal = new Chart(document.getElementById('currentUvChartModal'), uvConfig);

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

    //  Refreshes the charts when the tab becomes active again (ChartJS issue ?)
    document.addEventListener("visibilitychange", event => {
        if (document.visibilityState === "visible") {
            temperatureChart.update();
            rainChart.update();
            windChart.update();
            humidityChart.update();
            uvChart.update();
            windDirectionChart.update();
        }
    });

    updateAndResizeChartModal('#temperatureModal', temperatureChartModal);
    updateAndResizeChartModal('#rainModal', rainChartModal);
    updateAndResizeChartModal('#humidityModal', humidityChartModal);
    updateAndResizeChartModal('#uvModal', uvChartModal);
    updateAndResizeChartModal('#windModal', windChartModal);
    updateAndResizeChartModal('#windDirectionModal', windDirectionChartModal);
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
            let humidity = results["live_charts"]["humidity"];
            let uv = results["live_charts"]["uv"];
            let rain = results["live_charts"]["rain"];
            let rain_datetime = results["live_charts"]["rain_datetime"];
            let wind_direction = results["live_charts"]["wind_direction"];

            updateLiveCharts(datetime, temperature, dew_point, wind, gust, humidity, uv, rain, rain_datetime,
            wind_direction, interval_duration);

            $('#currentTemperatureChartTitle').text(`Température sur ${interval_duration_chart_title} (°C)`);
            $('#currentTemperatureChartModalTitle').text(`Température sur ${interval_duration_chart_title} (°C)`);
            $('#currentWindChartTitle').text(`Vent sur ${interval_duration_chart_title} (km/h)`);
            $('#currentWindChartModalTitle').text(`Vent sur ${interval_duration_chart_title} (km/h)`);
            $('#currentHumidityChartTitle').text(`Humidité sur ${interval_duration_chart_title} (%)`);
            $('#currentHumidityChartModalTitle').text(`Humidité sur ${interval_duration_chart_title} (%)`);
            $('#currentUvChartTitle').text(`Radiations sur ${interval_duration_chart_title} (W/m²)`);
            $('#currentUvChartModalTitle').text(`Radiations sur ${interval_duration_chart_title} (W/m²)`);
            $('#currentRainChartTitle').text(`Pluie sur ${interval_duration_chart_title} (mm)`);
            $('#currentRainChartModalTitle').text(`Pluie sur ${interval_duration_chart_title} (mm)`);
            $('#currentWindDirectionChartTitle').text(`Rose des vents sur ${interval_duration_chart_title} (%)`);
            $('#currentWindDirectionChartModalTitle').text(`Rose des vents sur ${interval_duration_chart_title} (%)`);

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
function updateLiveCharts(datetime, temperature, dew_point, wind, gust, humidity, uv, rain, rain_datetime, wind_direction, interval_duration)
{
    //Temperature chart
    temperatureChart.data.labels = datetime;
    temperatureChart.data.datasets[0].data = temperature;
    temperatureChart.data.datasets[1].data = dew_point;
    temperatureChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Rain Chart
    rainChart.data.labels = rain_datetime;
    rainChart.data.datasets[0].data = rain;
    rainChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Wind chart
    windChart.data.labels = datetime;
    windChart.data.datasets[0].data = wind;
    windChart.data.datasets[1].data = gust;
    windChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Humidity chart
    humidityChart.data.labels = datetime;
    humidityChart.data.datasets[0].data = humidity;
    humidityChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //UV chart
    uvChart.data.labels = datetime;
    uvChart.data.datasets[0].data = uv;
    uvChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Wind Direction Chart
    windDirectionChart.data.datasets[0].data = wind_direction;

    //Update charts
    temperatureChart.update();
    rainChart.update();
    windChart.update();
    humidityChart.update();
    uvChart.update();
    windDirectionChart.update();
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

function updateAndResizeChartModal(modalId, chartModal) {
    $(modalId).on('shown.bs.modal', function (e) {
        chartModal.update();
        chartModal.resize();
    });
}