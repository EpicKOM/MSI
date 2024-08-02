$(document).ready(function() {
    // Récupère la valeur sélectionnée
    $('.dropdown-item').click(function(e) {
        var selectedValue = $(this).data('value');
        $('.dropdown-item').find('i.fa-check').remove();
        $(this).append('<i class="fa-solid fa-check text-success"></i>');


        // Afficher la valeur sélectionnée dans le bouton
        $('#dropdownTitle').text($(this).text());

    });
});