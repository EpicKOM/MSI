$(document).ready(function() {

    $("tr.collapsable").hide();

    $('.forecast-items').on('click', function() {
        $('.forecast-items').removeClass('bg-secondary-color');
        $(this).addClass('bg-secondary-color');

        let dayNumber = parseInt($(this).data('value'), 10);
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