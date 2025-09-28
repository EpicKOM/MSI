from flask import abort
from apifairy import response, other_responses, arguments

from MSI.api import bp
from MSI.api.schemas import CurrentWeatherOutputSchema, LiveChartsOutputSchema, LiveChartsInputSchema
from MSI.data_loaders import get_station_metadata, get_units_metadata
from MSI.utils import get_station_class


@bp.route('/meteo-live/<station_name>', methods=['GET'])
@response(CurrentWeatherOutputSchema)
@other_responses({
    400: "Bad request",
    404: "Weather station not found",
    500: "Internal server error"
})
def get_meteo_live(station_name: str):
    """
    GET /meteo-live/<station_name>

    Retrieve current weather data for a specific weather station.

    Args:
        station_name (str): The name of the weather station.

    Returns:
        CurrentWeatherOutputSchema: Current weather data with metadata.

    Raises:
        - 404: If the weather station is not found.
        - 400: If the station name is invalid.
        - 500: For unexpected internal errors.
    """
    station_class = get_station_class(station_name)

    if station_class is None:
        abort(404, description=f"Weather station '{station_name}' not found.")

    data_status = station_class.get_data_status()

    context = {"station": get_station_metadata(station_name),
               "units": get_units_metadata(station_name),
               "data_status": data_status}

    if not data_status.get("is_table_empty", True):
        context.update(current_weather_data=station_class.get_current_weather_data(),
                       daily_extremes=station_class.get_daily_extremes_data())

    return context


# ------------Requête Live Charts---------------------------------------------------------------------------
@bp.route('/meteo-live/live-charts/<station_name>', methods=['GET'])
@arguments(LiveChartsInputSchema)
@response(LiveChartsOutputSchema)
@other_responses({
    400: "Bad request",
    404: "Weather station not found",
    500: "Internal server error"
})
def get_live_charts(data, station_name: str):
    """
    GET /meteo-live/live-charts/<station_name>

    Retrieve live chart data for a specific weather station.

    Args:
        data (LiveChartsInputSchema): Query parameters including:
            - data_name (str): The weather metric (e.g., temperature, humidity).
            - interval_duration (str): The time interval (day) (e.g., 1, 2).
        station_name (str): The name of the weather station.

    Returns:
        LiveChartsOutputSchema: Live chart data based on metric and interval.

    Raises:
        - 400: If the query parameters are invalid (e.g., missing or incorrect format).
        - 404: If the weather station does not exist.
        - 500: For unexpected server errors.
    """

    data_name = data["data_name"]
    interval_duration = data["interval_duration"]

    station_class = get_station_class(station_name)

    if station_class is None:
        abort(404, description=f"Weather station '{station_name}' not found.")

    return station_class.get_current_charts_data(data_name, interval_duration)
