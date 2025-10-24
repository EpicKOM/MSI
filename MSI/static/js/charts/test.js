import {
    progressiveLineAnimation,
    staggeredAnimation,
    smoothUpdateAnimation
} from './animations.js';



// Chart Init
let liveChart;
let dataName = "temperature";
let intervalDuration = 1;
let loadedParameters =
{
    "temperature": true,
    "humidity": false,
    "pressure": false,
    "rain": false,
    "wind": false
};


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
    liveChart = new Chart(document.getElementById('liveChart'), temperatureConfig);

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
        type : 'GET',
        url : '/api/meteo-live/live-charts/saint-ismier',
        data: {
            'data_name': _dataName,  // Paramètres à inclure dans l'URL
            'interval_duration': _intervalDuration
        },

        success:function(results)
        {
            // Recup data
            let data = results;
            liveChart.destroy();
            //update chart config

            let config = getChartConfig(_dataName);

            if (!loadedParameters[dataName]) {
                let dataLength = data["datetime"].length;

                if (config.type === 'line') {
                    config.data.labels = data["datetime"];
                    config.data.datasets[0].data = data[_dataName];
                    config.options.animations = progressiveLineAnimation(dataLength); // Choisir la bonne animation en fonction du type de graphe
                }
                else if (config.type === 'bar') {
                    console.log(data);
                    config.data.labels = data["datetime"];
                    config.data.datasets[0].data = data["rain_1h"];
                    config.options.animations = {
                        y: staggeredAnimation(dataLength) // Appliquer l'animation à la propriété 'y'
                    };
                }
                else {
                    config.options.animations = smoothUpdateAnimation;
                }

                loadedParameters[dataName] = true; // Marquer comme "vu"
            }

            else {
                // Si le paramètre a déjà été vu, passer à l'animation Smooth Update
                config.options.animations = smoothUpdateAnimation;
            }

            if (config) {
                liveChart = new Chart(document.getElementById('liveChart'), config);

                // update chart data
                //updateLiveCharts(_dataName, data, _intervalDuration);

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
            liveChart.data.datasets[0].data = _data["wind_speed"];
            liveChart.data.datasets[1].data = _data["gust_speed"];
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
    liveChart.update('show');
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