from MSI import app
from .utils import load_json


class Metadata:
    json_path = app.config.get('JSON_METADATA_PATH')
    metadata = load_json(json_path)

    @classmethod
    def get_station_data(cls, station_name: str):
        return cls.metadata["stations"][station_name]

    @classmethod
    def get_units_data(cls, station_name: str):
        return cls.metadata["units"][station_name]

