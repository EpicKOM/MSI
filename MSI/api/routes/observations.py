from apifairy import response, other_responses, arguments
from flask import abort
from MSI.api.schemas import *
from MSI.data_loaders import get_mountain_weather_data, get_pollution_alerts_data, get_weather_alerts_data
from MSI.api import bp


@bp.route('/observations/mountain-weather/<massif_name>', methods=['GET'])
@response(MountainWeatherOutputSchema)
@other_responses({404: "Massif not found", 400: "Bad request", 500: "Internal server error"})
def get_mountain_weather(massif_name: str):
    mountain_weather_data = get_mountain_weather_data(massif_name)
    if mountain_weather_data is None:
        abort(404, description=f"Massif '{massif_name}' non trouvé.")
    return mountain_weather_data


@bp.route('/observations/pollution-alerts/', methods=['GET'])
@response(PollutionDataOutputSchema(many=True))
@other_responses({404: "Not found", 400: "Bad request", 500: "Internal server error"})
def get_pollution_alerts():
    """Return pollution alerts data

    This endpoint returns pollution alerts data for Grenoble (Insee Code = 3185).
    """
    return get_pollution_alerts_data()


@bp.route('/observations/weather-alerts/', methods=['GET'])
@response(WeatherAlertsDataOutputSchema(many=True))
@other_responses({404: "Not found", 400: "Bad request", 500: "Internal server error"})
def get_weather_alerts():
    """Return weather alerts data

    This endpoint returns weather alerts data for Isere department.
    """

    print(get_weather_alerts_data())
    return get_weather_alerts_data()
