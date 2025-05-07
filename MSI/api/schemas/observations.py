from marshmallow import validate
from MSI import ma


# Mountain Weather Output Schema----------------------------------------------------------------------------------------
class MountainWeatherOutputSchema(ma.Schema):
    title = ma.String(dump_only=True, required=True)
    snow_cover = ma.Dict(dump_only=True, required=True)
    bra = ma.String(dump_only=True, required=True)
