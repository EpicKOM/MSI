class ModelUtils:
    @staticmethod
    def get_last_record(cls):
        return cls.query.order_by(cls.id.desc()).first()

    @staticmethod
    def get_wind_direction(wind_angle):
        COMPASS_ROSE = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(COMPASS_ROSE, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 90: "E", 180: "S"}
        return directions.get(compass_rose_angle)



