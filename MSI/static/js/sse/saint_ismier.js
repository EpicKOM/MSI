$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/saint-ismier");

    // Écouter les messages par défaut
    eventSource.onmessage = (event) => {
        let data = JSON.parse(event.data);
        let currentWeatherData = data.current_weather_data;
        let dailyExtremes = data.daily_extremes;

        console.log(currentWeatherData);
        let temperature = currentWeatherData.temperature.toFixed(1);
        let rain_1h = currentWeatherData.rain_1h.toFixed(1);
        let rain_24h = currentWeatherData.rain_24h.toFixed(1);

        $('#liveTemperature').text(`${temperature} °C`);
    };

    // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
    };
});