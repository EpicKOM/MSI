from MSI import app
from .data_loaders_utils import load_json

json_path = app.config.get('JSON_METADATA_PATH')
metadata = load_json(json_path)


def get_station_metadata(station_name: str):
    return metadata["stations"][station_name]


def get_units_metadata(station_name: str):
    return metadata["units"][station_name]
