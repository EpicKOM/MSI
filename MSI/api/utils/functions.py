from MSI.data_loaders import get_station_metadata, get_units_metadata


def get_meteo_live(station_name, DataClass):
    data_status = DataClass.get_data_status()
    context = {"station": get_station_metadata(station_name),
               "units": get_units_metadata(station_name),
               "data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=DataClass.get_current_weather_data(),
                       daily_extremes=DataClass.get_daily_extremes())

    return context
