from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_MOUNTAIN_WEATHER_PATH')
mountain_weather = load_json(json_path)


def get_mountain_weather_data(massif_name: str):
    try:
        return mountain_weather[massif_name]

    except KeyError:
        app.logger.exception(f"[data_loaders - mountain_weather.py] - Le nom du massif {massif_name} n'existe pas.")

    except Exception:
        app.logger.exception(f"[data_loaders - mountain_weather.py] - Erreur inconnue lors de la récupération des "
                             f"données du massif  {massif_name}.")

    return None
