from marshmallow import validate

from MSI import ma


class BaseWeatherStationSchema(ma.Schema):
    update_datetime = ma.String(dump_only=True)
    temperature = ma.Float(dump_only=True)
    humidity = ma.Integer(dump_only=True)
    wind = ma.Integer(dump_only=True)
    gust = ma.Integer(dump_only=True)
    wind_angle = ma.Integer(dump_only=True)
    wind_direction = ma.String(dump_only=True)


class SaintIsmierSchema(BaseWeatherStationSchema):
    pressure = ma.Float(dump_only=True)
    temperature_trend = ma.String(dump_only=True)


class LansEnVercorsSchema(BaseWeatherStationSchema):
    pressure = ma.Float(dump_only=True)
    dew_point = ma.Float(dump_only=True)


class SaintMartinDheresSchema(BaseWeatherStationSchema):
    uv = ma.Integer(dump_only=True)
    dew_point = ma.Float(dump_only=True)


class InputLiveChartsSchema(ma.Schema):
    data_name = ma.String(required=True)
    interval_duration = ma.Integer(required=True)

