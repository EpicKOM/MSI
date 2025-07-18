from calendar import firstweekday

from .data_loaders_utils import load_json
from datetime import date
from MSI import app

json_path = app.config.get('JSON_WEATHER_ALERTS_PATH')
weather_alerts = load_json(json_path)


def get_weather_alerts_data() -> list:
    if len(weather_alerts) > 1 and not is_weather_alerts_data_fresh():
        del weather_alerts[0]

    return weather_alerts


def get_weather_alerts_data_status() -> bool:
    return is_weather_alerts_data_fresh() if weather_alerts else False


def is_weather_alerts_data_fresh() -> bool:
    if not weather_alerts:
        return False

    first_date = weather_alerts[0].get("date_echeance")
    today_str = date.today().strftime("%d/%m/%Y")

    return first_date == today_str
