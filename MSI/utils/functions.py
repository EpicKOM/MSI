from MSI.models import *


def get_data_class(station_name: str):
    return {"saint-ismier": SaintIsmierData,
            "saint-martin-d-heres": SaintMartinDheresData,
            "lans-en-vercors": LansEnVercorsData}.get(station_name, None)
