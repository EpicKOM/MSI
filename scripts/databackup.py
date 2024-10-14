from MSI import db, app
from MSI.models import *
from datetime import datetime
import random


def insert_data():
    with app.app_context():
        try:
            trend = ["stable", "up", "down"]

            date_time = datetime(2024, 10, 12, 19, 20, 0, 0)
            temperature = random.randint(-20, 40)
            humidity = random.randint(0, 100)
            wind_speed = random.randint(0, 50)
            gust_speed = random.randint(0, 100)
            wind_angle = random.randint(0, 360)
            rain_1h = random.uniform(0.0, 10.1)
            pressure = random.randint(950, 1050)
            temperature_trend = random.choice(trend)

            saint_ismier_data = SaintIsmierData(date_time=date_time, temperature=temperature, humidity=humidity,
                                                wind_speed=wind_speed, gust_speed=gust_speed, wind_angle=wind_angle,
                                                rain_1h=rain_1h, pressure=pressure, temperature_trend=temperature_trend)

            db.session.add(saint_ismier_data)
            db.session.commit()
            print("Les données sont enregistrées")

        except Exception as e:
            print(e)
            db.session.rollback()

        finally:
            db.session.close()
            print("Fermeture de la db")


if __name__ == "__main__":
    insert_data()

