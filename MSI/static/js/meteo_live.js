$(document).ready(function(){
    $('#weather-station-unavailable-alert').fadeIn(1000);

    $("#weather-station-unavailable-alert-button").click(function(){
        $('#weather-station-unavailable-alert').fadeOut(function() {
            $(this).remove();
        });
    });
});