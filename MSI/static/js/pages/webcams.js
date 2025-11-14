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
        maxBounds: bounds,              // Limite la zone de navigation
        maxBoundsViscosity: 1.0
    });

    L.control.layers({
        "Satellite": layers.esri,
        "Carte": layers.osm
    }).addTo(map);



    var marker = L.marker([geographicCoordinate.lat, geographicCoordinate.lng]).addTo(map);
    marker.bindPopup("<h3>Hello World</h3>");
});
