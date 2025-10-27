import {
    smoothUpdateAnimation,
} from '../charts/animations.js';

import {
    temperatureConfig,
    rainConfig
} from '../charts/configurations/forecasts.js';

// Initialize the tooltip on document ready
const tooltipPrecipitationProbability = document.getElementById('precipitation_probability');

$(document).ready(function() {
    $('#forecasts-unavailable-alert').fadeIn(1000);

    $("#forecasts-unavailable-alert-button").click(function(){
        $('#forecasts-unavailable-alert').fadeOut(function() {
            $(this).remove();
        });
    });

    $("tr.collapsable").hide();

    $('.forecast-items').on('click', function() {
        if (!$(this).hasClass('action-item-disabled')) {
            $('.forecast-items').removeClass('bg-active-color border-active action-item-disabled');
            $(this).addClass('bg-active-color border-active action-item-disabled');

            let dayNumber = parseInt($(this).data('value'), 10);

            ajaxRequest(dayNumber);
        }
    });

    $('#collapseButton').click(function() {
        let tableIsCollapsed = $("#forecasts-table").attr("data-value") === "true";

        if (tableIsCollapsed) {
            $("#forecasts-table").attr("data-value", "false");
            $("tr.collapsable").fadeIn(function() {
                $("#collapseButtonIcon").removeClass('fa-angles-down').addClass('fa-angles-up');
            });
        }
        
        else{
            $("#forecasts-table").attr("data-value", "true");
            $("tr.collapsable").fadeOut(function() {
                $("#collapseButtonIcon").removeClass('fa-angles-up').addClass('fa-angles-down');
            });
        }
    })

    //Chart Init
    let dataLength = forecastsChartData["date"].length;

    temperatureConfig.data.labels = forecastsChartData["date"];
    temperatureConfig.data.datasets[0].data = forecastsChartData["temperature_min"];
    temperatureConfig.data.datasets[1].data = forecastsChartData["temperature_mean"];
    temperatureConfig.data.datasets[2].data = forecastsChartData["temperature_max"];
    temperatureConfig.options.animations = smoothUpdateAnimation;

    rainConfig.data.labels = forecastsChartData["date"];
    rainConfig.data.datasets[0].data = forecastsChartData["precipitation"];
    rainConfig.options.animations = smoothUpdateAnimation;

    const forecastsTemperatureChart = new Chart(document.getElementById('forecastsTemperatureChart'), temperatureConfig);
    const forecastsRainChart = new Chart(document.getElementById('forecastsRainChart'), rainConfig);
})

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(dayNumber) {

    $.ajax({
        type : 'GET',
        url : `/api/forecasts/${dayNumber}`,

        success:function(results) {
            // Forecasts Header
            $('#pictocode').attr('src', `https://static.meteoblue.com/assets/images/picto/${results['pictocode']}_iday.svg`);
            $('#dayName').text(results['day_name']);
            $('#date').text(results['date']);

            let predictabilityLabel = results['predictability_label'];

            $('#predictabilityLabel').text(predictabilityLabel);
            switch(predictabilityLabel) {
                case "Très faible":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-1');
                    $('#progressPredictabilityBg').removeClass().addClass('progress forecasts-progress bg-predictability-class-1');
                    $('#progressPredictabilityFg').removeClass().addClass('progress-bar text-dark fw-bold fg-predictability-class-1');
                    break;

                case "Faible":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-2');
                    $('#progressPredictabilityBg').removeClass().addClass('progress forecasts-progress bg-predictability-class-2');
                    $('#progressPredictabilityFg').removeClass().addClass('progress-bar text-dark fw-bold fg-predictability-class-2');
                    break;

                case "Moyenne":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-3');
                    $('#progressPredictabilityBg').removeClass().addClass('progress forecasts-progress bg-predictability-class-3');
                    $('#progressPredictabilityFg').removeClass().addClass('progress-bar text-dark fw-bold fg-predictability-class-3');
                    break;

                case "Élevée":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-4');
                    $('#progressPredictabilityBg').removeClass().addClass('progress forecasts-progress bg-predictability-class-4');
                    $('#progressPredictabilityFg').removeClass().addClass('progress-bar text-dark fw-bold fg-predictability-class-4');
                    break;

                case "Très élevée":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-5');
                    $('#progressPredictabilityBg').removeClass().addClass('progress forecasts-progress bg-predictability-class-5');
                    $('#progressPredictabilityFg').removeClass().addClass('progress-bar text-dark fw-bold fg-predictability-class-5');
                    break;
            }

            $('#progressPredictabilityFg').css('width', `${results['predictability']}%`);
            $('#progressPredictabilityFg').text(`${results['predictability']}%`);

            // Forecasts Table
            $('#temperature_min').text(results['temperature_min']);
            $('#temperature_mean').text(results['temperature_mean']);
            $('#temperature_max').text(results['temperature_max']);
            $('#felttemperature_min').text(results['felttemperature_min']);
            $('#felttemperature_mean').text(results['felttemperature_mean']);
            $('#felttemperature_max').text(results['felttemperature_max']);

            $('#precipitation').text(results['precipitation']);
            $('#precipitation_hours').text(results['precipitation_hours']);
            $('#precipitation_probability').css('width', `${results['precipitation_probability']}%`);
            $('#precipitation_probability').text("");
            $('#precipitation_probability').attr('title', `${results['precipitation_probability']}%`);
            let tooltipInstance = new mdb.Tooltip(tooltipPrecipitationProbability);

            if (results['precipitation_probability'] >= 10) {
                tooltipInstance.dispose(); // Dispose of the current tooltip instance
                $('#precipitation_probability').removeAttr('title');
                $('#precipitation_probability').text(`${results['precipitation_probability']}%`);
            }

            $('#convective_precipitation').text(results['convective_precipitation']);
            $('#snow_fraction').text(results['snow_fraction']);
            $('#rain_fraction').text(results['rain_fraction']);

            $('#windspeed_min').text(results['windspeed_min']);
            $('#windspeed_mean').text(results['windspeed_mean']);
            $('#windspeed_max').text(results['windspeed_max']);
            $('#windDirectionArrow').css('transform', `rotate(${results['wind_angle']}deg)`);
            $('#wind_direction').text(results['wind_direction']);

            $('#sealevelpressure_min').text(results['sealevelpressure_min']);
            $('#sealevelpressure_mean').text(results['sealevelpressure_mean']);
            $('#sealevelpressure_max').text(results['sealevelpressure_max']);
            $('#relativehumidity_min').text(results['relativehumidity_min']);
            $('#relativehumidity_mean').text(results['relativehumidity_mean']);
            $('#relativehumidity_max').text(results['relativehumidity_max']);

            $('#sunrise').text(results['sunrise']);
            $('#sunset').text(results['sunset']);
            $('#uvindex').text(results['uvindex']);
            $('#moonrise').text(results['moonrise']);
            $('#moonset').text(results['moonset']);
            $('#moonphasename').text(results['moonphasename']);

            $('#forecasts-message-errors').remove();
            $("#forecasts-content").show();
        },

        error:function() {

            $('#forecasts-message-errors').remove();
            $("#forecasts-content").hide();
            $("#forecasts-content").before('<p class="text-danger mt-4 text-center lead" id="forecasts-message-errors"><i class="fa-solid fa-xmark me-2"></i>Erreur lors de la tentative de récupération des données. Veuillez réessayer plus tard.</p>');
        },
    })
}
