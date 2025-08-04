from flask import abort
from apifairy import response, other_responses

from MSI.api.schemas import MountainWeatherOutputSchema, PollutionDataOutputSchema, WeatherAlertsDataOutputSchema
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

    Retrieve mountain weather observations for a specific massif.

    Args:
        massif_name (str): Name of the mountain massif (e.g., "Belledonne").

    Returns:
        MountainWeatherOutputSchema: A structured object containing weather
        conditions and observations related to the specified massif.

    Raises:
        - 404: If the massif is not found.
        - 400: If the massif name is invalid.
        - 500: For unexpected internal errors.
    """
    mountain_weather_data = get_mountain_weather_data(massif_name)

    if mountain_weather_data is None:
        abort(404, description=f"Massif '{massif_name}' not found.")

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

    Retrieve air pollution alerts for the Grenoble metropolitan area (INSEE code: 3185).

    Returns:
        list[PollutionDataOutputSchema]: A list of recent pollution alerts.

    Raises:
        - 400: If the request is malformed.
        - 404: If no pollution alert data is available.
        - 500: For internal server errors.
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

    Retrieve weather alerts for the Isère department.

    Returns:
        list[WeatherAlertsDataOutputSchema]: A list of current weather alerts affecting the department.

    Raises:
        - 400: If the request is malformed.
        - 404: If no weather alert data is found.
        - 500: For internal server errors.
    """
    return get_weather_alerts_data()
