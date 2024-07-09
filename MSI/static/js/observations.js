$(document).ready(function() {
    $('#snowTab').on('click', function() {
        $('.nav-link').removeClass('tab-active');
        $(this).addClass('tab-active');
    })

    $('#avalancheTab').on('click', function() {
        $('.nav-link').removeClass('tab-active');
        $(this).addClass('tab-active');
    })
})