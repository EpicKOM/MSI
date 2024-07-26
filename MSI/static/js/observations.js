let url_week = [];
let url_season = [];

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
        $('.mountain-button').removeClass('bg-active-color');
        $(this).addClass('bg-active-color');

        let massifName = $(this).data('value');

        ajaxRequest(massifName)
    });

    $('#snowCoverageSelect').change(function() {
        updateSnowCoverageColumn();
    });

    ajaxRequest("belledonne");
})

//----------------Ajax request------------------------------------------------------------------------------------------
function ajaxRequest(massifName) {

    $.ajax({
        type : 'POST',
        url : '/data/observations',
        data : {'massif_name': massifName},

        success:function(results) {
            let title = results["observations_data"]["title"];
            url_week = results["observations_data"]["url_week"];
            url_season = results["observations_data"]["url_season"];

            $('#snowCoverageTitle').text(title);

            updateSnowCoverageColumn();
        },

        error:function() {
        },
    })
}

function updateSnowCoverageColumn() {
    $('#snowCoverageContainer').empty();

    let interval_duration = $('#snowCoverageSelect').val();
    let urls;

    if (interval_duration === "saison") {
        urls = url_season;
    }

    else {
        urls = url_week;
    }

    urls.forEach(url => {
        const column = `
            <div class="col-lg-6 ms-auto me-auto text-center">
                <img class="img-fluid rounded" src="${url}" alt="Les données sont actuellement indisponibles">
            </div>
        `;
        $('#snowCoverageContainer').append(column);
    });
}