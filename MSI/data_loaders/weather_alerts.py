from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_WEATHER_ALERTS_PATH')
weather_alerts = load_json(json_path)


def get_weather_alerts() -> dict:

    return weather_alerts


