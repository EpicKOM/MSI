from MSI import app
from .data_loaders_utils import load_json_cached
import datetime


class ForecastsApi:
    json_path = app.config.get('JSON_FORECASTS_PATH')

    @classmethod
    def _load_and_clean_forecasts(cls):
        """Charge les données JSON depuis le disque et supprime J0 si nécessaire."""
        data = load_json_cached(cls.json_path)

        if not data:
            return None

        update_datetime = datetime.datetime.strptime(data.get("update_datetime"), "%Y-%m-%d %H:%M:%S.%f")
        # Si on est après minuit et avant le cron de 9h → supprimer J0
        if len(data.get("time", [])) > 6 and not cls.is_update_today(update_datetime):
            for key, values in data.items():
                if isinstance(values, list) and values:
                    data[key] = values[1:]

        return data

    @classmethod
    def get_7_day_forecasts(cls):
        """Récupère les données du fichier JSON spécifié."""
        data = cls._load_and_clean_forecasts()

        if not data:
            app.logger.warning("[ForecastsApi - get_forecasts_data] - Aucune donnée de prévision trouvée.")
            response = {
                "is_empty": True,
                "update_datetime": None,
                "is_data_fresh": False,
                "forecasts": []
            }
            return response

        current_time = datetime.datetime.now()
        update_datetime = datetime.datetime.strptime(data.get("update_datetime"), "%Y-%m-%d %H:%M:%S.%f")
        delta_time = current_time - update_datetime
        # Mise à jour à 8h le matin → 40h correspont à 00h J+1
        deadline = datetime.timedelta(hours=40)

        is_data_fresh = delta_time < deadline

        keys = ["time", "pictocode", "temperature_min", "temperature_mean", "temperature_max", "precipitation"]
        if not all(key in data for key in keys):
            missing_keys = [key for key in keys if key not in data]
            for missing_key in missing_keys:
                app.logger.error(f"[ForecastsApi - get_forecasts_data] - La clé attendue '{missing_key}' est "
                                 f"manquante dans les données du fichier JSON")

            raise KeyError("Une ou plusieurs clés attendues sont manquantes dans les données du fichier JSON")

        results = [
            {
                "index": index,
                "date": date,
                "frDate": cls.get_date_french_format(date),
                "day_name": cls.get_french_day_name(date),
                "pictocode": f"{pictocode:02d}",
                "temperature_min": round(temperature_min),
                "temperature_max": round(temperature_max),
                "temperature_mean": round(temperature_mean),
                "precipitation": round(precipitation, 1),
            }

            for index, (date, pictocode, temperature_min, temperature_max, temperature_mean, precipitation) in
            enumerate(
                zip(
                    data["time"],
                    data["pictocode"],
                    data["temperature_min"],
                    data["temperature_max"],
                    data["temperature_mean"],
                    data["precipitation"]
                )
            )
        ]

        response = {
            "is_empty": False,
            "update_datetime": update_datetime.strftime("%d/%m/%Y à %H:%M"),
            "is_data_fresh": is_data_fresh,
            "forecasts": results,
            "forecasts_chart_data": {
                "date": [forecast['date'] for forecast in results],
                "temperature_min": [forecast['temperature_min'] for forecast in results],
                "temperature_mean": [forecast['temperature_mean'] for forecast in results],
                "temperature_max": [forecast['temperature_max'] for forecast in results],
                "precipitation": [forecast['precipitation'] for forecast in results]
            }
        }

        return response

    @classmethod
    def get_daily_forecast(cls, index):
        """Récupère les données du fichier JSON spécifié."""
        data = cls._load_and_clean_forecasts()

        if not data:
            app.logger.warning("[ForecastsApi - get_forecasts_data_by_index] - Aucune donnée de prévision trouvée.")
            return {}

        keys = ["time", "pictocode", "predictability_class", "predictability", "temperature_min", "temperature_mean",
                "temperature_max", "felttemperature_min", "felttemperature_mean", "felttemperature_max", "precipitation",
                "precipitation_hours", "precipitation_probability", "convective_precipitation", "snowfraction",
                "windspeed_min", "windspeed_mean", "windspeed_max", "winddirection", "sealevelpressure_min",
                "sealevelpressure_mean", "sealevelpressure_max", "relativehumidity_min", "relativehumidity_mean",
                "relativehumidity_max", "sunrise", "sunset", "uvindex", "moonrise", "moonset", "moonphasename"]

        if not all(key in data for key in keys):
            missing_keys = [key for key in keys if key not in data]
            for missing_key in missing_keys:
                app.logger.error(f"[ForecastsApi - get_forecasts_data] - La clé attendue '{missing_key}' est "
                                 f"manquante dans les données du fichier JSON")

            raise KeyError("Une ou plusieurs clés attendues sont manquantes dans les données du fichier JSON")

        try:
            date = data["time"][index]
            snow_fraction = data["snowfraction"][index]
            wind_angle = data["winddirection"][index]

            results = {
                "date": cls.get_date_french_format(date),
                "day_name": cls.get_french_day_name(date),
                "pictocode": f"{data['pictocode'][index]:02d}",
                "predictability_label": cls.get_predictability_label(data["predictability_class"][index]),
                "predictability": data["predictability"][index],
                "temperature_min": round(data["temperature_min"][index]),
                "temperature_mean": round(data["temperature_mean"][index]),
                "temperature_max": round(data["temperature_max"][index]),
                "felttemperature_min": round(data["felttemperature_min"][index]),
                "felttemperature_mean": round(data["felttemperature_mean"][index]),
                "felttemperature_max": round(data["felttemperature_max"][index]),
                "precipitation": round(data["precipitation"][index], 1),
                "precipitation_hours": cls.clean_hours(data["precipitation_hours"][index]),
                "precipitation_probability": data["precipitation_probability"][index],
                "convective_precipitation": round(data["convective_precipitation"][index], 1),
                "snow_fraction": cls.get_precipitation_fraction(snow_fraction, "snow"),
                "rain_fraction": cls.get_precipitation_fraction(snow_fraction, "rain"),
                "windspeed_min": round(data["windspeed_min"][index] * 3.6),
                "windspeed_mean": round(data["windspeed_mean"][index] * 3.6),
                "windspeed_max": round(data["windspeed_max"][index] * 3.6),
                "wind_angle": (wind_angle + 180) % 360,
                "wind_direction": cls.get_wind_direction(wind_angle),
                "sealevelpressure_min": data["sealevelpressure_min"][index],
                "sealevelpressure_mean": data["sealevelpressure_mean"][index],
                "sealevelpressure_max": data["sealevelpressure_max"][index],
                "relativehumidity_min": data["relativehumidity_min"][index],
                "relativehumidity_mean": data["relativehumidity_mean"][index],
                "relativehumidity_max": data["relativehumidity_max"][index],
                "sunrise": data["sunrise"][index],
                "sunset": data["sunset"][index],
                "uvindex": data["uvindex"][index],
                "moonrise": data["moonrise"][index],
                "moonset": data["moonset"][index],
                "moonphasename": cls.get_moon_phase_frname(data["moonphasename"][index]),
            }

            return results

        except IndexError:
            app.logger.exception(f"[ForecastsApi - get_forecasts_data_by_index] - Index {index} hors limites.")
            return {}
        except Exception:
            app.logger.exception(f"[ForecastsApi - get_forecasts_data_by_index] - Erreur lors de la récupération des "
                                 f"données de prévisions par index.")
            return {}

    @staticmethod
    def is_update_today(update_datetime) -> bool:
        update_date = update_datetime.date()
        today_date = datetime.datetime.today().date()
        return update_date == today_date

    @staticmethod
    def clean_hours(value):
        return int(value) if value == int(value) else round(value, 1)

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
        snow = int(round(snow_fraction * 100))
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
        compass_rose = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(compass_rose, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 45: "NE", 67.5: "ENE", 90: "E", 112.5: "ESE", 135: "SE", 157.5: "SSE",
                      180: "S",
                      202.5: "SSO", 225: "SO", 247.5: "OSO", 270: "O", 292.5: "ONO", 315: "NO", 337.5: "NNO", 360: "N"}

        return directions.get(compass_rose_angle)
