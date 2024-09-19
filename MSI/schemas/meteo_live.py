from marshmallow import validate

from MSI import ma


class BaseCurrentWeatherDataSchema(ma.Schema):
    update_datetime = ma.String(dump_only=True)
    temperature = ma.Float(dump_only=True)
    humidity = ma.Integer(dump_only=True)
    wind = ma.Integer(dump_only=True)
    gust = ma.Integer(dump_only=True)
    wind_angle = ma.Integer(dump_only=True)
    wind_direction = ma.String(dump_only=True)
    rain_1h = ma.Float(dump_only=True, allow_none=True)
    rain_1h_date = ma.String(dump_only=True)
    rain_24h = ma.Float(dump_only=True)


class SaintIsmierCurrentWeatherDataSchema(BaseCurrentWeatherDataSchema):
    pressure = ma.Float(dump_only=True)
    temperature_trend = ma.String(dump_only=True)


class LansEnVercorsCurrentWeatherDataSchema(BaseCurrentWeatherDataSchema):
    pressure = ma.Float(dump_only=True)
    dew_point = ma.Float(dump_only=True)


class SaintMartinDheresCurrentWeatherDataSchema(BaseCurrentWeatherDataSchema):
    uv = ma.Integer(dump_only=True)
    dew_point = ma.Float(dump_only=True)


class TemperatureExtremesTodaySchema(ma.Schema):
    tmax = ma.Float(dump_only=True)
    tmin = ma.Float(dump_only=True)
    tmax_time = ma.String(dump_only=True)
    tmin_time = ma.String(dump_only=True)


class MaximumGustTodaySchema(ma.Schema):
    gust_max = ma.Float(dump_only=True)
    gust_max_time = ma.String(dump_only=True)


class DataStatusSchema(ma.Schema):
    is_table_empty = ma.Boolean(dump_only=True)
    is_data_fresh = ma.Boolean(dump_only=True)


class SaintIsmierSchema(ma.Schema):
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(SaintIsmierCurrentWeatherDataSchema)
    temperature_extremes_today = ma.Nested(TemperatureExtremesTodaySchema)
    maximum_gust_today = ma.Nested(MaximumGustTodaySchema)


class SaintMartinDheresSchema(ma.Schema):
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(SaintMartinDheresCurrentWeatherDataSchema)
    temperature_extremes_today = ma.Nested(TemperatureExtremesTodaySchema)
    maximum_gust_today = ma.Nested(MaximumGustTodaySchema)


class LansEnVercorsSchema(ma.Schema):
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(LansEnVercorsCurrentWeatherDataSchema)
    temperature_extremes_today = ma.Nested(TemperatureExtremesTodaySchema)
    maximum_gust_today = ma.Nested(MaximumGustTodaySchema)


class InputLiveChartsSchema(ma.Schema):
    data_name = ma.String(required=True)
    interval_duration = ma.Integer(required=True)

