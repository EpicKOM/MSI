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
        pointHoverBorderColor: 'rgba(255, 53, 71, 1)',
        pointHoverBackgroundColor: 'rgba(255, 53, 71, 1)',
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

//Chart Init
const temperatureChart = new Chart(document.getElementById('currentTemperatureChart'), temperatureConfig);

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

            updateLiveCharts(datetime, temperature, dew_point, interval_duration);

            $('#currentTemperatureChartTitle').text(`Température sur ${interval_duration_chart_title} (°C)`);
        },

        error:function()
        {
            console.log("error");
            $("#live_charts_container").before('<p class="text-danger mt-5 text-center lead" id="monthly_climatologie-message-errors">Erreur lors de la tentative de récupération des données. Veuillez réessayer plus tard.</p>');
        },

        complete:function()
        {
            console.log("oudine");
        },
    })
}

//----------------Update Charts-----------------------------------------------------------------------------------------
function updateLiveCharts(datetime, temperature, dew_point, interval_duration)
{
    //Temperature chart
    temperatureChart.data.labels = datetime;
    temperatureChart.data.datasets[0].data = temperature;
    temperatureChart.data.datasets[1].data = dew_point;
    temperatureChart.options.scales.x.ticks.stepSize = 2 * interval_duration;
    temperatureChart.update();
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