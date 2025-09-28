from MSI import ma


# Forecasts Output Schema-----------------------------------------------------------------------------------------------
class ForecastsSchema(ma.Schema):
    index = ma.Integer(dump_only=True)
    date = ma.String(dump_only=True)
    frDate = ma.String(dump_only=True)
    day_name = ma.String(dump_only=True)
    pictocode = ma.String(dump_only=True)
    temperature_min = ma.Integer(dump_only=True)
    temperature_max = ma.Integer(dump_only=True)
    temperature_mean = ma.Integer(dump_only=True)
    precipitation = ma.Float(dump_only=True)


class ForecastsChartDataSchema(ma.Schema):
    date = ma.List(ma.String(), dump_only=True)
    temperature_min = ma.List(ma.Integer(), dump_only=True)
    temperature_mean = ma.List(ma.Integer(), dump_only=True)
    temperature_max = ma.List(ma.Integer(), dump_only=True)
    precipitation = ma.List(ma.Float(), dump_only=True)


class ForecastsOutputSchema(ma.Schema):
    is_empty = ma.Boolean(dump_only=True)
    update_datetime = ma.String(dump_only=True)
    is_data_fresh = ma.Boolean(dump_only=True)
    forecasts = ma.List(ma.Nested(ForecastsSchema), dump_only=True)
    forecasts_chart_data = ma.Nested(ForecastsChartDataSchema, dump_only=True)


# Daily Forecasts Output Schema-----------------------------------------------------------------------------------------
class DailyForecastsOutputSchema(ma.Schema):
    date = ma.String(dump_only=True)
    day_name = ma.String(dump_only=True)
    pictocode = ma.String(dump_only=True)
    predictability_label = ma.String(dump_only=True)
    predictability = ma.Integer(dump_only=True)
    temperature_min = ma.Integer(dump_only=True)
    temperature_mean = ma.Integer(dump_only=True)
    temperature_max = ma.Integer(dump_only=True)
    felttemperature_min = ma.Integer(dump_only=True)
    felttemperature_mean = ma.Integer(dump_only=True)
    felttemperature_max = ma.Integer(dump_only=True)
    precipitation = ma.Float(dump_only=True)
    precipitation_hours = ma.Float(dump_only=True)
    precipitation_probability = ma.Integer(dump_only=True)
    convective_precipitation = ma.Float(dump_only=True)
    snow_fraction = ma.Integer(dump_only=True)
    rain_fraction = ma.Integer(dump_only=True)
    windspeed_min = ma.Integer(dump_only=True)
    windspeed_mean = ma.Integer(dump_only=True)
    windspeed_max = ma.Integer(dump_only=True)
    wind_angle = ma.Integer(dump_only=True)
    wind_direction = ma.String(dump_only=True)
    sealevelpressure_min = ma.Integer(dump_only=True)
    sealevelpressure_mean = ma.Integer(dump_only=True)
    sealevelpressure_max = ma.Integer(dump_only=True)
    relativehumidity_min = ma.Integer(dump_only=True)
    relativehumidity_mean = ma.Integer(dump_only=True)
    relativehumidity_max = ma.Integer(dump_only=True)
    sunrise = ma.String(dump_only=True)
    sunset = ma.String(dump_only=True)
    uvindex = ma.Integer(dump_only=True)
    moonrise = ma.String(dump_only=True)
    moonset = ma.String(dump_only=True)
    moonphasename = ma.String(dump_only=True)
