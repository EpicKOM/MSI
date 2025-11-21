from .data_loaders_utils import load_json
from MSI import app

json_path = app.config.get('JSON_WEBCAMS_PATH')
webcams = load_json(json_path)


def get_webcams():
    return webcams
