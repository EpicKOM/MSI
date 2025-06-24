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
    indice = ma.Integer(dump_only=True, allow_none=True, required=True)


class PollutionDataSchema(ma.Schema):
    date_echeance = ma.String(dump_only=True)
    indice = ma.Integer(dump_only=True, allow_none=True, required=True)
    qualificatif = ma.String(dump_only=True, allow_none=True, required=True)
    vigilance = ma.Boolean(dump_only=True, allow_none=True, required=True)
    sous_indices = ma.Dict(
        keys=ma.String(dump_only=True, allow_none=True, required=True),
        values=ma.Nested(SubIndexSchema)
    )


class PollutionOutputSchema(ma.Schema):
    echeance = ma.List(ma.Nested(PollutionDataSchema))
