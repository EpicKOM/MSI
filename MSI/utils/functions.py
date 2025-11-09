from MSI.models import (SaintIsmierData,
                        SaintMartinDheresData,
                        LansEnVercorsData,
                        SaintPancrasseData)


def get_station_class(station_name: str):
    return {"saint-ismier": SaintIsmierData,
            "saint-martin-d-heres": SaintMartinDheresData,
            "lans-en-vercors": LansEnVercorsData,
            "saint-pancrasse": SaintPancrasseData}.get(station_name, None)
