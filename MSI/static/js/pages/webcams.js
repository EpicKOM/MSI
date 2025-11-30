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

const webcamIcon = L.divIcon({
    className: 'webcam-marker-container', // Une classe pour le conteneur (Leaflet gère sa position)
    html: `<img src="${icon_path}" class="webcam-marker" alt="webcam marker">`, // Ton image à l'intérieur
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -38]
});

const webcamVideoIcon = L.divIcon({
    className: 'webcam-marker-container', // Une classe pour le conteneur (Leaflet gère sa position)
    html: `
    <img src="${icon_path}" class="webcam-marker-video" alt="webcam marker">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light-red">
        VIDEO
    </span>`, // Ton image à l'intérieur
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -38]
});

document.addEventListener('DOMContentLoaded', () => {
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

    initWebcamMarkers(map, webcams);
});

function createTileLayer(url, attribution = '') {
    return L.tileLayer(url, {
        maxZoom: MAP_CONFIG.maxZoom,
        minZoom: MAP_CONFIG.minZoom,
        attribution
    });
}

function initWebcamMarkers(map, webcams) {
    webcams.forEach(webcam => {
        const { lat, lng } = webcam.geographicCoordinate;
        const icon = webcam.is_recording_video ? webcamVideoIcon : webcamIcon;

        const html = generatePopupHtml(webcam);

        const marker = L.marker([lat, lng], { icon: icon }).addTo(map);
        marker.bindPopup(html, {
            className: 'myCustomPopup',
            minWidth: 600,
            maxWidth: 600
        });

        generateToolTip(marker, webcam.title);

        marker.on('popupopen', function (e) {
            const popupContent = e.popup._contentNode;

            const btn = popupContent.querySelector('.popup-close');
            if (btn) {
                btn.addEventListener('click', () => {
                    marker.closePopup();
                });
            }
        });
    });
}

function generatePopupHtml({ title, elevation, type, url }) {
    const typeHtml = type.map((t, i) => `
        ${i > 0 ? '<span class="me-1 ms-1 text-light">|</span>' : ''}
        <span class="badge rounded-pill p-2 bg-active-color border-active" style="font-size: 12px;">
            ${t}
        </span>
    `).join('');

    return `
        <div class="card bg-primary-color">
            <div class="p-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0 text-light">${title}</h5>
                    <button type="button" class="btn btn-floating text-light popup-close zoom-effect zoom-large" data-mdb-ripple-init>
                        <i class="fas fa-xmark fa-lg"></i>
                    </button>
                </div>
                <div>
                    <span class="text-light me-2" style="font-size: 12px;">
                        <i class="fas fa-mountain fa-lg me-1"></i>${elevation} m
                    </span>
                    ${typeHtml}
                </div>
            </div>
            <iframe class="rounded"
                src=${url}
                style="width: 100%; min-height: 270px;">
            </iframe>
        </div>
    `;
}

function generateToolTip(marker, title) {
    marker.bindTooltip(title, {
        direction: "top",
        offset: [0, -45],
        opacity: 0.9,
        className: "webcam-tooltip"
    });
}
