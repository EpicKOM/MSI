$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/saint-ismier");

    // Écouter les messages par défaut
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const weatherData = data.current_weather_data;
        const dailyExtremes = data.daily_extremes;

        console.log(weatherData);
        const updateDatetime = weatherData.update_datetime;
        const temperature = weatherData.temperature?.toFixed(1) || "-";
        const temperatureTrend = weatherData.temperature_trend;
        const rain_1h = weatherData.rain_1h?.toFixed(1) || "-";
//        let rain_24h = currentWeatherData.rain_24h.toFixed(1);
//        let wind_speed = currentWeatherData.wind_speed;
//        let gust_speed = currentWeatherData.gust_speed;
//        let wind_angle = currentWeatherData.wind_angle;
//        let wind_direction = currentWeatherData.wind_direction;
//        let humidity = currentWeatherData.humidity;
//        let pressure = currentWeatherData.pressure.toFixed(1);

        // Mise à jour section datetime
        $("#liveDateTime").text(`Dernière mise à jour : ${updateDatetime}`);

        // Mise à jour section température
        let iconTemperature = "";

        if (temperatureTrend === "down") {
            iconTemperature = '<i class="fa-solid fa-arrow-turn-down text-info ms-2 opacity-75 fs-6"></i>';
        } else if (temperatureTrend === "up") {
            iconTemperature = '<i class="fa-solid fa-arrow-turn-up text-danger ms-2 opacity-75 fs-6"></i>';
        }

        $("#liveTemperature").html(`${temperature} °C ${iconTemperature}`);

        let rainIcon = '<i class="fa-solid fa-cloud-rain fa-stack-1x text-light"></i>';
        if (rain_1h <= 0 || rain_1h === "-") {
            rainIcon += '<i class="fa-solid fa-slash fa-stack-1x text-danger"></i>';
        }
        $("#test").html(rainIcon);

    };

    // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
    };
});