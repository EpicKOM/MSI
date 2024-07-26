from MSI import db, app
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
        try:
            return cls.query.first() is None

        except Exception:
            app.logger.exception("[SaintMartinDheresData - table_is_empty] - Erreur lors de la vérification de l'état vide de la table.")

    @classmethod
    def check_is_data_fresh(cls):
        try:
            return MeteoLiveUtils.get_check_is_data_fresh(cls)

        except Exception:
            app.logger.exception("[SaintMartinDheresData - check_reception] - Erreur lors de la vérification de la réception des données.")

    @classmethod
    def current_data(cls):
        try:
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

        except Exception:
            app.logger.exception("[SaintMartinDheresData - current_data] - Erreur lors de la récupération des données actuelles.")

    @classmethod
    def temperature_extremes_today(cls):
        try:
            return MeteoLiveUtils.get_temperature_extremes_today(cls)

        except Exception:
            app.logger.exception("[SaintMartinDheresData - temperature_extremes_today] - Erreur lors de la récupération des températures extrêmes du jour.")

    @classmethod
    def cumulative_rain_today(cls):
        try:
            return MeteoLiveUtils.get_cumulative_rain_today(cls)

        except Exception:
            app.logger.exception("[SaintMartinDheresData - cumulative_rain_today] - Erreur lors de la récupération du cumul de pluie du jour.")

    @classmethod
    def rain(cls):
        try:
            return MeteoLiveUtils.get_rain_1h(cls)

        except Exception:
            app.logger.exception("[SaintMartinDheresData - rain] - Erreur lors de la récupération du cumul de pluie de l'heure précédente.")

    @classmethod
    def maximum_gust_today(cls):
        try:
            return MeteoLiveUtils.get_maximum_gust_today(cls)

        except Exception:
            app.logger.exception("[SaintMartinDheresData - maximum_gust_today] - Erreur lors de la récupération de la rafale maximale du jour.")

    @classmethod
    def current_charts_data(cls, data_name, interval_duration):
        try:
            column_mapping = {
                "temperature": [cls.date_time, cls.temperature, cls.dew_point],
                "wind": [cls.date_time, cls.wind, cls.gust],
                "humidity": [cls.date_time, cls.humidity],
                "uv": [cls.date_time, cls.uv],
                "rain": [cls.date_time, cls.rain_1h],
                "wind_direction": []
            }

            current_chart_data = MeteoLiveUtils.get_current_charts_data(cls, data_name, interval_duration, column_mapping)

            return current_chart_data

        except Exception:
            app.logger.exception("[SaintMartinDheresData - current_charts_data] - Erreur lors de la récupération des données pour les graphiques.")
