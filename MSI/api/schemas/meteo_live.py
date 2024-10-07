from MSI import ma
from marshmallow import validate


# Station Metadata Schema-----------------------------------------------------------------------------------------------
class StationSchema(ma.Schema):
    city = ma.String(dump_only=True)
    latitude = ma.Float(dump_only=True)
    longitude = ma.Float(dump_only=True)
    elevation = ma.Integer(dump_only=True)
    type = ma.String(dump_only=True)


# Units Metadata Schema-------------------------------------------------------------------------------------------------
class BaseUnitsSchema(ma.Schema):
    temperature = ma.String(dump_only=True)
    humidity = ma.String(dump_only=True)
    rain_1h = ma.String(dump_only=True)
    rain_24h = ma.String(dump_only=True)
    wind_speed = ma.String(dump_only=True)
    gust_speed = ma.String(dump_only=True)
    wind_angle = ma.String(dump_only=True)


class SaintIsmierUnitsSchema(BaseUnitsSchema):
    pressure = ma.String(dump_only=True)


class LansEnVercorsUnitsSchema(BaseUnitsSchema):
    pressure = ma.String(dump_only=True)
    dew_point = ma.String(dump_only=True)


class SaintMartinDheresUnitsSchema(BaseUnitsSchema):
    uv = ma.String(dump_only=True)
    dew_point = ma.String(dump_only=True)


# Status Schema---------------------------------------------------------------------------------------------------------
class DataStatusSchema(ma.Schema):
    is_table_empty = ma.Boolean(dump_only=True)
    is_data_fresh = ma.Boolean(dump_only=True)


# Current Weather Data Schema-------------------------------------------------------------------------------------------
class BaseWeatherDataSchema(ma.Schema):
    update_datetime = ma.String(dump_only=True)
    temperature = ma.Float(required=True, dump_only=True, allow_none=True)
    humidity = ma.Integer(dump_only=True, allow_none=True)
    wind_speed = ma.Integer(dump_only=True, allow_none=True)
    gust_speed = ma.Integer(dump_only=True, allow_none=True)
    wind_angle = ma.Integer(dump_only=True, allow_none=True)
    wind_direction = ma.String(dump_only=True, allow_none=True)
    rain_1h = ma.Float(dump_only=True, allow_none=True)
    rain_1h_date = ma.String(dump_only=True)
    rain_24h = ma.Float(dump_only=True, allow_none=True)


class SaintIsmierWeatherDataSchema(BaseWeatherDataSchema):
    pressure = ma.Float(dump_only=True, allow_none=True)
    temperature_trend = ma.String(dump_only=True)


class LansEnVercorsWeatherDataSchema(BaseWeatherDataSchema):
    pressure = ma.Float(dump_only=True, allow_none=True)
    dew_point = ma.Float(dump_only=True, allow_none=True)


class SaintMartinDheresWeatherDataSchema(BaseWeatherDataSchema):
    uv = ma.Integer(dump_only=True, allow_none=True)
    dew_point = ma.Float(dump_only=True, allow_none=True)


# Daily Extremes Data Schema--------------------------------------------------------------------------------------------
class DailyExtremesSchema(ma.Schema):
    tmax = ma.Float(dump_only=True, allow_none=True)
    tmin = ma.Float(dump_only=True, allow_none=True)
    gust_max = ma.Float(dump_only=True, allow_none=True)
    tmax_time = ma.String(dump_only=True)
    tmin_time = ma.String(dump_only=True)
    gust_max_time = ma.String(dump_only=True)


# Complete Data Schema--------------------------------------------------------------------------------------------------
class SaintIsmierDataSchema(ma.Schema):
    station = ma.Nested(StationSchema)
    units = ma.Nested(SaintIsmierUnitsSchema)
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(SaintIsmierWeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


class SaintMartinDheresDataSchema(ma.Schema):
    station = ma.Nested(StationSchema)
    units = ma.Nested(SaintMartinDheresUnitsSchema)
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(SaintMartinDheresWeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


class LansEnVercorsDataSchema(ma.Schema):
    station = ma.Nested(StationSchema)
    units = ma.Nested(LansEnVercorsUnitsSchema)
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(LansEnVercorsWeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


# Live Charts Input Schema--------------------------------------------------------------------------------------------------
class LiveChartsInputSchema(ma.Schema):
    data_name = ma.String(required=True, validate=validate.OneOf(["temperature", "rain", "wind", "wind_direction",
                                                                  "humidity", "pressure", "uv"]))
    interval_duration = ma.Integer(required=True, validate=validate.OneOf([1, 2, 3, 7]))


class LiveChartsDataSchema(ma.Schema):
    datetime = ma.List(ma.String())
    temperature = ma.List(ma.Float())
    dew_point = ma.List(ma.Float())
    rain_1h = ma.List(ma.Float())
    wind = ma.List(ma.Integer())
    gust = ma.List(ma.Integer())
    wind_direction = ma.List(ma.Float())
    humidity = ma.List(ma.Integer())
    pressure = ma.List(ma.Float())
    uv = ma.List(ma.Integer())
