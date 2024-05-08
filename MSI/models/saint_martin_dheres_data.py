from MSI import app, db
from MSI.models.utils import ModelUtils


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
    def is_empty(cls):
        return cls.query.first() is None

    @classmethod
    def current_data(cls):
        data = ModelUtils.get_last_record(cls)

        current_data = {"update_datetime": data.date_time.strftime("%d/%m/%Y à %H:%M"),
                        "temperature": data.temperature,
                        "humidity": data.humidity,
                        "dew_point": data.dew_point,
                        "wind": data.wind,
                        "gust": data.gust,
                        "wind_direction": data.wind_angle,
                        "rain_1h": data.rain_1h,
                        "uv": data.uv,
                        }

        return current_data


# with app.app_context():
#     print(SaintMartinDheresData.current_data())
