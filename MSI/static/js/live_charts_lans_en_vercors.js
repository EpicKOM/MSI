//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------

// setup
const temperatureData = {
    labels:[],
    datasets: [{
        label: 'Température',
        data:[],
        borderColor: 'rgba(250, 250, 250, 1)',
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(250, 250, 250, 1)',
        pointHoverBackgroundColor: 'rgba(250, 250, 250, 1)',
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

//------------------PRESSURE CHART--------------------------------------------------------------------------------------------

// setup
const pressureData = {
    labels:[],
    datasets: [{
        label: 'Pression',
        data:[],
        borderColor: 'rgba(224, 64, 251, 1)',
        backgroundColor: 'rgba(100, 31, 136, .2)',
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(224, 64, 251, 1)',
        pointHoverBackgroundColor: 'rgba(224, 64, 251, 1)',
    }]
};

// config
const pressureConfig = {
    type: 'line',
    data: pressureData,
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
                            return 'Pression : ' + context.parsed.y + ' hPa';
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

// Chart Init
let liveChart = new Chart(document.getElementById('liveChart'));
let dataName = "temperature";
let intervalDuration = 1;


//------------------LOGIQUE---------------------------------------------------------------------------------------------
$(document).ready(function(){
    // Select Action
    $('.chart-period-selector').click(function(e) {
        if (!$(this).hasClass('action-item-disabled')) {
            intervalDuration = $(this).data('value');
            ajaxRequest(dataName, intervalDuration);

            $('.chart-period-selector').removeClass('action-item-disabled');
            $('.chart-period-selector').find('i.fa-check').remove();
            $(this).append('<i class="fa-solid fa-check text-success"></i>');
            $(this).addClass('action-item-disabled');
            $('#chartPeriodSelectorTitle').text($(this).text());
        }
    });

    // Chart Data selector action
    $('.chart-data-selector').on('click', function() {
        if (!$(this).hasClass('action-item-disabled')) {
            $('.chart-data-selector').removeClass('bg-active-color border-active action-item-disabled');
            $(this).addClass('bg-active-color border-active action-item-disabled');

            dataName = $(this).data('value');

            ajaxRequest(dataName, intervalDuration);
        }
    });

    // Initial AJAX request
    ajaxRequest(dataName, 1);

    //  Refreshes the charts when the tab becomes active again (ChartJS issue ?)
    document.addEventListener("visibilitychange", event => {
        if (document.visibilityState === "visible") {
            liveChart.update();
        }
    });
});

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(_dataName, _intervalDuration) {
    $.ajax({
        type : 'POST',
        url : '/data/lans-en-vercors/live-charts',
        data : {'data_name': _dataName,
                'interval_duration': _intervalDuration},

        success:function(results)
        {
            // Recup data
            let data = results["live_charts"];

            //update chart config
            liveChart.destroy();
            let config = getChartConfig(_dataName);

            if (config) {
                liveChart = new Chart(document.getElementById('liveChart'), config);

                // update chart data
                updateLiveCharts(_dataName, data, _intervalDuration);

                // update chart title
                let chartTitle = getChartTitle(_dataName, _intervalDuration);
                $('#liveChartTitle').text(chartTitle);
            }

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
function updateLiveCharts(_dataName, _data, _interval_duration)
{
    const updateFunctions = {
        "wind_direction": () => {
            liveChart.data.datasets[0].data = _data["wind_direction"];
        },
        "wind": () => {
            liveChart.data.labels = _data["datetime"];
            liveChart.data.datasets[0].data = _data["wind"];
            liveChart.data.datasets[1].data = _data["gust"];
            liveChart.options.scales.x.ticks.stepSize = 2 * _interval_duration;
        },
        "rain": () => {
            liveChart.data.labels = _data["datetime"];
            liveChart.data.datasets[0].data = _data["rain_1h"];
            liveChart.options.scales.x.ticks.stepSize = 2 * _interval_duration;
        },
        "temperature": () => {
            liveChart.data.labels = _data["datetime"];
            liveChart.data.datasets[0].data = _data["temperature"];
            liveChart.data.datasets[1].data = _data["dew_point"];
            liveChart.options.scales.x.ticks.stepSize = 2 * _interval_duration;
        },
        "humidity": () => {
            liveChart.data.labels = _data["datetime"];
            liveChart.data.datasets[0].data = _data["humidity"];
            liveChart.options.scales.x.ticks.stepSize = 2 * _interval_duration;
        },
        "pressure": () => {
            liveChart.data.labels = _data["datetime"];
            liveChart.data.datasets[0].data = _data["pressure"];
            liveChart.options.scales.x.ticks.stepSize = 2 * _interval_duration;
        },
        "default": () => {
            liveChart.data.labels = _data["datetime"];
            liveChart.data.datasets[0].data = _data[dataName];
            liveChart.options.scales.x.ticks.stepSize = 2 * _interval_duration;
        }
    };

    (updateFunctions[_dataName] || updateFunctions["default"])();

    //Update charts
    liveChart.update();
}

function convertSelectResponseToDays(intervalDurationString) {
    const durations = {
        "24 heures": 1,
        "48 heures": 2,
        "72 heures": 3,
        "7 jours": 7
    };

    return durations[intervalDurationString] || 1;
}

function getChartConfig(_dataName) {
    const chartConfig = {
        "temperature": temperatureConfig,
        "rain": rainConfig,
        "wind": windConfig,
        "wind_direction": windDirectionConfig,
        "humidity": humidityConfig,
        "pressure": pressureConfig,
    };

    return chartConfig[_dataName] || null;
}

function getChartTitle(_dataName, _intervalDuration) {
    const dataNameTitle = {
        "temperature": "Température",
        "rain": "Pluie",
        "wind": "Vent",
        "wind_direction": "Rose des vents",
        "humidity": "Humidité",
        "pressure": "Pression",
    };

    const unity = {
        "temperature": "°C",
        "rain": "mm",
        "wind": "km/h",
        "wind_direction": "%",
        "humidity": "%",
        "pressure": "hPa",
    };

    const durationsTitle = {
        1: "24h",
        2: "48h",
        3: "72h",
        7: "7 jours"
    };

    return `${dataNameTitle[_dataName]} sur ${durationsTitle[_intervalDuration]} (${unity[_dataName]})` || "-";
}