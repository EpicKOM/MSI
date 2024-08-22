from flask import jsonify, abort, request
from marshmallow import ValidationError
from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData
from MSI.shemas import LiveChartsSchema
from MSI.api.utils.functions import get_model_class
from MSI.api import bp
from MSI import app


@bp.route('/meteo-live/<string:station_name>', methods=['GET'])
def get_meteo_live(station_name: str):
    model_class = get_model_class(station_name)

    if model_class is None:
        abort(404)

    table_is_empty = model_class.table_is_empty()

    context = {'table_is_empty': table_is_empty}

    if not table_is_empty:
        context.update(is_data_fresh=model_class.check_is_data_fresh(),
                       current_data=model_class.current_data(),
                       temperature_extremes_today=model_class.temperature_extremes_today(),
                       cumulative_rain_today=model_class.cumulative_rain_today(),
                       rain=model_class.rain(),
                       maximum_gust_today=model_class.maximum_gust_today(),)

    return jsonify(context), 200


# ------------Requête AJAX Live Charts---------------------------------------------------------------------------
@bp.route('/meteo-live/live-charts/<string:station_name>', methods=['POST'])
def update_live_charts(station_name: str):
    model_class = get_model_class(station_name)

    try:
        json_data = request.get_json()
        schema = LiveChartsSchema()

        data = schema.load(json_data)

        data_name = data["data_name"]
        interval_duration = data["interval_duration"]

        return jsonify(live_charts=model_class.current_charts_data(data_name, interval_duration)), 200

    except ValidationError as e:
        app.logger.error(f"[update_live_charts - {station_name}] {e.messages}")
        abort(400)
