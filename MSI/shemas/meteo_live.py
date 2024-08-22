from MSI import ma


class LiveChartsSchema(ma.Schema):
    data_name = ma.String(required=True)
    interval_duration = ma.Integer(required=True)

