const geographicCoordinate = {
    lat: 45.181210,
    lng: 5.722505
}

const MAP_CONFIG = {
    zoomLevel: 10,
    maxZoom: 18,
    minZoom: 10
};

const bounds = L.latLngBounds(
    [44.8, 5.3],  // Coin sud-ouest [lat, lng]
    [45.5, 6.1]   // Coin nord-est [lat, lng]
);

document.addEventListener('DOMContentLoaded', () => {
    const createTileLayer = (url, attribution = '') =>
        L.tileLayer(url, {
            maxZoom: MAP_CONFIG.maxZoom,
            minZoom: MAP_CONFIG.minZoom,
            attribution
        });

    const layers = {
        esri: createTileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            '&copy; Esri'
        ),
        osm: createTileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            '&copy; OpenStreetMap'
        )
    };

    const map = L.map('map', {
        center: [geographicCoordinate.lat, geographicCoordinate.lng],
        zoom: MAP_CONFIG.zoomLevel,
        layers: [layers.esri],
//        maxBounds: bounds,              // Limite la zone de navigation
//        maxBoundsViscosity: 1.0
    });

    L.control.layers({
        "Satellite": layers.esri,
        "Carte": layers.osm
    }).addTo(map);

    var marker = L.marker([geographicCoordinate.lat, geographicCoordinate.lng]).addTo(map);
    var html = `
    <div class="card bg-primary-color">
        <div class="p-2">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0 text-light">Col de Porte - "La Prairie"</h5>
                <button type="button" class="btn btn-floating text-light popup-close zoom-effect zoom-large" data-mdb-ripple-init>
                    <i class="fas fa-xmark fa-lg"></i>
                </button>
            </div>
            <div>
                <span class="text-light" style="font-size: 12px;">
                    <i class="fas fa-mountain fa-lg me-1"></i>1326 m
                </span>
                <span class="me-1 ms-1 text-light">|</span>
                <span class="badge rounded-pill p-2 bg-active-color border-active" style="font-size: 12px;">
                    Montagne
                </span>
            </div>
        </div>
        <iframe class="rounded"
            src="https://www.skaping.com/col-de-porte/ski-alpin"
            style="width: 100%; min-height: 270px;"></iframe>
    </div>
    `;

    marker.bindPopup(html, {
        className: 'myCustomPopup',
        minWidth: 600,
        maxWidth: 600
    });
    marker.on('popupopen', function (e) {
    const btn = document.querySelector('.popup-close');
    if (btn) {
        btn.addEventListener('click', function () {
            marker.closePopup();
        });
    }
});


    marker.bindTooltip("Hello world", {
        permanent: false,     // tooltip seulement au survol
        direction: "top",     // position
        opacity: 0.9,
        className: "myTooltip"  // pour ton CSS perso
    });
});
