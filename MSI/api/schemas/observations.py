from marshmallow import validate
from MSI import ma


# Mountain Weather Output Schema----------------------------------------------------------------------------------------
class MountainWeatherOutputSchema(ma.Schema):
    title = ma.String(dump_only=True, required=True)
    snow_cover = ma.Dict(dump_only=True, required=True)
    bra = ma.String(dump_only=True, required=True)


# Pollution Alert Output Schema-----------------------------------------------------------------------------------------
class SubIndexSchema(ma.Schema):
    concentration = ma.Float(dump_only=True, allow_none=True, required=True)
    index = ma.Integer(dump_only=True, allow_none=True, required=True)