from MSI import app, db, sse_broadcaster
from flask import render_template, request, abort, jsonify, Response
from MSI.data_loaders import ForecastsApi, get_weather_alerts, get_pollution_alerts_data
from MSI.sse import format_sse
from MSI.utils import *
import datetime


@app.before_request
def create_dummy_data():
    db.create_all()


@app.context_processor
def current_year():
    return {'current_year': datetime.datetime.now().year}


@app.route("/")
@app.route("/meteo-live/<station_name>/")
def meteo_live(station_name="saint-ismier"):
    station_class = get_station_class(station_name)
    station_template = get_station_template(station_name)

    data_status = station_class.get_data_status()
    context = {"data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=station_class.get_current_weather_data(),
                       daily_extremes=station_class.get_daily_extremes())

    return render_template(station_template, **context)


# ------------SSE---------------------------------------------------------------------------
@app.route('/notify/<station_name>/')
def notify(station_name):
    # Vérifie si la station existe
    if station_name not in sse_broadcaster.subscribers:
        return {"error": f"Station {station_name} not found"}, 404

    # Vérifie si la station a des abonnés
    if not sse_broadcaster.subscribers[station_name]:
        return {"message": "No subscribers to notify"}, 204

    # Récupère les données et diffuse le message
    print(len(sse_broadcaster.subscribers[station_name]))
    station_class = get_station_class(station_name)
    context = {
        "current_weather_data": station_class.get_current_weather_data(),
        "daily_extremes": station_class.get_daily_extremes()
    }
    message = format_sse(data=context)
    sse_broadcaster.broadcast(station_name=station_name, message=message)

    print(f"SSE notifié - {station_name}")
    return {"message": f"SSE notification sent for station {station_name}"}, 200


@app.route("/stream/meteo-live/<station_name>", methods=['GET'])
def stream_meteo_live(station_name):
    def event_stream():
        print(f"Le client s'abonne au stream {station_name}")
        # S'abonner pour recevoir les événements SSE
        subscriber = sse_broadcaster.subscribe(station_name)
        print(len(sse_broadcaster.subscribers[station_name]))
        try:
            while True:
                # Récupérer un nouveau message du flux (bloque jusqu'à l'arrivée d'un message)
                message = subscriber.get()
                yield message
        except GeneratorExit:
            print("La connexion n'existe plus !")
            sse_broadcaster.unsubscribe(station_name, subscriber)

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
    weather_alerts = get_weather_alerts()

    pollution_alerts = get_pollution_alerts_data()
    pollution_alerts_today = pollution_alerts['echeance'][0]
    pollution_alerts_tomorrow = pollution_alerts['echeance'][1]

    return render_template('observations.html',
                           weather_alerts=weather_alerts,
                           pollution_alerts_today=pollution_alerts_today,
                           pollution_alerts_tomorrow=pollution_alerts_tomorrow)


@app.route("/test/")
def test():
    return render_template("test.html")
