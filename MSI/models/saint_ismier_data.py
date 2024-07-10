from MSI import app, db
from MSI.models.meteo_live_utils import MeteoLiveUtils


class SaintIsmierData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, index=True)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Integer)
    wind = db.Column(db.Integer)
    gust = db.Column(db.Integer)
    wind_angle = db.Column(db.Integer)
    rain_1h = db.Column(db.Float)
    pressure = db.Column(db.Float)
    temperature_trend = db.Column(db.String(6))

    @classmethod
    def current_data(cls):
        try:
            data = MeteoLiveUtils.get_last_record(cls)
            print(data)
            temperature_trend = data.temperature_trend
            print(temperature_trend)
            print(type(temperature_trend))

        except Exception as e:
            print(e)
            # app.logger.exception(
            #     "[SaintMartinDheresData - current_data] - Erreur lors de la récupération des données actuelles.")
