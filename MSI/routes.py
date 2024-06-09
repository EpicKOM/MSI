from MSI import app, db
from flask import render_template, request, abort, jsonify
from MSI.models.saint_martin_dheres_data import SaintMartinDheresData
from MSI.api.forecasts import ForecastsApi
import datetime


@app.before_request
def create_dummy_data():
    db.create_all()


@app.context_processor
def current_year():
    return {'current_year': datetime.datetime.now().year}


@app.route("/")
@app.route("/meteo-live/saint-ismier/")
def meteo_live_saint_ismier():
    return render_template("meteo_live_saint_ismier.html")


@app.route("/meteo-live/saint-martin-d-heres/")
def meteo_live_saint_martin_dheres():
    table_is_empty = SaintMartinDheresData.table_is_empty()
    context = {'table_is_empty': table_is_empty}

    if not table_is_empty:
        context.update(reception_error=SaintMartinDheresData.check_reception(),
                       current_data=SaintMartinDheresData.current_data(),
                       temperature_extremes_today=SaintMartinDheresData.temperature_extremes_today(),
                       cumulative_rain_today=SaintMartinDheresData.cumulative_rain_today(),
                       maximum_gust_today=SaintMartinDheresData.maximum_gust_today(),
                       rain=SaintMartinDheresData.rain(),)

    return render_template("meteo_live_saint_martin_dheres.html", **context)


# ------------Requête AJAX Live Charts---------------------------------------------------------------------------
@app.route('/data/saint-martin-d-heres/live-charts', methods=['POST'])
def saint_martin_dheres_update_charts():
    interval_duration = request.form.get('interval_duration')

    if interval_duration is None:
        app.logger.error("[saint_martin_dheres_update_charts] - Clé 'interval_duration' manquante dans la requête.")
        abort(404)

    interval_duration = int(interval_duration)
    return jsonify(live_charts=SaintMartinDheresData.current_charts_data(interval_duration)), 200


@app.route("/previsions/")
def forecasts():
    return render_template("forecasts.html",
                           forecasts_data=ForecastsApi.get_forecasts_data())


# ------------Requête AJAX Forecasts---------------------------------------------------------------------------
@app.route('/data/forecasts', methods=['POST'])
def forecasts_update():
    day_number = request.form.get("day_number")

    if day_number is None:
        app.logger.error("[forecasts_update] - Clé 'day_number' manquante dans la requête.")
        abort(404)

    day_number = int(day_number)
    return jsonify(forecasts_data=ForecastsApi.get_forecasts_data_by_index(day_number)), 200


@app.route('/500')
def generate500():
    abort(500)


# -------GESTION DES ERREURS--------------------------------------------------------------------------------------------
@app.errorhandler(404)
def error_404(error):
    app.logger.warning(f"Erreur 404 : {error}")
    return render_template('error.html',
                           error_code=404,
                           title="Erreur 404 - Page non trouvée"), 404


@app.errorhandler(500)
def error_500(error):
    app.logger.error(f"Erreur 500 : {error}")
    return render_template('error.html',
                           error_code=500,
                           title="Erreur 500 - Erreur interne du serveur"), 500
