from MSI.data_loaders import Metadata


def get_meteo_live(station_name, DataClass):
    data_status = DataClass.get_data_status()
    context = {"station": Metadata.get_station_data(station_name),
               "units": Metadata.get_units_data(station_name),
               "data_status": data_status}

    if not data_status["is_table_empty"]:
        context.update(current_weather_data=DataClass.get_current_weather_data(),
                       daily_extremes=DataClass.get_daily_extremes())

    return context
