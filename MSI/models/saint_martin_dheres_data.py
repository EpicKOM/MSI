from MSI import app, db
from MSI.models.utils import ModelUtils
import datetime


class SaintMartinDheresData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, nullable=False)
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
                        "temperature": round(data.temperature, 1),
                        "humidity": data.humidity,
                        "dew_point": round(data.dew_point, 1),
                        "wind": data.wind,
                        "gust": round(data.gust, 1),
                        "wind_angle": data.wind_angle,
                        "wind_direction": ModelUtils.get_wind_direction(data.wind_angle),
                        "rain_1h": round(data.rain_1h, 1),
                        "uv": data.uv,
                        }

        return current_data

    @classmethod
    def temperature_extremes_today(cls):
        return ModelUtils.get_temperature_extremes_today(cls)

    @classmethod
    def cumulative_rain_today(cls):
        return ModelUtils.get_cumulative_rain_today(cls)

    @classmethod
    def maximum_gust_today(cls):
        return ModelUtils.get_maximum_gust_today(cls)


# with app.app_context():
#     SaintMartinDheresData.maximum_gust_today()
