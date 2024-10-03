from flask import jsonify, abort, request
from apifairy import response, other_responses, arguments
from MSI.api.schemas import *
from MSI.models import *
from MSI.api.utils import get_meteo_live
from MSI.api import bp
from MSI import app


@bp.route('/meteo-live/saint-ismier', methods=['GET'])
@response(SaintIsmierDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_saint_ismier():
    """Returns real-time weather data for Saint-Ismier.

    This endpoint retrieves the latest weather information for Saint-Ismier.
    """
    return get_meteo_live("saint_ismier", SaintIsmierData)


@bp.route('/meteo-live/saint-martin-d-heres', methods=['GET'])
@response(SaintMartinDheresDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_saint_martin_dheres():
    """Returns real-time weather data for Saint-Martin-d'Hères.

    This endpoint retrieves the latest weather information for Saint-Martin-d'Hères.
    """
    return get_meteo_live("saint_martin_dheres", SaintMartinDheresData)


@bp.route('/meteo-live/lans-en-vercors', methods=['GET'])
@response(LansEnVercorsDataSchema)
@other_responses({404: "Weather station not found"})
def get_meteo_live_lans_en_vercors():
    """Returns real-time weather data for Lans-en-Vercors.

    This endpoint retrieves the latest weather information for Lans-en-Vercors.
    """
    return get_meteo_live("lans_en_vercors", LansEnVercorsData)


# ------------Requête AJAX Live Charts---------------------------------------------------------------------------
@bp.route('/meteo-live/live-charts/saint-ismier', methods=['GET'])
@arguments(LiveChartsInputSchema)
@other_responses({404: "Weather station not found"})
def update_live_charts(data):
    try:
        # Récupérer les paramètres depuis l'URL (request.args)
        data_name = data["data_name"]
        interval_duration = data["interval_duration"]

        return jsonify(live_charts=SaintIsmierData.current_charts_data(data_name, interval_duration)), 200

    except ValidationError as e:
        app.logger.error(f"[update_live_charts - {station_name}] {e.messages}")
        abort(400)
