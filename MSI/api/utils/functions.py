from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData
from MSI.schemas import SaintIsmierSchema, SaintMartinDheresSchema, LansEnVercorsSchema


def get_model_class(station_name):
    return {"saint-ismier": SaintIsmierData,
            "saint-martin-d-heres": SaintMartinDheresData,
            "lans-en-vercors": LansEnVercorsData,
            }.get(station_name, None)


def get_schema(station_name):
    return {"saint-ismier": SaintIsmierSchema,
            "saint-martin-d-heres": SaintMartinDheresSchema,
            "lans-en-vercors": LansEnVercorsSchema
            }.get(station_name, None)
