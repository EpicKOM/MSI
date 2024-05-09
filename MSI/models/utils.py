from MSI import db
import datetime


class ModelUtils:
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
    def get_temperature_extremes_today(cls):
        date_beginning_day = cls.query.order_by(cls.id.desc()).first().date_time.date()
        print(date_beginning_day)

        temperature_extremes = cls.query.with_entities(db.func.min(cls.temperature).label("t_min"),
                                                       db.func.max(cls.temperature).label("t_max"))\
            .filter(db.func.DATE(cls.date_time) == date_beginning_day).first()

        t_max = temperature_extremes.t_max
        t_min = temperature_extremes.t_min

        print(t_max)
        print(t_min)



