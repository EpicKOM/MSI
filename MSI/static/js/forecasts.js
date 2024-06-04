$(document).ready(function() {

    $("tr.collapsable").hide();

    // Initial AJAX request
    ajaxRequest(0);

    $('.forecast-items').on('click', function() {
        $('.forecast-items').removeClass('bg-secondary-color');
        $(this).addClass('bg-secondary-color');

        let dayNumber = parseInt($(this).data('value'), 10);

        ajaxRequest(dayNumber);
    });

    $('#collapseButton').click(function() {
        let tableIsCollapsed = $("#forecasts-table").attr("data-value") === "true";

        if (tableIsCollapsed) {
            $("#forecasts-table").attr("data-value", "false");
            $("tr.collapsable").fadeIn();
            $("#collapseButtonIcon").removeClass('fa-angles-down').addClass('fa-angles-up');
        }
        else{
            $("#forecasts-table").attr("data-value", "true");
            $("tr.collapsable").fadeOut();

            $("#collapseButtonIcon").removeClass('fa-angles-up').addClass('fa-angles-down');
        }
    })
})

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(dayNumber) {

    $.ajax({
        type : 'POST',
        url : '/data/forecasts',
        data : {'day_number': dayNumber},

        success:function(results) {

            // Forecasts Header
            $('#pictocode').attr('src', `https://static.meteoblue.com/assets/images/picto/${results['forecasts_data']['pictocode']}_iday.svg`);
            $('#dayName').text(results['forecasts_data']['day_name']);
            $('#date').text(results['forecasts_data']['date']);

            let predictabilityLabel = results['forecasts_data']['predictability_label'];

            $('#predictabilityLabel').text(predictabilityLabel);
            switch(predictabilityLabel) {
                case "Très faible":
                    break;

                case "Faible":
                    break;

                case "Moyenne":
                    $('#predictabilityLabel').removeClass().addClass('text-amber-color');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-amber-color');
                    break;

                case "Élevée":
                    $('#predictabilityLabel').removeClass().addClass('text-success');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-success');
                    break;

                case "Très élevée":
                    break;

                default:
            }
            $('#predictability').css('width', `${results['forecasts_data']['predictability']}%`);
            $('#predictability').text(`${results['forecasts_data']['predictability']}%`);

            // Forecasts Table
            $('#temperature_min').text(results['forecasts_data']['temperature_min']);
            $('#temperature_mean').text(results['forecasts_data']['temperature_mean']);
            $('#temperature_max').text(results['forecasts_data']['temperature_max']);
            $('#felttemperature_min').text(results['forecasts_data']['felttemperature_min']);
            $('#felttemperature_mean').text(results['forecasts_data']['felttemperature_mean']);
            $('#felttemperature_max').text(results['forecasts_data']['felttemperature_max']);

            $('#precipitation').text(results['forecasts_data']['precipitation']);
            $('#precipitation_hours').text(results['forecasts_data']['precipitation_hours']);
            $('#precipitation_probability').css('width', `${results['forecasts_data']['precipitation_probability']}%`);
            $('#precipitation_probability').text(`${results['forecasts_data']['precipitation_probability']}%`);
            $('#convective_precipitation').text(results['forecasts_data']['convective_precipitation']);
            $('#snow_fraction').text(results['forecasts_data']['snow_fraction']);
            $('#rain_fraction').text(results['forecasts_data']['rain_fraction']);

            $('#windspeed_min').text(results['forecasts_data']['windspeed_min']);
            $('#windspeed_mean').text(results['forecasts_data']['windspeed_mean']);
            $('#windspeed_max').text(results['forecasts_data']['windspeed_max']);
            $('#windDirectionArrow').css('transform', `rotate(${results['forecasts_data']['wind_direction']}deg)`);

            $('#sealevelpressure_min').text(results['forecasts_data']['sealevelpressure_min']);
            $('#sealevelpressure_mean').text(results['forecasts_data']['sealevelpressure_mean']);
            $('#sealevelpressure_max').text(results['forecasts_data']['sealevelpressure_max']);
            $('#relativehumidity_min').text(results['forecasts_data']['relativehumidity_min']);
            $('#relativehumidity_mean').text(results['forecasts_data']['relativehumidity_mean']);
            $('#relativehumidity_max').text(results['forecasts_data']['relativehumidity_max']);
        },

        error:function() {
        },

        complete:function() {

        },
    })
}