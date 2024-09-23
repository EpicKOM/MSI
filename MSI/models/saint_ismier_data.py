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
    def get_data_status(cls):
        try:
            is_table_empty = cls.query.first() is None
            data_status = {"is_table_empty": is_table_empty,
                           "is_data_fresh": False}

            if not is_table_empty:
                data_status["is_data_fresh"] = MeteoLiveUtils.is_data_fresh(cls)

            return data_status

        except Exception:
            app.logger.exception(
                "[SaintIsmierData - get_data_status] - Erreur lors de la récupération du status des données de la table.")

    @classmethod
    def get_current_weather_data(cls):
        try:
            data = MeteoLiveUtils.get_last_record(cls)

            current_data = {"update_datetime": data.date_time.strftime("%d/%m/%Y à %H:%M"),
                            "temperature": round(data.temperature, 1) if data.temperature else None,
                            "humidity": data.humidity if data.humidity else None,
                            "wind_speed": data.wind if data.wind else None,
                            "gust_speed": round(data.gust, 1) if data.gust else None,
                            "wind_angle": data.wind_angle if data.wind_angle else None,
                            "wind_direction": MeteoLiveUtils.get_wind_direction(
                                data.wind_angle) if data.wind_angle else None,
                            "rain_24h": MeteoLiveUtils.get_rain_24h(),
                            "pressure": data.pressure if data.pressure else None,
                            "temperature_trend": data.temperature_trend if data.temperature_trend else "stable"
                            }

            return current_data

        except Exception:
            app.logger.exception(
                "[SaintIsmierData - current_data] - Erreur lors de la récupération des données actuelles.")

    @classmethod
    def temperature_extremes_today(cls):
        try:
            return MeteoLiveUtils.get_temperature_extremes_today(cls)

        except Exception:
            app.logger.exception(
                "[SaintIsmierData - temperature_extremes_today] - Erreur lors de la récupération des températures "
                "extrêmes du jour.")

    @classmethod
    def cumulative_rain_today(cls):
        try:
            return MeteoLiveUtils.get_cumulative_rain_today(cls)

        except Exception:
            app.logger.exception(
                "[SaintIsmierData - cumulative_rain_today] - Erreur lors de la récupération du cumul de pluie du jour.")

    @classmethod
    def rain(cls):
        try:
            return MeteoLiveUtils.get_rain_1h(cls)

        except Exception:
            app.logger.exception(
                "[SaintIsmierData - rain] - Erreur lors de la récupération du cumul de pluie de l'heure précédente.")

    @classmethod
    def maximum_gust_today(cls):
        try:
            return MeteoLiveUtils.get_maximum_gust_today(cls)

        except Exception:
            app.logger.exception(
                "[SaintIsmierData - maximum_gust_today] - Erreur lors de la récupération de la rafale maximale du jour.")

    @classmethod
    def current_charts_data(cls, data_name, interval_duration):
        try:
            column_mapping = {
                "temperature": [cls.date_time, cls.temperature],
                "wind": [cls.date_time, cls.wind, cls.gust],
                "humidity": [cls.date_time, cls.humidity],
                "pressure": [cls.date_time, cls.pressure],
                "rain": [cls.date_time, cls.rain_1h],
                "wind_direction": []
            }

            current_chart_data = MeteoLiveUtils.get_current_charts_data(cls, data_name, interval_duration, column_mapping)

            return current_chart_data

        except Exception:
            app.logger.exception("[SaintIsmierData - current_charts_data] - Erreur lors de la récupération des "
                                 "données pour les graphiques.")
