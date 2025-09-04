from MSI import app, db
from MSI.models import MeteoLiveUtils
from typing import Dict, Any, List


class SaintIsmierData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime, index=True)
    temperature = db.Column(db.Float)
    humidity = db.Column(db.Integer)
    wind_speed = db.Column(db.Integer)
    gust_speed = db.Column(db.Integer)
    wind_angle = db.Column(db.Integer)
    rain_1h = db.Column(db.Float)
    pressure = db.Column(db.Float)
    temperature_trend = db.Column(db.String(6))

    @classmethod
    def get_data_status(cls) -> Dict[str, bool]:
        try:
            is_table_empty = cls.query.first() is None
            data_status = {"is_table_empty": is_table_empty,
                           "is_data_fresh": False}

            if not is_table_empty:
                data_status["is_data_fresh"] = MeteoLiveUtils.is_data_fresh(cls)

            return data_status

        except Exception:
            app.logger.exception(
                "[SaintIsmierData::get_data_status] - Erreur lors de la récupération du status des données de la table"
                " saint_ismier_data."
            )

            return {
                "is_table_empty": True,
                "is_data_fresh": False
            }

    @classmethod
    def get_current_weather_data(cls) -> Dict[str, Any]:
        try:
            last_record = MeteoLiveUtils.get_last_record(cls)

            base_weather_data = {"update_datetime": last_record.date_time.strftime("%d/%m/%Y à %H:%M"),
                                 "temperature": (
                                     round(last_record.temperature, 1)
                                     if last_record.temperature is not None
                                     else None
                                 ),
                                 "humidity": last_record.humidity if last_record.humidity is not None else None,
                                 "wind_speed": last_record.wind_speed if last_record.wind_speed is not None else None,
                                 "gust_speed": last_record.gust_speed if last_record.gust_speed is not None else None,
                                 "wind_angle": last_record.wind_angle if last_record.wind_angle is not None else None,
                                 "wind_direction": MeteoLiveUtils.get_wind_direction(
                                     last_record.wind_angle) if last_record.wind_angle is not None else None,
                                 "rain_24h": MeteoLiveUtils.get_rain_24h(cls),
                                 "pressure": (
                                     round(last_record.pressure, 1)
                                     if last_record.pressure is not None
                                     else None
                                 ),
                                 "temperature_trend": (
                                     last_record.temperature_trend
                                     if last_record.temperature_trend else
                                     "stable"
                                 )
                                 }

            rain_data = MeteoLiveUtils.get_rain_1h(cls)
            current_weather_data = base_weather_data | rain_data

            return current_weather_data

        except Exception:
            app.logger.exception(
                "[SaintIsmierData::get_current_weather_data] - Erreur lors de la récupération des données actuelles."
            )

            return {
                "update_datetime": None,
                "temperature": None,
                "humidity": None,
                "wind_speed": None,
                "gust_speed": None,
                "wind_angle": None,
                "wind_direction": None,
                "rain_24h": None,
                "rain_1h": None,
                "rain_1h_date": None,
                "pressure": None,
                "temperature_trend": "stable"
            }

    @classmethod
    def get_daily_extremes(cls) -> Dict[str, Any]:
        try:
            daily_temperature_extremes = MeteoLiveUtils.get_daily_temperature_extremes(cls)
            daily_max_gust = MeteoLiveUtils.get_daily_max_gust(cls)

            daily_extremes = daily_temperature_extremes | daily_max_gust

            return daily_extremes

        except Exception:
            app.logger.exception(
                "[SaintIsmierData::get_daily_extremes] - Erreur lors de la récupération des températures et des rafales"
                " extrêmes du jour."
            )

            return {
                "tmax": None,
                "tmin": None,
                "tmax_time": None,
                "tmin_time": None,
                "gust_max": None,
                "gust_max_time": None}

    @classmethod
    def current_charts_data(cls, data_name: str, interval_duration: int) -> Dict[str, List[Any]]:
        try:
            column_mapping = {
                "temperature": [cls.date_time, cls.temperature],
                "wind": [cls.date_time, cls.wind_speed, cls.gust_speed],
                "humidity": [cls.date_time, cls.humidity],
                "pressure": [cls.date_time, cls.pressure],
                "rain": [cls.date_time, cls.rain_1h],
                "wind_direction": []
            }

            current_chart_data = MeteoLiveUtils.get_current_charts_data(cls,
                                                                        data_name,
                                                                        interval_duration,
                                                                        column_mapping)

            return current_chart_data

        except Exception:
            app.logger.exception("[SaintIsmierData::current_charts_data] - Erreur lors de la récupération des "
                                 "données pour les graphiques Live.")
