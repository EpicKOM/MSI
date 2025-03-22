export class MeteoSSE {
    constructor(stationId) {
        this.stationId = stationId;
        this.eventSource = new EventSource(`/stream/meteo-live/${stationId}`);

        this.eventSource.onmessage = (event) => this.updateData(event);
        this.eventSource.onerror = (error) => console.error(`EventSource failed for station ${stationId}:`, error);
    }

    updateData(event) {
        const data = JSON.parse(event.data);
        const weatherData = data.current_weather_data;
        const dailyExtremes = data.daily_extremes;

        const updateDatetime = weatherData.update_datetime;
        const temperature = weatherData.temperature?.toFixed(1) ?? "-";
        const temperatureTrend = weatherData.temperature_trend;
        const rain_1h = weatherData.rain_1h?.toFixed(1) ?? "-";
        const rain1hDate = weatherData.rain_1h_date ?? "-";
        const rain_24h = weatherData.rain_24h?.toFixed(1) ?? "-";
        const windSpeed = weatherData.wind_speed ?? "-";
        const gustSpeed = weatherData.gust_speed ?? "-";
        const windAngle = weatherData.wind_angle ?? "-";
        const windDirection = weatherData.wind_direction ?? "-";
        const humidity = weatherData.humidity ?? "-";
        let pressure;
        let uv;

        if ("pressure" in weatherData) {
            pressure = weatherData.pressure?.toFixed(1) ?? "-";
        }
        else {
            pressure = "undefined";
        }

        if ("uv" in weatherData) {
            uv = weatherData.uv ?? "-";
        }
        else {
            uv = "undefined";
        }


        const tmax = dailyExtremes.tmax?.toFixed(1) ?? "-";
        const tmaxDate = dailyExtremes.tmax_time ?? "-";
        const tmin = dailyExtremes.tmin?.toFixed(1) ?? "-";
        const tminDate = dailyExtremes.tmin_time ?? "-";
        const gustMax = dailyExtremes.gust_max?.toFixed(1) ?? "-";
        const gustMaxDate = dailyExtremes.gust_max_time ?? "-";

        // Mise à jour des données dans la page
        $("#liveDateTime").text(`Dernière mise à jour : ${updateDatetime}`);

        let temperatureIcon = "";
        if (temperatureTrend === "down") {
            temperatureIcon = '<i class="fa-solid fa-arrow-turn-down text-info ms-2 opacity-75 fs-6"></i>';
        } else if (temperatureTrend === "up") {
            temperatureIcon = '<i class="fa-solid fa-arrow-turn-up text-danger ms-2 opacity-75 fs-6"></i>';
        }
        $("#liveTemperature").html(`${temperature} °C ${temperatureIcon}`);
        this.updateTooltip("#temperatureMin", `${tmin} °C`, tminDate);
        this.updateTooltip("#temperatureMax", `${tmax} °C`, tmaxDate);

        let rainIcon = '<i class="fa-solid fa-cloud-rain fa-stack-1x text-light"></i>';
        if (rain_1h <= 0 || rain_1h === "-") {
            rainIcon += '<i class="fa-solid fa-slash fa-stack-1x text-danger"></i>';
        }
        $("#liveRainIcon").html(rainIcon);
        this.updateTooltip("#liveRain1h", `${rain_1h} mm/1h`, rain1hDate);
        $("#liveRain24h").text(`${rain_24h} mm`);

        let windIcon = '<i class="fa-solid fa-wind fa-stack-1x text-light"></i>';
        if (windSpeed <= 0 || windSpeed === "-") {
            windIcon += '<i class="fa-solid fa-slash fa-stack-1x text-danger"></i>';
        }
        $("#liveWindIcon").html(windIcon);
        this.updateTooltip("#liveWind", `${windSpeed} km/h`, `Raf: ${gustSpeed} km/h`);
        this.updateTooltip("#gustMax", `${gustMax} km/h`, gustMaxDate);

        if (windSpeed !== 0 || gustSpeed !== 0) {
            this.updateTooltip("#liveWindDirection", windDirection, `Angle: ${windAngle} °`);
        } else {
            $("#liveWindDirection").find("span").text("-");
            $("#liveWindDirection").removeAttr("data-mdb-original-title");
        }

        $("#liveHumidity").text(`${humidity} %`);

        if (pressure !== "undefined") {
            $("#livePressure").text(`${pressure} hPa`);
        }

    }

    updateTooltip(selector, text, tooltipText) {
        $(selector).find("span").text(text);
        $(selector).removeAttr("data-mdb-original-title");
        if (tooltipText !== "-") {
            $(selector).attr("title", tooltipText);
            new mdb.Tooltip(document.getElementById(selector.replace("#", "")));
        }
    }

    close() {
        this.eventSource.close();
        console.log(`EventSource for ${this.stationId} closed.`);
    }
}
