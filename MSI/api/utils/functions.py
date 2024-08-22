from MSI.models import SaintIsmierData, SaintMartinDheresData, LansEnVercorsData


def get_model_class(station_name):
    return {"saint-ismier": SaintIsmierData,
            "saint-martin-d-heres": SaintMartinDheresData,
            "lans-en-vercors": LansEnVercorsData,
            }.get(station_name, None)


# def get_schema(station_name):
#     return {"saint-ismier": MeteoLiveSaintIsmierSchema,
#             }.get(station_name, None)
