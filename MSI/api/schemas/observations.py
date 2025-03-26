from marshmallow import validate
from MSI import ma


# Mountain Weather Output Schema----------------------------------------------------------------------------------------
class MountainWeatherOutputSchema(ma.Schema):
    title = ma.String(dump_only=True, required=True)
    snow_cover_url = ma.List(ma.String(), dump_only=True, required=True)
    bra_url = ma.String(dump_only=True, required=True)


# Mountain Weather Input Schema-----------------------------------------------------------------------------------------
class MountainWeatherInputSchema(ma.Schema):
    interval_duration = ma.String(required=True, validate=validate.OneOf(["week", "season"]))
