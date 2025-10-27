import {
    progressiveLineAnimation,
    smoothUpdateAnimation
} from '../charts/animations.js';

import {
    temperatureConfig,
    rainConfig,
    windConfig,
    humidityConfig,
    pressureConfig
} from '../charts/configurations/live_charts.js';

const CHART_CONFIGS = {
    "temperature": temperatureConfig,
    "rain": rainConfig,
    "wind": windConfig,
    "humidity": humidityConfig,
    "pressure": pressureConfig,
};

// --- Variables d'état ---
let liveChart;
let dataName = "temperature";
let currentDataName = "temperature";
let intervalDuration = 1;
let loadedParameters =
{
    "temperature": true,
    "rain": false,
    "wind": false,
    "wind_direction": false,
    "humidity": false,
    "pressure": false
};

// --- Mise en cache des sélecteurs DOM (Bonne pratique jQuery) ---
const $periodSelectors = $('.chart-period-selector');
const $dataSelectors = $('.chart-data-selector');
const $periodTitle = $('#chartPeriodSelectorTitle');
const $liveChartCanvas = document.getElementById('liveChart');
const $liveChartTitle = $('#liveChartTitle');

//------------------ FONCTIONS -----------------------------------------------------------------------------------------

/**
 * Initialise l'instance du graphique Chart.js.
 * @param {object} config - Configuration initiale du graphique.
 * @returns {Chart} L'instance du graphique.
 */
function initializeChart(config) {
    if (liveChart) {
        liveChart.destroy(); // Assure qu'une seule instance est active (robustesse)
    }

    // Préparation des données initiales
    const dataLength = initialChartsData["datetime"].length;
    config.data.labels = initialChartsData["datetime"];
    config.data.datasets[0].data = initialChartsData["temperature"];
    config.options.animations = progressiveLineAnimation(dataLength);

    return new Chart($liveChartCanvas, config);
}

/**
 * Met à jour l'interface utilisateur du sélecteur de période.
 * @param {jQuery} $clickedElement - L'élément cliqué.
 */
function updatePeriodSelectorUI($clickedElement) {
    $periodSelectors.removeClass('action-item-disabled')
        .find('i.fa-check').remove(); // Opération groupée

    $clickedElement.append('<i class="fa-solid fa-check text-success"></i>')
        .addClass('action-item-disabled');

    $periodTitle.text($clickedElement.text());
}

/**
 * Met à jour l'interface utilisateur du sélecteur de données.
 * @param {jQuery} $clickedElement - L'élément cliqué.
 */
function updateDataSelectorUI($clickedElement) {
    $dataSelectors.removeClass('bg-active-color border-active action-item-disabled');
    $clickedElement.addClass('bg-active-color border-active action-item-disabled');
}

//------------------ LOGIQUE D'INITIALISATION --------------------------------------------------------------------------

$(function(){
    // 1. Initialisation du graphique
    window.requestAnimationFrame(() => {
        liveChart = initializeChart(CHART_CONFIGS[dataName]);
    });

    // 2. Gestion des événements : Sélecteur de période
    $periodSelectors.on('click', function() {
        const $this = $(this);
        if (!$this.hasClass('action-item-disabled')) {
            intervalDuration = $this.data('value');

            // Mise à jour de l'interface
            updatePeriodSelectorUI($this);

            // Requête
             ajaxRequest();
        }
    });

    // 3. Gestion des événements : Sélecteur de données
    $dataSelectors.on('click', function() {
        const $this = $(this);
        if (!$this.hasClass('action-item-disabled')) {
            dataName = $this.data('value');

            // Mise à jour de l'interface
            updateDataSelectorUI($this);

            // Requête
            ajaxRequest();
        }
    });

    // 4. Refraîchir le graphique lors du retour à l'onglet actif
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            liveChart.update();
        }
    });
});

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest() {
    $.ajax({
        type : 'GET',
        url : '/api/meteo-live/live-charts/saint-ismier',
        data: {
            'data_name': dataName,  // Paramètres à inclure dans l'URL
            'interval_duration': intervalDuration
        }
    })

    .done(function(data) {
        const isNewDataName = (currentDataName !== dataName);
        let chartConfig = liveChart ? liveChart.config : null;

        if (isNewDataName) {
            // Changement radical: on récupère une nouvelle config complète
            chartConfig = CHART_CONFIGS[dataName];
        }

        updateChartConfig(chartConfig, data);

        if (isNewDataName) {
            console.log("Refonte");
            if (liveChart) {
                liveChart.destroy();
            }

            liveChart = new Chart($liveChartCanvas, chartConfig);

            currentDataName = dataName;
        }

        else {
            console.log("mise à jour");
            liveChart.update("show");
        }

        loadedParameters[dataName] = true;

        // update chart title
        let chartTitle = getChartTitle();
        $liveChartTitle.text(chartTitle);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Traitement de l'erreur ici
        console.error("Erreur AJAX:", textStatus, errorThrown);
    });
}

//----------------Update Charts-----------------------------------------------------------------------------------------
function updateChartConfig(_chartConfig, _data)
{
    const updateFunctions = {
        "temperature": () => {
            _chartConfig.data.labels = _data["datetime"];
            _chartConfig.data.datasets[0].data = _data["temperature"];
            _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
        },
        "rain": () => {
            _chartConfig.data.labels = _data["datetime"];
            _chartConfig.data.datasets[0].data = _data["rain_1h"];
            _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
        },
        "wind": () => {
            _chartConfig.data.labels = _data["datetime"];
            _chartConfig.data.datasets[0].data = _data["wind_speed"];
            _chartConfig.data.datasets[1].data = _data["gust_speed"];
            _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
        },
        "wind_direction": () => {
            _chartConfig.data.datasets[0].data = _data["wind_direction"];
        },
        "humidity": () => {
            _chartConfig.data.labels = _data["datetime"];
            _chartConfig.data.datasets[0].data = _data["humidity"];
            _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
        },
        "pressure": () => {
            _chartConfig.data.labels = _data["datetime"];
            _chartConfig.data.datasets[0].data = _data["pressure"];
            _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
        },
        "default": () => {
            _chartConfig.data.labels = _data["datetime"];
            _chartConfig.data.datasets[0].data = _data[dataName];
            _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
        }
    };

    (updateFunctions[dataName] || updateFunctions["default"])();

    if(!loadedParameters[dataName] && _chartConfig.type === "line") {
        let dataLength = _data["datetime"].length;
        _chartConfig.options.animations = progressiveLineAnimation(dataLength);
    }

    else {
        _chartConfig.options.animations = smoothUpdateAnimation;
    }
}

function getChartTitle() {
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

    return `${dataNameTitle[dataName]} sur ${durationsTitle[intervalDuration]} (${unity[dataName]})` || "-";
}