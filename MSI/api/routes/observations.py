from apifairy import response, other_responses, arguments
from MSI.api.schemas import *
from MSI.api import bp


@bp.route('/observations/mountain-weather/<massif_name>', methods=['GET'])
@arguments(MountainWeatherInputSchema)
@response(MountainWeatherOutputSchema)
@other_responses({404: "Weather station not found", 400: "Bad request", 500: "Internal server error"})
def get_mountain_weather(data, massif_name: str):
    pass
