from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData
from MSI.shemas import SaintIsmierSchema


def get_model_class(station_name):
    return {"saint-ismier": SaintIsmierData,
            "saint-martin-d-heres": SaintMartinDheresData,
            "lans-en-vercors": LansEnVercorsData,
            }.get(station_name, None)


def get_schema(station_name):
    return {"saint-ismier": SaintIsmierSchema,
            }.get(station_name, None)
