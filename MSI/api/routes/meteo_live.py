from flask import abort
from apifairy import response, other_responses, arguments
from MSI.data_loaders import get_station_metadata, get_units_metadata
from MSI.api.schemas import *
from MSI.utils import get_station_class
from MSI.api import bp


@bp.route('/meteo-live/<station_name>', methods=['GET'])
@response(CurrentWeatherOutputSchema)
@other_responses({404: "Weather station not found", 400: "Bad request", 500: "Internal server error"})
def get_meteo_live(station_name: str):
    """Return current weather data

    This endpoint returns current weather data for a specific weather station.
    """
    station_class = get_station_class(station_name)

    if station_class is None:
        abort(404)

    data_status = station_class.get_data_status()
    context = {"station": get_station_metadata(station_name),
               "units": get_units_metadata(station_name),
               "data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=station_class.get_current_weather_data(),
                       daily_extremes=station_class.get_daily_extremes())

    return context


# ------------Requête AJAX Live Charts---------------------------------------------------------------------------
@bp.route('/meteo-live/live-charts/<station_name>', methods=['GET'])
@arguments(LiveChartsInputSchema)
@response(LiveChartsOutputSchema)
@other_responses({404: "Weather station not found", 400: "Bad request", 500: "Internal server error"})
def get_live_charts(data, station_name: str):
    """Return live charts data

    This endpoint returns live charts data for a specific weather station,
    based on the provided weather metric and interval duration.
    """

    data_name = data["data_name"]
    interval_duration = data["interval_duration"]

    station_class = get_station_class(station_name)

    if station_class is None:
        abort(404)

    return station_class.current_charts_data(data_name, interval_duration)
