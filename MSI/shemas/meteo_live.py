from MSI import ma


class SaintIsmierSchema(ma.Schema):
    update_datetime = ma.String()
    temperature = ma.Float()
    humidity = ma.Integer()
    wind = ma.Integer()
    gust = ma.Integer()
    wind_angle = ma.Integer()
    wind_direction = ma.String()
    pressure = ma.Float()
    temperature_trend = ma.String()


class InputLiveChartsSchema(ma.Schema):
    data_name = ma.String(required=True)
    interval_duration = ma.Integer(required=True)

