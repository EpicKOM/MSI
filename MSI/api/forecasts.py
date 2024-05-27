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

            keys = ["time", "pictocode", "temperature_min", "temperature_max"]
            if not all(key in forecasts_data for key in keys):
                raise KeyError("Une des clés attendues est manquante dans les données du fichier JSON")

            results = [
                {
                    "index": index,
                    "date": ForecastsApi.get_date_french_format(date),
                    "day_name": ForecastsApi.get_french_day_name(date),
                    "pictocode": f"{pictocode:02d}",
                    "temperature_min": round(temperature_min),
                    "temperature_max": round(temperature_max)
                }
                for index, date, pictocode, temperature_min, temperature_max in zip(
                    range(len(forecasts_data["time"])),
                    forecasts_data["time"],
                    forecasts_data["pictocode"],
                    forecasts_data["temperature_min"],
                    forecasts_data["temperature_max"]
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
