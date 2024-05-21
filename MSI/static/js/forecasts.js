$(document).ready(function() {
    $('.forecast-items').on('click', function() {
        $('.forecast-items').css('background-color', '');
        $(this).css('background-color', 'rgba(39, 39, 42, 1)');
    });
});