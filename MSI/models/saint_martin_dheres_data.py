from MSI import app, db
from MSI.models.utils import ModelUtils
import datetime


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
        return ModelUtils.get_check_reception(cls)

    @classmethod
    def current_data(cls):
        data = ModelUtils.get_last_record(cls)

        current_data = {"update_datetime": data.date_time.strftime("%d/%m/%Y à %H:%M"),
                        "temperature": round(data.temperature, 1) if data.temperature is not None else "-",
                        "humidity": data.humidity if data.humidity is not None else "-",
                        "dew_point": round(data.dew_point, 1) if data.dew_point is not None else "-",
                        "wind": data.wind if data.wind is not None else "-",
                        "gust": round(data.gust, 1) if data.gust is not None else "-",
                        "wind_angle": data.wind_angle if data.wind_angle is not None else "-",
                        "wind_direction": ModelUtils.get_wind_direction(data.wind_angle) if data.wind_angle is not None else "-",
                        "rain_1h": round(data.rain_1h, 1) if data.rain_1h is not None else "-",
                        "uv": data.uv if data.uv is not None else "-",
                        }

        return current_data

    @classmethod
    def temperature_extremes_today(cls):
        return ModelUtils.get_temperature_extremes_today(cls)

    @classmethod
    def cumulative_rain_today(cls):
        return ModelUtils.get_cumulative_rain_today(cls)

    @classmethod
    def caca_1h(cls):
        ModelUtils.get_rain_1h(cls)

    @classmethod
    def maximum_gust_today(cls):
        return ModelUtils.get_maximum_gust_today(cls)


with app.app_context():
    SaintMartinDheresData.caca_1h()
