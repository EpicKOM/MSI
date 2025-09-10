from MSI import ma
from marshmallow import validate


# Station Metadata Schema-----------------------------------------------------------------------------------------------
class StationSchema(ma.Schema):
    city = ma.String(dump_only=True)
    latitude = ma.Float(dump_only=True)
    longitude = ma.Float(dump_only=True)
    elevation = ma.Integer(dump_only=True)
    network = ma.String(dump_only=True)
    has_trend = ma.Boolean(dump_only=True)
    has_pressure = ma.Boolean(dump_only=True)
    has_radiation = ma.Boolean(dump_only=True)


# Units Metadata Schema-------------------------------------------------------------------------------------------------
class UnitsSchema(ma.Schema):
    temperature = ma.String(dump_only=True)
    humidity = ma.String(dump_only=True)
    rain_1h = ma.String(dump_only=True)
    rain_24h = ma.String(dump_only=True)
    wind_speed = ma.String(dump_only=True)
    gust_speed = ma.String(dump_only=True)
    wind_angle = ma.String(dump_only=True)
    pressure = ma.String(dump_only=True)
    dew_point = ma.String(dump_only=True)
    uv = ma.String(dump_only=True)


# Status Schema---------------------------------------------------------------------------------------------------------
class DataStatusSchema(ma.Schema):
    is_table_empty = ma.Boolean(dump_only=True)
    is_data_fresh = ma.Boolean(dump_only=True)


# Current Weather Data Schema-------------------------------------------------------------------------------------------
class WeatherDataSchema(ma.Schema):
    update_datetime = ma.String(dump_only=True)
    temperature = ma.Float(dump_only=True, allow_none=True)
    humidity = ma.Integer(dump_only=True, allow_none=True)
    wind_speed = ma.Float(dump_only=True, allow_none=True)
    gust_speed = ma.Float(dump_only=True, allow_none=True)
    wind_angle = ma.Integer(dump_only=True, allow_none=True)
    wind_direction = ma.String(dump_only=True, allow_none=True)
    rain_1h = ma.Float(dump_only=True, allow_none=True)
    rain_1h_date = ma.String(dump_only=True)
    rain_24h = ma.Float(dump_only=True, allow_none=True)
    pressure = ma.Float(dump_only=True, allow_none=True)
    temperature_trend = ma.String(dump_only=True)
    dew_point = ma.Float(dump_only=True, allow_none=True)
    uv = ma.Integer(dump_only=True, allow_none=True)


# Daily Extremes Data Schema--------------------------------------------------------------------------------------------
class DailyExtremesSchema(ma.Schema):
    tmax = ma.Float(dump_only=True, allow_none=True)
    tmin = ma.Float(dump_only=True, allow_none=True)
    gust_max = ma.Float(dump_only=True, allow_none=True)
    tmax_time = ma.String(dump_only=True)
    tmin_time = ma.String(dump_only=True)
    gust_max_time = ma.String(dump_only=True)


# Complete Data Schema--------------------------------------------------------------------------------------------------
class CurrentWeatherOutputSchema(ma.Schema):
    station = ma.Nested(StationSchema, dump_only=True)
    units = ma.Nested(UnitsSchema, dump_only=True)
    data_status = ma.Nested(DataStatusSchema, dump_only=True)
    current_weather_data = ma.Nested(WeatherDataSchema, dump_only=True)
    daily_extremes = ma.Nested(DailyExtremesSchema, dump_only=True)


# Live Charts Input Schema----------------------------------------------------------------------------------------------
class LiveChartsInputSchema(ma.Schema):
    data_name = ma.String(required=True, validate=validate.OneOf(["temperature", "rain", "wind", "wind_direction",
                                                                  "humidity", "pressure", "uv"]))
    interval_duration = ma.Integer(required=True, validate=validate.OneOf([1, 2, 3, 7]))


class LiveChartsOutputSchema(ma.Schema):
    datetime = ma.List(ma.String(), dump_only=True)
    temperature = ma.List(ma.Float(allow_none=True), dump_only=True)
    dew_point = ma.List(ma.Float(allow_none=True), dump_only=True)
    rain_1h = ma.List(ma.Float(allow_none=True), dump_only=True)
    wind_speed = ma.List(ma.Float(allow_none=True), dump_only=True)
    gust_speed = ma.List(ma.Float(allow_none=True), dump_only=True)
    wind_direction = ma.List(ma.Float(allow_none=True), dump_only=True)
    humidity = ma.List(ma.Integer(allow_none=True), dump_only=True)
    pressure = ma.List(ma.Float(allow_none=True), dump_only=True)
    uv = ma.List(ma.Integer(allow_none=True), dump_only=True)
