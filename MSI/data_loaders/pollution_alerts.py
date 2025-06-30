from .data_loaders_utils import load_json
from datetime import date
from MSI import app

json_path = app.config.get('JSON_POLLUTION_ALERTS_PATH')
pollution_alerts = load_json(json_path)


def get_pollution_alerts_data() -> list:
    if not pollution_alerts:
        return []

    first_date = pollution_alerts[0].get("date_echeance")
    today_str = date.today().strftime("%d/%m/%Y")

    if first_date != today_str:
        del pollution_alerts[0]

    return pollution_alerts
