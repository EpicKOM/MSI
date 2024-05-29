$(document).ready(function() {

    $("tr.collapsable").hide();

    $('.forecast-items').on('click', function() {
        $('.forecast-items').removeClass('active-bg-color');
        $(this).addClass('active-bg-color');

        let dayNumber = parseInt($(this).data('value'), 10);
    });

    $('#collapseButton').click(function() {
        let tableIsCollapsed = $("#forecasts-table").attr("data-value") === "true";

        if (tableIsCollapsed) {
            $("#forecasts-table").attr("data-value", "false");
//            $("#caca").hide();
            $("tr.collapsable").show();
//            $("#caca").slideDown();
            $("#bite").removeClass('fa-angles-down').addClass('fa-angles-up');
        }
        else{
            $("#forecasts-table").attr("data-value", "true");
            $("tr.collapsable").hide();
//            $("#caca").slideUp(function(){
//                $("tr.collapsable").hide();
//                $("#caca").show();
//            });

            $("#bite").removeClass('fa-angles-up').addClass('fa-angles-down');
        }
    })
})