from .data_loaders_utils import load_json
from datetime import date
from MSI import app

json_path = app.config.get('JSON_POLLUTION_ALERTS_PATH')
pollution_alerts = load_json(json_path)


def get_pollution_alerts_data() -> list:
    if len(pollution_alerts) > 2 and not is_pollution_alerts_data_fresh():
        del pollution_alerts[0]

    return pollution_alerts


def get_pollution_alerts_data_status() -> bool:
    return is_pollution_alerts_data_fresh() if pollution_alerts else False


def is_pollution_alerts_data_fresh() -> bool:
    if not pollution_alerts:
        return False

    first_date = pollution_alerts[0].get("date_echeance")
    today_str = date.today().strftime("%d/%m/%Y")

    return first_date == today_str
