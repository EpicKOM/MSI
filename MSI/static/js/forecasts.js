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
            $('#pictocode').attr('src', `https://static.meteoblue.com/assets/images/picto/${results['forecasts_data']['pictocode']}_iday.svg`);
            $('#temperature_min').text(results['forecasts_data']['temperature_min']);
            $('#temperature_mean').text(results['forecasts_data']['temperature_mean']);;
            $('#temperature_max').text(results['forecasts_data']['temperature_max']);;
        },

        error:function() {
        },

        complete:function() {
        },
    })
}