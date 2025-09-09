from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData


def get_station_class(station_name: str):
    return {"saint-ismier": SaintIsmierData,
            "saint-martin-d-heres": SaintMartinDheresData,
            "lans-en-vercors": LansEnVercorsData}.get(station_name, None)


def get_station_template(station_name: str):
    return {"saint-ismier": "meteo_live/meteo_live_saint_ismier.html",
            "saint-martin-d-heres": "meteo_live/meteo_live_saint_martin_dheres.html",
            "lans-en-vercors": "meteo_live/meteo_live_lans_en_vercors.html"}.get(station_name, None)


