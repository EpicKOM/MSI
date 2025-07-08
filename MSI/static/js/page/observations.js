const snowCoverageState = {
    intervalDuration: 'week',
    urls: {
        week: ["https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/AIGLES.gif"],
        season: ["https://rpcache-aa.meteofrance.com/internet2018client/2.0/files/mountain/observations/AIGLE.gif"]
    }
};

$(document).ready(function() {
    mountainTabsManagement();
    VigilanceTabsManagement();
    pollutionTabsManagement();
    mountainButtonsManagement();
    snowCoverageSelectorsManagement();
});

// Gestion des tabs
function mountainTabsManagement() {
    $('#snowTab, #avalancheTab').on('click', function () {
        const isSnowTab = $(this).attr('id') === 'snowTab';
        $('.nav-mountain-weather').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('#snowTabContent').toggle(isSnowTab);
        $('#avalancheTabContent').toggle(!isSnowTab);
    });
}

function VigilanceTabsManagement() {
    $('#vigilanceTodayTab, #vigilanceTomorrowTab').on('click', function () {
        const isVigilanceTodayTab = $(this).attr('id') === 'vigilanceTodayTab';
        $('.nav-vigilance-alert').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('#vigilanceTodayContent').toggle(isVigilanceTodayTab);
        $('#vigilanceTomorrowContent').toggle(!isVigilanceTodayTab);
    });
}

function pollutionTabsManagement() {
    $('#pollutionTodayTab, #pollutionTomorrowTab').on('click', function () {
        const ispollutionTodayTab = $(this).attr('id') === 'pollutionTodayTab';
        $('.nav-pollution-alert').removeClass('tab-active');
        $(this).addClass('tab-active');
        $('#pollutionTodayContent').toggle(ispollutionTodayTab);
        $('#pollutionTomorrowContent').toggle(!ispollutionTodayTab);
    });
}

// Sélection de la période de couverture neigeuse
function snowCoverageSelectorsManagement() {
    $('.snow-coverage-selector').on('click', function () {
        if ($(this).hasClass('action-item-disabled')) return;

        snowCoverageState.intervalDuration = $(this).data('value');
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

            snowCoverageState.urls.week = snow_cover["week"];
            snowCoverageState.urls.season = snow_cover["season"];

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

    const urls = snowCoverageState.intervalDuration === "season" ? snowCoverageState.urls.season : snowCoverageState.urls.week;

    urls.forEach(url => {
        $('#snowCoverageContainer').append(`
            <div class="col-lg-6 ms-auto me-auto text-center">
                <img class="img-fluid rounded" src="${url}" alt="Les données sont actuellement indisponibles">
            </div>
        `);
    });
}
