$(document).ready(function() {
    $('.forecast-items').on('click', function() {
        $('.forecast-items').removeClass('active');
        $(this).addClass('active');

        let dayNumber = parseInt($(this).data('value'), 10);
    });

    $('#collapseButton').click(function() {
        let tableIsCollapsed = ($("#forecasts-table").attr("data-value") === "true");

        if (tableIsCollapsed) {
            $("#forecasts-table").attr("data-value", "false");
            let collapseTr = $("tr.hide");
            collapseTr.each(function() {
                $(this).removeClass('hide').addClass('show');
            })
        }

        else {
             $("#forecasts-table").attr("data-value", "true");
            let collapseTr = $("tr.show");

            collapseTr.each(function() {
                $(this).removeClass('show').addClass('hide');
            })
        }
    });
})