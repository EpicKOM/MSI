from flask import jsonify, abort, request
from apifairy import response, other_responses, body
from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData
from MSI.schemas import SaintIsmierDataSchema, SaintMartinDheresDataSchema, LansEnVercorsDataSchema, \
    InputLiveChartsSchema
from MSI.api import bp
from MSI import app
from MSI.api.utils.functions import get_meteo_live


@bp.route('/meteo-live/saint-ismier', methods=['GET'])
@response(SaintIsmierDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_saint_ismier():
    return get_meteo_live("saint_ismier", SaintIsmierData)


@bp.route('/meteo-live/saint-martin-d-heres', methods=['GET'])
@response(SaintMartinDheresDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_saint_martin_dheres():
    return get_meteo_live("saint_martin_dheres", SaintMartinDheresData)


@bp.route('/meteo-live/lans-en-vercors', methods=['GET'])
@response(LansEnVercorsDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_lans_en_vercors():
    return get_meteo_live("lans_en_vercors", LansEnVercorsData)


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
