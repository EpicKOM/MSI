const geographicCoordinate = {
    lat: 45.181210,
    lng: 5.722505
}
const zoomLevel = 10;

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([geographicCoordinate.lat, geographicCoordinate.lng], zoomLevel);
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 10
    }).addTo(map);

    var marker = L.marker([geographicCoordinate.lat, geographicCoordinate.lng]).addTo(map);
    marker.bindPopup("<h3>Hello World</h3>");
});
