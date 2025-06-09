from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_WEATHER_ALERT_PATH')
weather_alert = load_json(json_path)


def get_weather_alert() -> dict:

    return {
        "max_color_id": weather_alert["max_color_id"],
        "max_alert_message": weather_alert["max_alert_message"],
        "results": [
            {"phenomenon": item["phenomenon"], "color_id": item["color_id"], "alert_message": item["alert_message"]}
            for item in weather_alert["results"]
        ]
    }
