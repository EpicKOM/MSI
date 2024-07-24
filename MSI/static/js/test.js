//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------

// setup
const temperatureData = {
    labels:[],
    datasets: [{
        label: 'Température',
        data:[],
        borderColor: 'rgba(250, 250, 250, 1)',
        backgroundColor: 'rgba(224, 224, 224, .2)',
        fill: true,
        tension: 0,
        borderWidth: 2,
        pointStyle: 'circle',
        pointBorderColor: 'rgba(0, 0, 0, 0)',
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
        pointHoverBorderColor: 'rgba(250, 250, 250, 1)',
        pointHoverBackgroundColor: 'rgba(250, 250, 250, 1)',
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

//Chart Init
let currentChart = new Chart(document.getElementById('currentChart'));


//------------------LOGIQUE---------------------------------------------------------------------------------------------
$(document).ready(function(){
//    $('#select_charts_duration').change(function() {
//        let interval_duration_string = $(this).val();
//        let interval_duration_chart_title = convertSelectResponseToChartTitle(interval_duration_string);
//        let interval_duration = convertSelectResponseToDays(interval_duration_string);
//
//        ajaxRequest(interval_duration, interval_duration_chart_title);
//    });

    $('.chart-data-selector').on('click', function() {
        $('.chart-data-selector').removeClass('bg-active-color border-active');
        $(this).addClass('bg-active-color border-active');
        let dataName = $(this).data('value');
        ajaxRequest(1, dataName, "24h");
    });

    // Initial AJAX request
    ajaxRequest(1, "temperature", "24h");

    //  Refreshes the charts when the tab becomes active again (ChartJS issue ?)
    document.addEventListener("visibilitychange", event => {
        if (document.visibilityState === "visible") {
            currentChart.update();
        }
    });
});

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(interval_duration, dataName, interval_duration_chart_title) {
    $.ajax({
        type : 'POST',
        url : '/data/saint-ismier/live-charts',
        data : {'interval_duration': interval_duration},

        success:function(results)
        {
            let datetime = results["live_charts"]["datetime"];
            let data = results["live_charts"][dataName];

            currentChart.destroy();
            if (dataName === "temperature"){
                currentChart = new Chart(document.getElementById('currentChart'), temperatureConfig);
            }

            else if (dataName === "pressure"){
                currentChart = new Chart(document.getElementById('currentChart'), pressureConfig);
            }


            updateLiveCharts(datetime, data, interval_duration);

            $('#currentChartTitle').text(`Température sur ${interval_duration_chart_title} (°C)`);

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
function updateLiveCharts(datetime, data, interval_duration)
{
    //Temperature chart
    currentChart.data.labels = datetime;
    currentChart.data.datasets[0].data = data;
    currentChart.options.scales.x.ticks.stepSize = 2 * interval_duration;

    //Update charts
    currentChart.update();
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