from flask import jsonify, abort, request
from apifairy import response, other_responses, body
from marshmallow import ValidationError
from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData
from MSI.schemas import SaintIsmierDataSchema, SaintMartinDheresDataSchema, LansEnVercorsDataSchema, \
    InputLiveChartsSchema
from MSI.api import bp
from MSI import app
from MSI.data_loaders import Metadata


@bp.route('/meteo-live/saint-ismier', methods=['GET'])
@response(SaintIsmierDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_saint_ismier():
    data_status = SaintIsmierData.get_data_status()
    context = {"station": Metadata.get_station_data("saint-ismier"),
               "units": Metadata.get_units_data("saint-ismier"),
               "data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=SaintIsmierData.get_current_weather_data(),
                       daily_extremes=SaintIsmierData.get_daily_extremes())

    return context


@bp.route('/meteo-live/saint-martin-d-heres', methods=['GET'])
@response(SaintMartinDheresDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_saint_martin_dheres():
    data_status = SaintMartinDheresData.get_data_status()
    context = {"data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=SaintMartinDheresData.get_current_weather_data(),
                       daily_extremes=SaintMartinDheresData.get_daily_extremes())

    return context


@bp.route('/meteo-live/lans-en-vercors', methods=['GET'])
@response(LansEnVercorsDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_lans_en_vercors():
    data_status = LansEnVercorsData.get_data_status()
    context = {"data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=LansEnVercorsData.get_current_weather_data(),
                       daily_extremes=LansEnVercorsData.get_daily_extremes())

    return context


# ------------Requête AJAX Live Charts---------------------------------------------------------------------------
@bp.route('/meteo-live/live-charts/<string:station_name>', methods=['POST'])
@body(InputLiveChartsSchema)
@other_responses({404: "Weather station not found"})
def update_live_charts(data, station_name: str):
    try:
        data_name = data["data_name"]
        interval_duration = data["interval_duration"]

        return jsonify(live_charts=SaintIsmierData.current_charts_data(data_name, interval_duration)), 200

    except ValidationError as e:
        app.logger.error(f"[update_live_charts - {station_name}] {e.messages}")
        abort(400)
