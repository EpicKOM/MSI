from MSI import db
from MSI.models.meteo_live_utils import MeteoLiveUtils


class SaintMartinDheresData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, index=True)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Integer)
    dew_point = db.Column(db.Float)
    wind = db.Column(db.Integer)
    gust = db.Column(db.Float)
    wind_angle = db.Column(db.Integer)
    rain_1h = db.Column(db.Float)
    uv = db.Column(db.Integer)

    @classmethod
    def table_is_empty(cls):
        return cls.query.first() is None

    @classmethod
    def check_reception(cls):
        return MeteoLiveUtils.get_check_reception(cls)

    @classmethod
    def current_data(cls):
        data = MeteoLiveUtils.get_last_record(cls)

        current_data = {"update_datetime": data.date_time.strftime("%d/%m/%Y à %H:%M"),
                        "temperature": round(data.temperature, 1) if data.temperature is not None else "-",
                        "humidity": data.humidity if data.humidity is not None else "-",
                        "dew_point": round(data.dew_point, 1) if data.dew_point is not None else "-",
                        "wind": data.wind if data.wind is not None else "-",
                        "gust": round(data.gust, 1) if data.gust is not None else "-",
                        "wind_angle": data.wind_angle if data.wind_angle is not None else "-",
                        "wind_direction": MeteoLiveUtils.get_wind_direction(data.wind_angle) if data.wind_angle is not None else "-",
                        "uv": data.uv if data.uv is not None else "-",
                        }

        return current_data

    @classmethod
    def temperature_extremes_today(cls):
        return MeteoLiveUtils.get_temperature_extremes_today(cls)

    @classmethod
    def cumulative_rain_today(cls):
        return MeteoLiveUtils.get_cumulative_rain_today(cls)

    @classmethod
    def rain(cls):
        return MeteoLiveUtils.get_rain_1h(cls)

    @classmethod
    def maximum_gust_today(cls):
        return MeteoLiveUtils.get_maximum_gust_today(cls)

    @classmethod
    def current_charts_data(cls, interval_duration):
        current_chart_data = MeteoLiveUtils.get_current_charts_data(cls, interval_duration)

        current_chart_data_dict = {"datetime": [data.date_time.strftime("%Y-%m-%d %H:%M:%S") for data in current_chart_data[0]],
                                   "temperature": [data.temperature for data in current_chart_data[0]],
                                   "dew_point": [data.dew_point for data in current_chart_data[0]],
                                   "wind": [data.wind for data in current_chart_data[0]],
                                   "gust": [data.gust for data in current_chart_data[0]],
                                   "humidity": [data.humidity for data in current_chart_data[0]],
                                   "uv": [data.uv for data in current_chart_data[0]],
                                   "rain": [data.rain_1h for data in current_chart_data[1]],
                                   "rain_datetime": [data.date_time.strftime("%Y-%m-%d %H:%M:%S") for data in current_chart_data[1]],
                                   "wind_direction": current_chart_data[2]}

        return current_chart_data_dict

# with app.app_context():
#     SaintMartinDheresData.current_chart_data()
