from MSI import app
from .utils import load_json

json_path = app.config.get('JSON_METADATA_PATH')
metadata = load_json(json_path)


def get_station_data(station_name: str):
    return metadata["stations"][station_name]


def get_units_data(station_name: str):
    return metadata["units"][station_name]
