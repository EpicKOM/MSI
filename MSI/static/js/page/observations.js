let snowCoverUrlWeek = [];
let snowCoverUrlSeason = [];
let intervalDuration = "week";

$(document).ready(function() {
    tabsManagement();
    mountainButtonsManagement();
    snowCoverageSelectorsManagement();
    fetchMountainData("belledonne");
});

// Gestion des onglets
function tabsManagement() {
    $('#snowTab, #avalancheTab').on('click', function () {
        const isSnowTab = $(this).attr('id') === 'snowTab';
        $('.nav-link').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('#snowTabContent').toggle(isSnowTab);
        $('#avalancheTabContent').toggle(!isSnowTab);
    });
}

// Sélection de la période de couverture neigeuse
function snowCoverageSelectorsManagement() {
    $('.snow-coverage-selector').on('click', function () {
        if ($(this).hasClass('action-item-disabled')) return;

        intervalDuration = $(this).data('value');
        updateSnowCoverage();

        $('.snow-coverage-selector')
            .removeClass('action-item-disabled')
            .find('i.fa-check').remove();

        $(this)
            .addClass('action-item-disabled')
            .append('<i class="fa-solid fa-check text-success"></i>');

        $('#snowCoveragePeriodSelectTitle').text($(this).text());
    });
}

// Gestion des boutons massifs
function mountainButtonsManagement() {
    $('.mountain-button').on('click', function () {
        if ($(this).hasClass('action-item-disabled')) return;

        $('.mountain-button').removeClass('bg-active-color action-item-disabled');
        $(this).addClass('bg-active-color action-item-disabled');

        const massifName = $(this).data('value');
        fetchMountainData(massifName);
    });
}

//----------------Ajax request------------------------------------------------------------------------------------------
// Requête AJAX pour récupérer les données d'un massif
function fetchMountainData(massifName) {
    $.ajax({
        type: 'GET',
        url: `/api/observations/mountain-weather/${massifName}`,

        success: (results) => {
            const { title, bra, snow_cover } = results;

            $('#braErrorMessage').hide();
            $('#snowCoverageErrorMessage').hide();

            snowCoverUrlWeek = snow_cover["week"];
            snowCoverUrlSeason = snow_cover["season"];

            $('#massifTitle').text(title);
            $('#braFrame').attr("src", bra);

            updateSnowCoverage();

            $('#massifTitle').show();
            $('#snowCoverageContainer').show();
            $('#braFrame').show();
        },

        error: (xhr, status, error) => {
            $('#massifTitle').hide();
            $('#snowCoverageContainer').hide();
            $('#braFrame').prop('src', 'about:blank').hide();

            $('#braErrorMessage').show();
            $('#snowCoverageErrorMessage').show();
        }
    });
}

function updateSnowCoverage() {
    $('#snowCoverageContainer').empty();

    const urls = intervalDuration === "season" ? snowCoverUrlSeason : snowCoverUrlWeek;

    urls.forEach(url => {
        $('#snowCoverageContainer').append(`
            <div class="col-lg-6 ms-auto me-auto text-center">
                <img class="img-fluid rounded" src="${url}" alt="Les données sont actuellement indisponibles">
            </div>
        `);
    });
}
