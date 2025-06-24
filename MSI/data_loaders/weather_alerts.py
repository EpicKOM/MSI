from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_WEATHER_ALERTS_PATH')
weather_alerts = load_json(json_path)


def get_weather_alerts() -> dict:

    return {
        "max_color_id": weather_alerts["max_color_id"],
        "max_alert_message": weather_alerts["max_alert_message"],
        "results": [
            {"phenomenon": item["phenomenon"], "color_id": item["color_id"], "alert_message": item["alert_message"]}
            for item in weather_alerts["results"]
        ]
    }
