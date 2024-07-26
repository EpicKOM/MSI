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

    // Initial AJAX request
    ajaxRequest(0);

    $('.forecast-items').on('click', function() {
        if (!$(this).hasClass('disabled')) {
            $('.forecast-items').removeClass('bg-active-color border-active disabled');
            $(this).addClass('bg-active-color border-active disabled');

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
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-1');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-predictability-class-1');
                    break;

                case "Faible":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-2');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-predictability-class-2');
                    break;

                case "Moyenne":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-3');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-predictability-class-3');
                    break;

                case "Élevée":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-4');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-predictability-class-4');
                    break;

                case "Très élevée":
                    $('#predictabilityLabel').removeClass().addClass('text-predictability-class-5');
                    $('#predictability').removeClass().addClass('progress-bar text-dark fw-bold bg-predictability-class-5');
                    break;
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
            $('#precipitation_probability').text("");
            $('#precipitation_probability').attr('title', `${results['forecasts_data']['precipitation_probability']}%`);
            let tooltipInstance = new mdb.Tooltip(tooltipPrecipitationProbability);

            if (results['forecasts_data']['precipitation_probability'] >= 10) {
                tooltipInstance.dispose(); // Dispose of the current tooltip instance
                $('#precipitation_probability').removeAttr('title');
                $('#precipitation_probability').text(`${results['forecasts_data']['precipitation_probability']}%`);
            }

            $('#convective_precipitation').text(results['forecasts_data']['convective_precipitation']);
            $('#snow_fraction').text(results['forecasts_data']['snow_fraction']);
            $('#rain_fraction').text(results['forecasts_data']['rain_fraction']);

            $('#windspeed_min').text(results['forecasts_data']['windspeed_min']);
            $('#windspeed_mean').text(results['forecasts_data']['windspeed_mean']);
            $('#windspeed_max').text(results['forecasts_data']['windspeed_max']);
            $('#windDirectionArrow').css('transform', `rotate(${results['forecasts_data']['wind_angle']}deg)`);
            $('#wind_direction').text(results['forecasts_data']['wind_direction']);

            $('#sealevelpressure_min').text(results['forecasts_data']['sealevelpressure_min']);
            $('#sealevelpressure_mean').text(results['forecasts_data']['sealevelpressure_mean']);
            $('#sealevelpressure_max').text(results['forecasts_data']['sealevelpressure_max']);
            $('#relativehumidity_min').text(results['forecasts_data']['relativehumidity_min']);
            $('#relativehumidity_mean').text(results['forecasts_data']['relativehumidity_mean']);
            $('#relativehumidity_max').text(results['forecasts_data']['relativehumidity_max']);

            $('#sunrise').text(results['forecasts_data']['sunrise']);
            $('#sunset').text(results['forecasts_data']['sunset']);
            $('#uvindex').text(results['forecasts_data']['uvindex']);
            $('#moonrise').text(results['forecasts_data']['moonrise']);
            $('#moonset').text(results['forecasts_data']['moonset']);
            $('#moonphasename').text(results['forecasts_data']['moonphasename']);

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