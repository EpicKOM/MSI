from MSI import app
import json
import datetime


class ForecastsApi:
    json_path = app.config.get('JSON_FORECASTS_PATH')

    @classmethod
    def load_forecasts_data(cls):
        """Charge les données du fichier JSON une seule fois."""
        try:
            with open(cls.json_path, "r") as file:
                return json.load(file)

        except FileNotFoundError:
            app.logger.exception(f"[load_forecasts_data] - Erreur : Le fichier {cls.json_path} n'a pas été trouvé.")
        except json.JSONDecodeError:
            app.logger.exception(f"[load_forecasts_data] - Erreur lors de la lecture du fichier JSON.")
        except Exception:
            app.logger.exception(f"[load_forecasts_data] - Erreur inconnue lors de la récupération des prévisions.")

        return None

    @classmethod
    def get_forecasts_data(cls):
        """Récupère les données du fichier JSON spécifié."""
        forecasts_data = cls.load_forecasts_data()

        if not forecasts_data:
            app.logger.warning("[get_forecasts_data] - Aucune donnée de prévision trouvée.")
            return [], None, True

        current_time = datetime.datetime.now()
        update_datetime = datetime.datetime.strptime(forecasts_data.get("update_datetime"), "%Y-%m-%d %H:%M:%S.%f")
        delta_time = current_time - update_datetime
        deadline = datetime.timedelta(days=1)

        is_data_fresh = delta_time < deadline

        keys = ["time", "pictocode", "temperature_min", "temperature_mean", "temperature_max", "precipitation"]
        if not all(key in forecasts_data for key in keys):
            app.logger.error("Une des clés attendues est manquante dans les données du fichier JSON")
            raise KeyError("Une des clés attendues est manquante dans les données du fichier JSON")

        results = [
            {
                "index": index,
                "date": date,
                "frDate": ForecastsApi.get_date_french_format(date),
                "day_name": ForecastsApi.get_french_day_name(date),
                "pictocode": f"{pictocode:02d}",
                "temperature_min": round(temperature_min),
                "temperature_max": round(temperature_max),
                "temperature_mean": round(temperature_mean),
                "precipitation": round(precipitation),
            }

            for index, (date, pictocode, temperature_min, temperature_max, temperature_mean, precipitation) in
            enumerate(
                zip(
                    forecasts_data["time"],
                    forecasts_data["pictocode"],
                    forecasts_data["temperature_min"],
                    forecasts_data["temperature_max"],
                    forecasts_data["temperature_mean"],
                    forecasts_data["precipitation"]
                )
            )
        ]

        return results, is_data_fresh, update_datetime.strftime("%d/%m/%Y à %H:%M")

    @classmethod
    def get_forecasts_data_by_index(cls, index):
        """Récupère les données du fichier JSON spécifié."""
        forecasts_data = cls.load_forecasts_data()

        if not forecasts_data:
            app.logger.warning("[get_forecasts_data_by_index] - Aucune donnée de prévision trouvée.")
            return {}

        keys = ["time", "pictocode", "temperature_min", "temperature_mean", "temperature_max"]
        if not all(key in forecasts_data for key in keys):
            raise KeyError("Une des clés attendues est manquante dans les données du fichier JSON")

        try:
            date = forecasts_data["time"][index]
            snow_fraction = forecasts_data["snowfraction"][index]
            wind_angle = forecasts_data["winddirection"][index]

            results = {
                "date": ForecastsApi.get_date_french_format(date),
                "day_name": ForecastsApi.get_french_day_name(date),
                "pictocode": f"{forecasts_data['pictocode'][index]:02d}",
                "predictability_label": ForecastsApi.get_predictability_label(forecasts_data["predictability_class"][index]),
                "predictability": forecasts_data["predictability"][index],
                "temperature_min": round(forecasts_data["temperature_min"][index]),
                "temperature_mean": round(forecasts_data["temperature_mean"][index]),
                "temperature_max": round(forecasts_data["temperature_max"][index]),
                "felttemperature_min": round(forecasts_data["felttemperature_min"][index]),
                "felttemperature_mean": round(forecasts_data["felttemperature_mean"][index]),
                "felttemperature_max": round(forecasts_data["felttemperature_max"][index]),
                "precipitation": round(forecasts_data["precipitation"][index]),
                "precipitation_hours": forecasts_data["precipitation_hours"][index],
                "precipitation_probability": forecasts_data["precipitation_probability"][index],
                "convective_precipitation": round(forecasts_data["convective_precipitation"][index]),
                "snow_fraction": ForecastsApi.get_precipitation_fraction(snow_fraction, "snow"),
                "rain_fraction": ForecastsApi.get_precipitation_fraction(snow_fraction, "rain"),
                "windspeed_min": round(forecasts_data["windspeed_min"][index] * 3.6),
                "windspeed_mean": round(forecasts_data["windspeed_mean"][index] * 3.6),
                "windspeed_max": round(forecasts_data["windspeed_max"][index] * 3.6),
                "wind_angle": (wind_angle + 180) % 360,
                "wind_direction": ForecastsApi.get_wind_direction(wind_angle),
                "sealevelpressure_min": forecasts_data["sealevelpressure_min"][index],
                "sealevelpressure_mean": forecasts_data["sealevelpressure_mean"][index],
                "sealevelpressure_max": forecasts_data["sealevelpressure_max"][index],
                "relativehumidity_min": forecasts_data["relativehumidity_min"][index],
                "relativehumidity_mean": forecasts_data["relativehumidity_mean"][index],
                "relativehumidity_max": forecasts_data["relativehumidity_max"][index],
                "sunrise": forecasts_data["sunrise"][index],
                "sunset": forecasts_data["sunset"][index],
                "uvindex": forecasts_data["uvindex"][index],
                "moonrise": forecasts_data["moonrise"][index],
                "moonset": forecasts_data["moonset"][index],
                "moonphasename": ForecastsApi.get_moon_phase_frname(forecasts_data["moonphasename"][index]),
            }
            return results

        except IndexError:
            app.logger.exception(f"[get_forecasts_data_by_index] - Index {index} hors limites.")
            return {}
        except Exception:
            app.logger.exception(f"[get_forecasts_data_by_index] - Erreur lors de la récupération des données de prévisions par index.")
            return {}

    @staticmethod
    def get_french_day_name(date):
        day_name = datetime.datetime.strptime(date, "%Y-%m-%d").strftime("%A")
        french_day_name = {
            "Monday": "Lundi",
            "Tuesday": "Mardi",
            "Wednesday": "Mercredi",
            "Thursday": "Jeudi",
            "Friday": "Vendredi",
            "Saturday": "Samedi",
            "Sunday": "Dimanche"
        }

        return french_day_name[day_name]

    @staticmethod
    def get_date_french_format(date):
        return datetime.datetime.strptime(date, "%Y-%m-%d").strftime("%d/%m/%Y")

    @staticmethod
    def get_predictability_label(predictability_class):
        return {
            1: "Très faible",
            2: "Faible",
            3: "Moyenne",
            4: "Élevée",
            5: "Très élevée",
        }.get(predictability_class, "-")

    @staticmethod
    def get_precipitation_fraction(snow_fraction, precipitation_type):
        snow = snow_fraction * 100
        rain = 100 - snow

        return {"snow": snow, "rain": rain}.get(precipitation_type)

    @staticmethod
    def get_moon_phase_frname(moon_phase_enname):
        return {
            "new": "Nouvelle lune",
            "waxing crescent": "Premier croissant",
            "first quarter": "Premier quartier",
            "waxing gibbous": "Gibbeuse croissante",
            "full": "Pleine lune",
            "waning gibbous": "Gibbeuse décroissante",
            "last quarter": "Dernier quartier",
            "waning crescent": "Dernier croissant",
        }.get(moon_phase_enname, "-")

    @staticmethod
    def get_wind_direction(wind_angle):
        """
        Determines the wind direction based on the given wind angle.

        Args:
            wind_angle (float): The wind angle in degrees.

        Returns:
            str: The wind direction as a cardinal or intercardinal direction abbreviation.
        """
        COMPASS_ROSE = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(COMPASS_ROSE, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 45: "NE", 67.5: "ENE", 90: "E", 112.5: "ESE", 135: "SE", 157.5: "SSE",
                      180: "S",
                      202.5: "SSO", 225: "SO", 247.5: "OSO", 270: "O", 292.5: "ONO", 315: "NO", 337.5: "NNO", 360: "N"}

        return directions.get(compass_rose_angle)
