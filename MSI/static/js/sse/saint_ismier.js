$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/saint-ismier");

    // Écouter les messages par défaut
    eventSource.onmessage = (event) => {
        let data = JSON.parse(event.data);
        let currentWeatherData = data.current_weather_data;
        let dailyExtremes = data.daily_extremes;

        console.log(currentWeatherData);
        let update_datetime = currentWeatherData.update_datetime;
        let temperature = currentWeatherData.temperature.toFixed(1);
        let temperature_trend = currentWeatherData.temperature_trend;
        let rain_1h = currentWeatherData.rain_1h.toFixed(1);
        let rain_24h = currentWeatherData.rain_24h.toFixed(1);
        let wind_speed = currentWeatherData.wind_speed;
        let gust_speed = currentWeatherData.gust_speed;
        let wind_angle = currentWeatherData.wind_angle;
        let wind_direction = currentWeatherData.wind_direction;
        let humidity = currentWeatherData.humidity;
        let pressure = currentWeatherData.pressure.toFixed(1);

        // Mise à jour section datetime
        $("#liveDateTime").text(`Dernière mise à jour : ${update_datetime}`);
        // Mise à jour section température
        let iconTemperature = "";
        if (temperature_trend === "down") {
            iconTemperature =
                '<i class="fa-solid fa-arrow-turn-down text-info ms-2 ms-xl-1 ms-xxl-2 opacity-75 fs-6"></i>';

        }
        else if (temperature_trend === "up") {
            iconTemperature =
                '<i class="fa-solid fa-arrow-turn-up text-danger ms-2 ms-xl-1 ms-xxl-2 opacity-75 fs-6"></i>';
        }

        // Mettre à jour le contenu de l'élément
        $("#liveTemperature").html(`${temperature} °C ${iconTemperature}`);
    };

    // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
    };
});