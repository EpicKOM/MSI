from MSI import db
import datetime


class MeteoLiveUtils:

    # ------------METEO LIVE--------------------------------------------------------------------------------------------
    @staticmethod
    def get_check_reception(cls):
        """
        Checks if there has been a reception error based on the time elapsed
        since the last record was received.

        Returns:
            bool: True if there is a reception error, False otherwise.
        """
        current_time = datetime.datetime.now()
        last_record_datetime = MeteoLiveUtils.get_last_record_datetime(cls)
        delta_time = current_time - last_record_datetime
        deadline = datetime.timedelta(hours=3)

        if delta_time >= deadline:
            reception_error = True

        else:
            reception_error = False

        return reception_error

    @staticmethod
    def get_last_record(cls):
        """
        Retrieves the last record from the database table associated with the class.

        Returns:
            Model or None: The last record retrieved from the database table, or None if no records are found.
        """
        return cls.query.order_by(cls.id.desc()).first()

    @staticmethod
    def get_wind_direction(wind_angle):
        """
        Determines the wind direction based on the given wind angle.

        Args:
            wind_angle (float): The wind angle in degrees.

        Returns:
            str: The wind direction as a cardinal or intercardinal direction abbreviation.
        """
        COMPASS_ROSE = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(COMPASS_ROSE, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 45: "NE", 67.5: "ENE", 90: "E", 112.5: "ESE", 135: "SE", 157.5: "SSE",
                      180: "S",
                      202.5: "SSO", 225: "SO", 247.5: "OSO", 270: "O", 292.5: "ONO", 315: "NO", 337.5: "NNO", 360: "N"}

        return directions.get(compass_rose_angle)

    @staticmethod
    def get_last_record_datetime(cls):
        return cls.query.with_entities(db.func.max(cls.date_time)).scalar()

    @staticmethod
    def get_temperature_extremes_today(cls):
        date_beginning_day = MeteoLiveUtils.get_last_record_datetime(cls).date()

        temperature_extremes = cls.query.with_entities(db.func.min(cls.temperature).label("t_min"),
                                                       db.func.max(cls.temperature).label("t_max")) \
            .filter(db.func.DATE(cls.date_time) == date_beginning_day, cls.temperature.isnot(None)).first()

        t_max = temperature_extremes.t_max
        t_min = temperature_extremes.t_min

        t_max_time = cls.query.with_entities(db.func.max(cls.date_time)).filter_by(temperature=t_max).scalar()
        t_min_time = cls.query.with_entities(db.func.max(cls.date_time)).filter_by(temperature=t_min).scalar()

        temperature_extremes_today = {"tmax": round(t_max, 1) if t_max is not None else "-",
                                      "tmin": round(t_min, 1) if t_min is not None else "-",
                                      "tmax_time": t_max_time.strftime("%H:%M") if t_max is not None else "-",
                                      "tmin_time": t_min_time.strftime("%H:%M") if t_min is not None else "-"
                                      }

        return temperature_extremes_today

    @staticmethod
    def get_cumulative_rain_today(cls):
        date_beginning_day = MeteoLiveUtils.get_last_record_datetime(cls).date()

        data_rain_today = cls.query.with_entities(cls.rain_1h).filter(db.func.DATE(cls.date_time) == date_beginning_day,
                                                                      cls.rain_1h.isnot(None)).all()

        data_rain_today_list = [x[0] for x in data_rain_today]

        cumulative_rain_today = round(sum(data_rain_today_list), 1)

        return cumulative_rain_today

    @staticmethod
    def get_rain_1h(cls):
        rain_measurement_end_date = MeteoLiveUtils.get_last_record_datetime(cls).replace(minute=0)
        rain_measurement_start_date = rain_measurement_end_date - datetime.timedelta(hours=1)

        data_rain_1h = cls.query.with_entities(cls.rain_1h).filter(cls.date_time == rain_measurement_end_date,
                                                                   cls.rain_1h.isnot(None)).scalar()

        rain_1h = {"rain_1h": round(data_rain_1h, 1) if data_rain_1h is not None else "-",
                   "rain_1h_date": f"Mesure effectuée entre {rain_measurement_start_date.strftime('%H:%M')} et "
                                   f"{rain_measurement_end_date.strftime('%H:%M')}" if data_rain_1h is not None else "-"
                   }

        return rain_1h

    @staticmethod
    def get_maximum_gust_today(cls):
        date_beginning_day = MeteoLiveUtils.get_last_record_datetime(cls).date()

        gust_max = cls.query.with_entities(db.func.max(cls.gust)).filter(
            db.func.DATE(cls.date_time) == date_beginning_day,
            cls.gust.isnot(None)).scalar()
        gust_max_time = cls.query.with_entities(db.func.max(cls.date_time)).filter_by(gust=gust_max).scalar()

        maximum_gust_today = {"gust_max": round(gust_max, 1) if gust_max is not None else "-",
                              "gust_max_time": gust_max_time.strftime("%H:%M") if gust_max is not None else "-"
                              }

        return maximum_gust_today

    @staticmethod
    def get_current_charts_data(cls, interval_duration):
        data_start_date = MeteoLiveUtils.get_last_record_datetime(cls) - datetime.timedelta(interval_duration)

        current_charts_data = cls.query.filter(cls.date_time >= data_start_date).all()
        current_rain_chart_data = cls.query.with_entities(cls.rain_1h, cls.date_time).filter(cls.date_time >= data_start_date, cls.rain_1h.isnot(None)).all()
        current_wind_direction_chart_data = MeteoLiveUtils.get_wind_direction_chart_data(cls, data_start_date)

        return [current_charts_data, current_rain_chart_data, current_wind_direction_chart_data]

    @staticmethod
    def get_wind_direction_chart_data(cls, data_start_date):
        wind_angle_data = cls.query.with_entities(cls.wind_angle).filter(cls.date_time >= data_start_date, cls.wind > 0,
                                                                         cls.wind_angle.isnot(None)).all()

        wind_direction_counts = {
            "N": 0, "NNE": 0, "NE": 0, "ENE": 0, "E": 0, "ESE": 0,
            "SE": 0, "SSE": 0, "S": 0, "SSO": 0, "SO": 0, "OSO": 0,
            "O": 0, "ONO": 0, "NO": 0, "NNO": 0
        }

        for wind_angle in wind_angle_data:
            direction = MeteoLiveUtils.get_wind_direction(wind_angle[0])
            if direction in wind_direction_counts:
                wind_direction_counts[direction] += 1

        total = sum(wind_direction_counts.values())

        results = [round(MeteoLiveUtils.wind_direction_percentage(wind_direction_counts[direction], total), 1)
                   for direction in ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"]]

        return results

    @staticmethod
    def wind_direction_percentage(part, total):
        return 100 * part / total
