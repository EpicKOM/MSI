from flask import jsonify, abort
from MSI.models.saint_ismier_data import SaintIsmierData
from MSI.api import bp


@bp.route('/meteo-live/saint-ismier', methods=['GET'])
def get_meteo_live_saint_ismier():
    weather_data = SaintIsmierData.current_data()

    return jsonify(weather_data), 200



