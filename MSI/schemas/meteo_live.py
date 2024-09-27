from marshmallow import validate
from MSI import ma


class DataStatusSchema(ma.Schema):
    is_table_empty = ma.Boolean(dump_only=True)
    is_data_fresh = ma.Boolean(dump_only=True)


class BaseWeatherDataSchema(ma.Schema):
    update_datetime = ma.String(dump_only=True)
    temperature = ma.Float(dump_only=True, allow_none=True)
    humidity = ma.Integer(dump_only=True, allow_none=True)
    wind_speed = ma.Integer(dump_only=True, allow_none=True)
    gust_speed = ma.Integer(dump_only=True, allow_none=True)
    wind_angle = ma.Integer(dump_only=True, allow_none=True)
    wind_direction = ma.String(dump_only=True, allow_none=True)
    rain_1h = ma.Float(dump_only=True, allow_none=True)
    rain_1h_date = ma.String(dump_only=True)
    rain_24h = ma.Float(dump_only=True, allow_none=True)


class DailyExtremesSchema(ma.Schema):
    tmax = ma.Float(dump_only=True, allow_none=True)
    tmin = ma.Float(dump_only=True, allow_none=True)
    tmax_time = ma.String(dump_only=True)
    tmin_time = ma.String(dump_only=True)


class SaintIsmierWeatherDataSchema(BaseWeatherDataSchema):
    pressure = ma.Float(dump_only=True, allow_none=True)
    temperature_trend = ma.String(dump_only=True)


class LansEnVercorsWeatherDataSchema(BaseWeatherDataSchema):
    pressure = ma.Float(dump_only=True, allow_none=True)
    dew_point = ma.Float(dump_only=True, allow_none=True)


class SaintMartinDheresWeatherDataSchema(BaseWeatherDataSchema):
    uv = ma.Integer(dump_only=True, allow_none=True)
    dew_point = ma.Float(dump_only=True, allow_none=True)


class SaintIsmierDataSchema(ma.Schema):
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(SaintIsmierWeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


class SaintMartinDheresDataSchema(ma.Schema):
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(SaintMartinDheresWeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


class LansEnVercorsDataSchema(ma.Schema):
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(LansEnVercorsWeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


class TestSchema(ma.Schema):
    temperature = ma.Float(dump_only=True)
    humidity = ma.Integer(dump_only=True)


class InputLiveChartsSchema(ma.Schema):
    data_name = ma.String(required=True)
    interval_duration = ma.Integer(required=True)

