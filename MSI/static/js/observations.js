$(document).ready(function() {
    $('#snowTab').on('click', function() {
        $('.nav-link').removeClass('tab-active');
        $(this).addClass('tab-active');
    })

    $('#avalancheTab').on('click', function() {
        $('.nav-link').removeClass('tab-active');
        $(this).addClass('tab-active');
    })

    $('.mountain-button').on('click', function() {
        $('.mountain-button').removeClass('mountain-button-active');
        $(this).addClass('mountain-button-active');
        let massifName = $(this).data('value');
        ajaxRequest(massifName)
    });
})

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(massifName) {

    $.ajax({
        type : 'POST',
        url : '/data/observations',
        data : {'massif_name': massifName},

        success:function(results) {
        },

        error:function() {
        },
    })
}