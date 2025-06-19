from apifairy import response, other_responses, arguments
from flask import abort
from MSI.api.schemas import *
from MSI.data_loaders import get_mountain_weather_data
from MSI.api import bp


@bp.route('/observations/mountain-weather/<massif_name>', methods=['GET'])
@response(MountainWeatherOutputSchema)
@other_responses({404: "Massif not found", 400: "Bad request", 500: "Internal server error"})
def get_mountain_weather(massif_name: str):
    mountain_weather_data = get_mountain_weather_data(massif_name)
    if mountain_weather_data is None:
        abort(404, description=f"Massif '{massif_name}' non trouvé.")
    return mountain_weather_data
