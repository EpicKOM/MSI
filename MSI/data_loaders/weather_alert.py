from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_WEATHER_ALERT_PATH')
weather_alert = load_json(json_path)

print(weather_alert)

weather_alert_results = {
    "max_color_id": weather_alert["max_color_id"],
    "max_alert_message": weather_alert["max_alert_message"],
    "results": ""
}

print(weather_alert_results)
