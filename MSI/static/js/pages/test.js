import {
    progressiveLineAnimation,
    smoothUpdateAnimation
} from '../charts/animations.js';

import {
    temperatureConfig,
    rainConfig,
    windConfig,
    windDirectionConfig,
    humidityConfig,
    pressureConfig
} from '../charts/configurations/live_charts.js';

const CHART_CONFIGS = {
    "temperature": temperatureConfig,
    "rain": rainConfig,
    "wind": windConfig,
    "wind_direction": windDirectionConfig,
    "humidity": humidityConfig,
    "pressure": pressureConfig,
};

    const DATA_NAME_TITLE = {
        "temperature": "Température",
        "rain": "Pluie",
        "wind": "Vent",
        "wind_direction": "Rose des vents",
        "humidity": "Humidité",
        "pressure": "Pression",
    };

    const UNITY = {
        "temperature": "°C",
        "rain": "mm",
        "wind": "km/h",
        "wind_direction": "%",
        "humidity": "%",
        "pressure": "hPa",
    };

    const DURATION_TITLE = {
        1: "24h",
        2: "48h",
        3: "72h",
        7: "7 jours"
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

//------------------FONCTIONS UTILITAIRES ------------------------------------------------------------------------------
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

function getChartTitle() {
    if (dataName in DATA_NAME_TITLE && intervalDuration in DURATION_TITLE) {
        return `${DATA_NAME_TITLE[dataName]} sur ${DURATION_TITLE[intervalDuration]} (${UNITY[dataName]})`;
    }

    return "-";
}

//----------------FONCTIONS PRINCIPALES---------------------------------------------------------------------------------
function fetchChartData() {
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

        if (isNewDataName) {
            if (liveChart) {
                liveChart.destroy();
            }

            const newConfig = CHART_CONFIGS[dataName];

            updateChartConfig(newConfig, data);

            liveChart = new Chart($liveChartCanvas, newConfig);

            currentDataName = dataName;
        }

        else {
            updateChartConfig(liveChart.config, data);
            liveChart.update("show");
        }

        loadedParameters[dataName] = true;

        let chartTitle = getChartTitle();
        $liveChartTitle.text(chartTitle);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Traitement de l'erreur ici
        console.error("Erreur AJAX:", textStatus, errorThrown);
    });
}

function updateChartConfig(_chartConfig, _data) {
    if (dataName !== "wind_direction") {
        _chartConfig.data.labels = _data["datetime"];
        _chartConfig.options.scales.x.ticks.stepSize = 2 * intervalDuration;
    }

    if (dataName === "rain") {
        _chartConfig.data.datasets[0].data = _data["rain_1h"];
    }
    else if (dataName === "wind") {
        _chartConfig.data.datasets[0].data = _data["wind_speed"];
        _chartConfig.data.datasets[1].data = _data["gust_speed"];
    }
    else {
        _chartConfig.data.datasets[0].data = _data[dataName];
    }

    if (!loadedParameters[dataName] && _chartConfig.type === "line") {
        let dataLength = _data["datetime"].length;
        _chartConfig.options.animations = progressiveLineAnimation(dataLength);
    } else {
        _chartConfig.options.animations = smoothUpdateAnimation;
    }
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
             fetchChartData();
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
            fetchChartData();
        }
    });

    // 4. Refraîchir le graphique lors du retour à l'onglet actif
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            liveChart.update("show");
        }
    });
});