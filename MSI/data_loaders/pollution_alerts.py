from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_POLLUTION_ALERTS_PATH')
pollution_alerts = load_json(json_path)


def get_pollution_alerts_data() -> dict:
    return pollution_alerts
