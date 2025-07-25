from apifairy import response, other_responses, arguments
from flask import abort
from MSI.api.schemas import *
from MSI.data_loaders import get_mountain_weather_data, get_pollution_alerts_data, get_weather_alerts_data
from MSI.api import bp


@bp.route('/observations/mountain-weather/<massif_name>', methods=['GET'])
@response(MountainWeatherOutputSchema)
@other_responses({
    400: "Bad request",
    404: "Massif not found",
    500: "Internal server error"
})
def get_mountain_weather(massif_name: str):
    """
    GET /observations/mountain-weather/<massif_name>

    Retrieve mountain weather data for a specific massif.

    Args:
        massif_name (str): The name of the massif (e.g., "Belledonne").

    Returns:
        MountainWeatherOutputSchema: Weather information for the specified massif.

    Raises:
        404: If the massif is not found.
    """
    mountain_weather_data = get_mountain_weather_data(massif_name)

    if mountain_weather_data is None:
        abort(404, description=f"Massif '{massif_name}' non trouvé.")

    return mountain_weather_data


@bp.route('/observations/pollution-alerts/', methods=['GET'])
@response(PollutionDataOutputSchema(many=True))
@other_responses({
    400: "Bad request",
    404: "Not found",
    500: "Internal server error"
})
def get_pollution_alerts():
    """
    GET /observations/pollution-alerts/

    Return pollution alerts data for Grenoble (INSEE code: 3185).

    Returns:
        list[PollutionDataOutputSchema]: A list of pollution alerts.
    """
    return get_pollution_alerts_data()


@bp.route('/observations/weather-alerts/', methods=['GET'])
@response(WeatherAlertsDataOutputSchema(many=True))
@other_responses({
    400: "Bad request",
    404: "Not found",
    500: "Internal server error"
})
def get_weather_alerts():
    """
    GET /observations/weather-alerts/

    Return weather alerts data for the Isère department.

    Returns:
        list[WeatherAlertsDataOutputSchema]: A list of weather alerts.
    """
    return get_weather_alerts_data()
