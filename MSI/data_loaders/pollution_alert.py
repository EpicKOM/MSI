from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_POLLUTION_ALERT_PATH')
pollution_alert = load_json(json_path)


def get_pollution_alert() -> dict:
    print(pollution_alert)
    return pollution_alert
