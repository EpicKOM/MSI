const totalDuration = 1000;
const delayBetweenPoints = totalDuration / initialChartsData.temperature.length;

// Fonction pour déterminer la position Y précédente (clé pour l'animation)
const previousY = (ctx) => {
    if (ctx.index === 0) {
        // Pour le premier point, utilise une valeur par défaut ou la première valeur réelle
        // On prend la première valeur réelle de la série pour éviter une interpolation incohérente
        const initialValue = initialChartsData.temperature[0].y;
        return ctx.chart.scales.y.getPixelForValue(initialValue);
    }
    // Récupère la position Y du point précédent dans le même dataset
    return ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
};

// Configuration de l'objet d'animation
const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // Le point est initialement ignoré
        delay(ctx) {
            // Assure que le délai n'est calculé que pour les points de données
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY, // Démarre à la position Y du point précédent
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    }
};

const smoothUpdateAnimation = {
    // 1. Animation des coordonnées
    x: {
        duration: 10000,
        easing: 'easeInOutQuad',
    },
    y: {
        duration: 10000,
        easing: 'easeInOutQuad',
    },
};

//------------------TEMPERATURE CHART-----------------------------------------------------------------------------------
// setup
const temperatureData = {
    labels: initialChartsData.datetime,
    datasets: [{
        label: 'Température',
        data: initialChartsData.temperature,
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
        animations: animation,
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

// Chart Init
let liveChart;
let loadedParameters =
{
    "temperature": true,
    "humidity": false,
    "pressure": false,
};

document.addEventListener('DOMContentLoaded', () => {
    $('#ajaxButtonTemperature').on('click', function() {
        ajaxRequest("temperature");
    });

    $('#ajaxButtonPression').on('click', function() {
        ajaxRequest("pressure");
    });

    $('#ajaxButtonHumidity').on('click', function() {
        ajaxRequest("humidity");
    });

    // 1. Obtenir l'élément canvas
    const ctx = document.getElementById('myAnimatedChart');

    // Vérifier si l'élément existe
    if (ctx) {
        // 2. Créer l'instance Chart avec la configuration
        liveChart = new Chart(ctx, temperatureConfig);
    }
});

function ajaxRequest(data_name) {
    $.ajax({
        type : 'GET',
        url : '/api/meteo-live/live-charts/saint-ismier',
        data: {
            'data_name': data_name,  // Paramètres à inclure dans l'URL
            'interval_duration': 1
        },

        success:function(results)
        {
            // Recup data
            let data = results;

            // On clone la configuration de base
            let config = temperatureConfig;

            // On écrase l'animation avec la version rapide/douce par default


            if (loadedParameters[data_name]) {
            // Si le paramètre a déjà été vu, passer à l'animation Smooth Update
                delete config.options.animations;
            }

            else {
                config.options.animations = animation;
                liveChart.destroy();
                liveChart = new Chart(document.getElementById('myAnimatedChart'), config);
            // Première fois : Conserver l'animation Progressive Line
                loadedParameters[data_name] = true; // Marquer comme "vu"
            }

            if (config) {
                // update chart data
                liveChart.data.labels = data["datetime"];
                liveChart.data.datasets[0].data = data[data_name];
                liveChart.options.scales.x.ticks.stepSize = 2;
                liveChart.update('show');
            }
        },

        error:function()
        {

        },

        complete:function()
        {
        },
    })
}