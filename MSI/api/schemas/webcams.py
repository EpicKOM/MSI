from MSI import ma


class CoordinatesSchema(ma.Schema):
    lat = ma.Float(dump_only=True)
    lng = ma.Float(dump_only=True)


class WebcamSchema(ma.Schema):
    title = ma.String(dump_only=True)
    coordinates = ma.Nested(CoordinatesSchema, dump_only=True)
    elevation = ma.Integer(dump_only=True)
    url = ma.String(dump_only=True)
    tags = ma.List(ma.String(), dump_only=True)
    recording = ma.Boolean(dump_only=True)
