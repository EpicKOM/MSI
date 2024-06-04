from MSI import app
import json
import datetime


class ForecastsApi:
    json_path = app.config.get('JSON_FORECASTS_PATH')

    @classmethod
    def get_forecasts_data(cls):
        """Récupère les données du fichier JSON spécifié."""
        try:
            with open(cls.json_path, "r") as file:
                json_forecasts_data = json.load(file)

            forecasts_data = json_forecasts_data["data_day"]

            keys = ["time", "pictocode", "temperature_min", "temperature_mean", "temperature_max", "precipitation"]
            if not all(key in forecasts_data for key in keys):
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

            return results

        except FileNotFoundError:
            print(f"Erreur : Le fichier {cls.json_path} n'a pas été trouvé.")

        except json.JSONDecodeError as json_error:
            print(f"Erreur lors de la lecture du fichier JSON : {json_error}")

        except KeyError as key_error:
            print(f"Erreur de clé dans le fichier JSON : {key_error}")

        except Exception as e:
            print(f"Erreur inconnue lors de la récupération des données : {e}")

        return []

    @classmethod
    def get_forecasts_data_by_index(cls, index):
        """Récupère les données du fichier JSON spécifié."""
        try:
            with open(cls.json_path, "r") as file:
                json_forecasts_data = json.load(file)

            forecasts_data = json_forecasts_data["data_day"]

            keys = ["time", "pictocode", "temperature_min", "temperature_mean", "temperature_max"]
            if not all(key in forecasts_data for key in keys):
                raise KeyError("Une des clés attendues est manquante dans les données du fichier JSON")

            date = forecasts_data["time"][index]
            snow_fraction = forecasts_data["snowfraction"][index]

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
                "wind_direction": forecasts_data["winddirection"][index],
                "sealevelpressure_min": forecasts_data["sealevelpressure_min"][index],
                "sealevelpressure_mean": forecasts_data["sealevelpressure_mean"][index],
                "sealevelpressure_max": forecasts_data["sealevelpressure_max"][index],
                "relativehumidity_min": forecasts_data["relativehumidity_min"][index],
                "relativehumidity_mean": forecasts_data["relativehumidity_mean"][index],
                "relativehumidity_max": forecasts_data["relativehumidity_max"][index],
            }
            
            return results

        except FileNotFoundError:
            print(f"Erreur : Le fichier {cls.json_path} n'a pas été trouvé.")

        except json.JSONDecodeError as json_error:
            print(f"Erreur lors de la lecture du fichier JSON : {json_error}")

        except KeyError as key_error:
            print(f"Erreur de clé dans le fichier JSON : {key_error}")

        except Exception as e:
            print(f"Erreur inconnue lors de la récupération des données : {e}")

        return {}

    @staticmethod
    def get_french_day_name(date):
        date_obj = datetime.datetime.strptime(date, "%Y-%m-%d")
        day_name = date_obj.strftime("%A")

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
        date_obj = datetime.datetime.strptime(date, "%Y-%m-%d")
        date_fr = date_obj.strftime("%d/%m/%Y")

        return date_fr

    @staticmethod
    def get_predictability_label(predictability_class):
        predictability_label = {
            1: "Très faible",
            2: "Faible",
            3: "Moyenne",
            4: "Élevée",
            5: "Très élevée",
        }

        return predictability_label[predictability_class]

    @staticmethod
    def get_precipitation_fraction(snow_fraction, precipitation_type):
        snow = snow_fraction * 100
        rain = 100 - snow

        precipitation_fraction = {
            "snow": snow,
            "rain": rain,
        }

        return precipitation_fraction[precipitation_type]
