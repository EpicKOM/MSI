from MSI import app, db
from flask import render_template, request, abort, jsonify
from MSI.models.saint_martin_dheres_data import SaintMartinDheresData
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

    if table_is_empty:
        return render_template("meteo_live_saint_martin_dheres.html",
                               table_is_empty=table_is_empty)

    else:
        return render_template("meteo_live_saint_martin_dheres.html",
                               table_is_empty=table_is_empty,
                               reception_error=SaintMartinDheresData.check_reception(),
                               current_data=SaintMartinDheresData.current_data(),
                               temperature_extremes_today=SaintMartinDheresData.temperature_extremes_today(),
                               cumulative_rain_today=SaintMartinDheresData.cumulative_rain_today(),
                               maximum_gust_today=SaintMartinDheresData.maximum_gust_today(),
                               rain=SaintMartinDheresData.rain(),)


# ------------Requête AJAX Live Charts---------------------------------------------------------------------------
@app.route('/data/saint-martin-d-heres/live-charts', methods=['POST'])
def saint_martin_dheres_update_charts():
    interval_duration = request.form.get('interval_duration')

    if interval_duration is not None:
        interval_duration = int(interval_duration)
        return jsonify(live_charts=SaintMartinDheresData.current_charts_data(interval_duration)), 200

    else:
        # Gérer le cas où la clé 'interval_duration' est manquante dans le formulaire
        print("Clé 'interval_duration' manquante dans la requête.")
        abort(404)


@app.route("/previsions/")
def previsions():
    return render_template("previsions.html")
