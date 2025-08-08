import datetime

from flask import render_template

from MSI import app, db
from MSI.data_loaders import (
    ForecastsApi,
    get_weather_alerts_data,
    get_pollution_alerts_data,
    get_weather_alerts_data_status,
    get_pollution_alerts_data_status,
)
from MSI.utils import get_station_class, get_station_template


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


@app.route("/previsions/")
def forecasts():
    seven_day_forecasts = ForecastsApi.get_7_day_forecasts()
    forecasts_is_empty = seven_day_forecasts["is_empty"]
    day_index = 0
    today_forecast = ForecastsApi.get_daily_forecast(day_index)

    context = {'forecasts_is_empty': forecasts_is_empty}

    if not forecasts_is_empty:
        context.update(update_datetime=seven_day_forecasts["update_datetime"],
                       is_data_fresh=seven_day_forecasts["is_data_fresh"],
                       seven_day_forecasts=seven_day_forecasts["forecasts"],
                       today_forecast=today_forecast)

    return render_template("forecasts.html", **context)


@app.route("/observations/")
def observations():
    weather_alerts = get_weather_alerts_data()
    weather_alerts_today = weather_alerts[0]
    weather_alerts_tomorrow = weather_alerts[1] if len(weather_alerts) > 1 else None
    is_weather_alerts_data_fresh = get_weather_alerts_data_status()

    pollution_alerts = get_pollution_alerts_data()
    pollution_alerts_today = pollution_alerts[0]
    pollution_alerts_tomorrow = pollution_alerts[1]
    is_pollution_alerts_data_fresh = get_pollution_alerts_data_status()

    return render_template('observations.html',
                           weather_alerts_today=weather_alerts_today,
                           weather_alerts_tomorrow=weather_alerts_tomorrow,
                           is_weather_alerts_data_fresh=is_weather_alerts_data_fresh,
                           pollution_alerts_today=pollution_alerts_today,
                           pollution_alerts_tomorrow=pollution_alerts_tomorrow,
                           is_pollution_alerts_data_fresh=is_pollution_alerts_data_fresh)
