from marshmallow import validate
from MSI import ma


# Station Metadata Schema-----------------------------------------------------------------------------------------------
class StationSchema(ma.Schema):
    city = ma.String(dump_only=True, required=True)
    latitude = ma.Float(dump_only=True, required=True)
    longitude = ma.Float(dump_only=True, required=True)
    elevation = ma.Integer(dump_only=True, required=True)
    type = ma.String(dump_only=True, required=True)


# Units Metadata Schema-------------------------------------------------------------------------------------------------
class UnitsSchema(ma.Schema):
    temperature = ma.String(dump_only=True, required=True)
    humidity = ma.String(dump_only=True, required=True)
    rain_1h = ma.String(dump_only=True, required=True)
    rain_24h = ma.String(dump_only=True, required=True)
    wind_speed = ma.String(dump_only=True, required=True)
    gust_speed = ma.String(dump_only=True, required=True)
    wind_angle = ma.String(dump_only=True, required=True)
    pressure = ma.String(dump_only=True)
    dew_point = ma.String(dump_only=True)
    uv = ma.String(dump_only=True)


# Status Schema---------------------------------------------------------------------------------------------------------
class DataStatusSchema(ma.Schema):
    is_table_empty = ma.Boolean(dump_only=True, required=True)
    is_data_fresh = ma.Boolean(dump_only=True, required=True)


# Current Weather Data Schema-------------------------------------------------------------------------------------------
class WeatherDataSchema(ma.Schema):
    update_datetime = ma.String(dump_only=True)
    temperature = ma.Float(dump_only=True, allow_none=True, required=True)
    humidity = ma.Integer(dump_only=True, allow_none=True, required=True)
    wind_speed = ma.Integer(dump_only=True, allow_none=True, required=True)
    gust_speed = ma.Integer(dump_only=True, allow_none=True, required=True)
    wind_angle = ma.Integer(dump_only=True, allow_none=True, required=True)
    wind_direction = ma.String(dump_only=True, allow_none=True, required=True)
    rain_1h = ma.Float(dump_only=True, allow_none=True, required=True)
    rain_1h_date = ma.String(dump_only=True, required=True)
    rain_24h = ma.Float(dump_only=True, allow_none=True, required=True)
    pressure = ma.Float(dump_only=True, allow_none=True)
    temperature_trend = ma.String(dump_only=True)
    dew_point = ma.Float(dump_only=True, allow_none=True)
    uv = ma.Integer(dump_only=True, allow_none=True)


# Daily Extremes Data Schema--------------------------------------------------------------------------------------------
class DailyExtremesSchema(ma.Schema):
    tmax = ma.Float(dump_only=True, allow_none=True, required=True)
    tmin = ma.Float(dump_only=True, allow_none=True, required=True)
    gust_max = ma.Float(dump_only=True, allow_none=True, required=True)
    tmax_time = ma.String(dump_only=True, required=True)
    tmin_time = ma.String(dump_only=True, required=True)
    gust_max_time = ma.String(dump_only=True, required=True)


# Complete Data Schema--------------------------------------------------------------------------------------------------
class CurrentWeatherOutputSchema(ma.Schema):
    station = ma.Nested(StationSchema)
    units = ma.Nested(UnitsSchema)
    data_status = ma.Nested(DataStatusSchema)
    current_weather_data = ma.Nested(WeatherDataSchema)
    daily_extremes = ma.Nested(DailyExtremesSchema)


# Live Charts Input Schema--------------------------------------------------------------------------------------------------
class LiveChartsInputSchema(ma.Schema):
    data_name = ma.String(required=True, validate=validate.OneOf(["temperature", "rain", "wind", "wind_direction",
                                                                  "humidity", "pressure", "uv"]))
    interval_duration = ma.Integer(required=True, validate=validate.OneOf([1, 2, 3, 7]))


class LiveChartsOutputSchema(ma.Schema):
    datetime = ma.List(ma.String(), dump_only=True)
    temperature = ma.List(ma.Float(allow_none=True), dump_only=True)
    dew_point = ma.List(ma.Float(allow_none=True), dump_only=True)
    rain_1h = ma.List(ma.Float(allow_none=True), dump_only=True)
    wind_speed = ma.List(ma.Integer(allow_none=True), dump_only=True)
    gust_speed = ma.List(ma.Integer(allow_none=True), dump_only=True)
    wind_direction = ma.List(ma.Float(allow_none=True), dump_only=True)
    humidity = ma.List(ma.Integer(allow_none=True), dump_only=True)
    pressure = ma.List(ma.Float(allow_none=True), dump_only=True)
    uv = ma.List(ma.Integer(allow_none=True), dump_only=True)
