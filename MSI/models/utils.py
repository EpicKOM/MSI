from MSI import db
import datetime


class ModelUtils:

    # ------------METEO LIVE--------------------------------------------------------------------------------------------
    @staticmethod
    def get_check_reception(cls):
        """
        Si la réception des données météo remonte à plus de 3h alors affichage d'un message d'erreur
        """
        current_time = datetime.datetime.now()
        last_record_datetime = ModelUtils.get_last_record_datetime(cls)
        delta_time = current_time - last_record_datetime
        deadline = datetime.timedelta(hours=3)

        if delta_time >= deadline:
            reception_error = True

        else:
            reception_error = False

        return reception_error

    @staticmethod
    def get_last_record(cls):
        return cls.query.order_by(cls.id.desc()).first()

    @staticmethod
    def get_wind_direction(wind_angle):
        COMPASS_ROSE = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(COMPASS_ROSE, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 45: "NE", 67.5: "ENE", 90: "E", 112.5: "ESE", 135: "SE", 157.5: "SSE", 180: "S",
                      202.5: "SSO", 225: "SO", 247.5: "OSO", 270: "O", 292.5: "ONO", 315: "NO", 337.5: "NNO", 360: "N"}
        return directions.get(compass_rose_angle)

    @staticmethod
    def get_last_record_datetime(cls):
        return cls.query.with_entities(db.func.max(cls.date_time)).scalar()

    @staticmethod
    def get_temperature_extremes_today(cls):
        date_beginning_day = ModelUtils.get_last_record_datetime(cls).date()

        temperature_extremes = cls.query.with_entities(db.func.min(cls.temperature).label("t_min"),
                                                       db.func.max(cls.temperature).label("t_max"))\
            .filter(db.func.DATE(cls.date_time) == date_beginning_day, cls.temperature.isnot(None)).first()

        t_max = temperature_extremes.t_max
        t_min = temperature_extremes.t_min

        t_max_time = cls.query.with_entities(db.func.max(cls.date_time)).filter_by(temperature=t_max).scalar()
        t_min_time = cls.query.with_entities(db.func.max(cls.date_time)).filter_by(temperature=t_min).scalar()

        temperature_extremes_today = {"tmax": t_max if t_max is not None else "-",
                                      "tmin": t_min if t_min is not None else "-",
                                      "tmax_time": t_max_time.strftime("%H:%M") if t_max is not None else "-",
                                      "tmin_time": t_min_time.strftime("%H:%M") if t_min is not None else "-"
                                      }

        return temperature_extremes_today

    @staticmethod
    def get_cumulative_rain_today(cls):
        date_beginning_day = ModelUtils.get_last_record_datetime(cls).date()

        data_rain_today = cls.query.with_entities(cls.rain_1h).filter(db.func.DATE(cls.date_time) == date_beginning_day,
                                                                      cls.rain_1h.isnot(None)).all()
        data_rain_today_list = [x[0] for x in data_rain_today]

        cumulative_rain_today = round(sum(data_rain_today_list), 1)

        return cumulative_rain_today

    @staticmethod
    def get_maximum_gust_today(cls):
        date_beginning_day = ModelUtils.get_last_record_datetime(cls).date()

        gust_max = cls.query.with_entities(db.func.max(cls.gust)).filter(db.func.DATE(cls.date_time) == date_beginning_day,
                                                                         cls.gust.isnot(None)).scalar()
        gust_max_time = cls.query.with_entities(db.func.max(cls.date_time)).filter_by(gust=gust_max).scalar()

        maximum_gust_today = {"gust_max": gust_max if gust_max is not None else "-",
                              "gust_max_time": gust_max_time.strftime("%H:%M") if gust_max is not None else "-"
                              }

        return maximum_gust_today
