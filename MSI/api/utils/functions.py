from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData
from MSI.schemas import SaintIsmierSchema, SaintMartinDheresSchema, LansEnVercorsSchema


def get_model_and_schema(station_name):
    return {"saint-ismier": (SaintIsmierData(), SaintIsmierSchema()),
            "saint-martin-d-heres": (SaintMartinDheresData(), SaintMartinDheresSchema()),
            "lans-en-vercors": (LansEnVercorsData(), LansEnVercorsSchema()),
            }.get(station_name, (None, None))
