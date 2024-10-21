from MSI import app, db, sse_broadcaster
from flask import render_template, request, abort, jsonify, Response
from MSI.data_loaders.forecasts import ForecastsApi
from MSI.pages.observations import Observations
from MSI.sse import format_sse
from MSI.models import *
import datetime
import random
import time


@app.before_request
def create_dummy_data():
    db.create_all()


@app.context_processor
def current_year():
    return {'current_year': datetime.datetime.now().year}


@app.route("/")
@app.route("/meteo-live/saint-ismier/")
def meteo_live_saint_ismier():
    data_status = SaintIsmierData.get_data_status()
    context = {"data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=SaintIsmierData.get_current_weather_data(),
                       daily_extremes=SaintIsmierData.get_daily_extremes())

    return render_template("meteo_live_saint_ismier.html", **context)


@app.route("/meteo-live/saint-martin-d-heres/")
def meteo_live_saint_martin_dheres():
    data_status = SaintMartinDheresData.get_data_status()
    context = {"data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=SaintMartinDheresData.get_current_weather_data(),
                       daily_extremes=SaintMartinDheresData.get_daily_extremes())

    return render_template("meteo_live_saint_martin_dheres.html", **context)


@app.route("/meteo-live/lans-en-vercors/")
def meteo_live_lans_en_vercors():
    data_status = LansEnVercorsData.get_data_status()
    context = {"data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=LansEnVercorsData.get_current_weather_data(),
                       daily_extremes=LansEnVercorsData.get_daily_extremes())

    return render_template("meteo_live_lans_en_vercors.html", **context)


@app.route('/ping')
def ping():
    data = 12
    message = format_sse(data=data, event="meteo")
    sse_broadcaster.broadcast(message=message)
    return {}, 200


@app.route("/stream/meteo-live/saint-ismier", methods=['GET'])
def subscribe_sse_saint_ismier():
    def event_stream():
        print("Le client s'abonne")
        # S'abonner pour recevoir les événements SSE
        subscriber = sse_broadcaster.subscribe()  # returns a queue.Queue
        print(len(sse_broadcaster.subscribers))
        while True:
            # Récupérer un nouveau message du flux (bloque jusqu'à l'arrivée d'un message)
            message = subscriber.get()
            print(message)
            yield message

        # Retourner le flux d'événements avec le type MIME correct
    return Response(event_stream(), mimetype='text/event-stream')


@app.route("/previsions/")
def forecasts():
    forecasts_data = ForecastsApi.get_forecasts_data()
    forecasts_is_empty = forecasts_data[0]

    context = {'forecasts_is_empty': forecasts_is_empty}

    if not forecasts_is_empty:
        context.update(update_datetime=forecasts_data[1],
                       is_data_fresh=forecasts_data[2],
                       forecasts_data=forecasts_data[3],)

    return render_template("forecasts.html", **context)


# ------------Requête AJAX Forecasts---------------------------------------------------------------------------
@app.route('/data/forecasts', methods=['POST'])
def forecasts_update():
    day_number = request.form.get("day_number")

    if day_number is None:
        app.logger.error("[forecasts_update] - Clé 'day_number' manquante dans la requête.")
        abort(404)

    day_number = int(day_number)
    return jsonify(forecasts_data=ForecastsApi.get_forecasts_data_by_index(day_number)), 200


@app.route("/observations/")
def observations():
    return render_template('observations.html')


# ------------Requête AJAX Observations---------------------------------------------------------------------------
@app.route('/data/observations', methods=['POST'])
def observations_update():
    massif_name = request.form.get("massif_name")

    if massif_name is None:
        app.logger.error("[observations_update] - Clé 'massif_name' manquante dans la requête.")
        abort(404)

    return jsonify(observations_data=Observations.get_massif_snow_coverage(massif_name)), 200


@app.route("/test/")
def test():
    return render_template("test.html")
