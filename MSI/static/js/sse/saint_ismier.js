$(document).ready(function() {
    const eventSource = new EventSource("/stream/meteo-live/saint-ismier");

    // Écouter les messages par défaut
    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const weatherData = data.current_weather_data;
        const dailyExtremes = data.daily_extremes;

        const updateDatetime = weatherData.update_datetime;
        const temperature = weatherData.temperature?.toFixed(1) ?? "-";
        const temperatureTrend = weatherData.temperature_trend;
        const rain_1h = weatherData.rain_1h?.toFixed(1) ?? "-";
        const rain_24h = weatherData.rain_24h?.toFixed(1) ?? "-";
        const windSpeed = weatherData.wind_speed ?? "-";
        const gustSpeed = weatherData.gust_speed ?? "-";
        const windAngle = weatherData.wind_angle ?? "-";
        const windDirection = weatherData.wind_direction ?? "-";
        const humidity = weatherData.humidity ?? "-";
        const pressure = weatherData.pressure?.toFixed(1) ?? "-";

        // Mise à jour section datetime
        $("#liveDateTime").text(`Dernière mise à jour : ${updateDatetime}`);

        // Mise à jour section température
        let temperatureIcon = "";

        if (temperatureTrend === "down") {
            temperatureIcon = '<i class="fa-solid fa-arrow-turn-down text-info ms-2 opacity-75 fs-6"></i>';
        }
        else if (temperatureTrend === "up") {
            temperatureIcon = '<i class="fa-solid fa-arrow-turn-up text-danger ms-2 opacity-75 fs-6"></i>';
        }

        $("#liveTemperature").html(`${temperature} °C ${temperatureIcon}`);

        // Mise à jour section Rain
        let rainIcon = '<i class="fa-solid fa-cloud-rain fa-stack-1x text-light"></i>';
        if (rain_1h <= 0 || rain_1h === "-") {
            rainIcon += '<i class="fa-solid fa-slash fa-stack-1x text-danger"></i>';
        }
        $("#liveRainIcon").html(rainIcon);
        $("#liveRain1h").text(`${rain_1h} mm/1h`);
        $("#liveRain24h").text(`${rain_24h} mm`);

        // Mise à jour section Wind
        let windIcon = '<i class="fa-solid fa-wind fa-stack-1x text-light"></i>';
        if (windSpeed <= 0 || windSpeed === "-") {
            windIcon += '<i class="fa-solid fa-slash fa-stack-1x text-danger"></i>';
        }
        $("#liveWindIcon").html(windIcon);
        $("#liveWind").text(`${windSpeed} km/h`);

        if (windSpeed !== 0 || gustSpeed !==0) {
            $("#liveWindDirection").find("span").text(windDirection);
            $("#liveWindDirection").attr("title", `Angle: ${windAngle}°`).removeAttr("data-mdb-original-title");

            if (windAngle !== "-") {
                new mdb.Tooltip(document.getElementById("liveWindDirection"));
            }

        }
        else {
            $("#liveWindDirection").find("span").text("-");
            $("#liveWindDirection").removeAttr("data-mdb-original-title");
        }

        // Mise à jour section Humidity
        $("#liveHumidity").text(`${humidity} %`);

        // Mise à jour section Pressure
        $("#livePressure").text(`${pressure} hPa`);

    };

    // Gestion des erreurs
    eventSource.onerror = (error) => {
        console.error("EventSource failed: ", error);
    };
});