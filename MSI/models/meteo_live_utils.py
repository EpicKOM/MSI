from MSI import db, app
from typing import Type, Dict, Any, Optional
import datetime


class MeteoLiveUtils:

    @classmethod
    def is_data_fresh(cls, db_model_cls: Type[db.Model]) -> bool:
        """
        Checks if there has been a reception error based on the time elapsed
        since the last record was received.

        Args:
            db_model_cls: The database model class (e.g., SaintIsmierData).

        Returns:
            bool: True if data is fresh, False otherwise.
        """
        current_time = datetime.datetime.now()
        last_record_datetime = cls.get_last_record_datetime(db_model_cls)
        delta_time = current_time - last_record_datetime
        deadline = datetime.timedelta(hours=3)

        return delta_time < deadline

    @classmethod
    def get_rain_1h(cls, db_model_cls: Type[db.Model]) -> Dict[str, Any]:
        """
        Retrieves the rain accumulation for the last recorded hour and formats the results for output.

        Returns:
            dict: A dictionary containing two fields:
                - "rain_1h": The rounded rain accumulation for the last hour (if available) or `None`.
                - "rain_1h_date": A formatted string showing the time range of the measurement, or `None` if no data is available.
        """
        try:
            end_datetime = cls.get_last_record_datetime(db_model_cls).replace(minute=0)
            start_datetime = end_datetime - datetime.timedelta(hours=1)

            rain_1h_value = (
                db_model_cls.query
                .with_entities(db_model_cls.rain_1h)
                .filter(
                    db_model_cls.date_time == end_datetime,
                    db_model_cls.rain_1h.isnot(None)
                )
                .scalar()
            )

            rain_1h = {"rain_1h": round(rain_1h_value, 1) if rain_1h_value is not None else None,
                       "rain_1h_date": f"Mesure effectuée entre {start_datetime.strftime('%H:%M')} et "
                                       f"{end_datetime.strftime('%H:%M')}" if rain_1h_value is not None else None
                       }

            return rain_1h

        except Exception:
            app.logger.exception(
                "[MeteoLiveUtils::get_rain_1h] - Erreur lors de la récupération du cumul de pluie sur 1h."
            )

            return {"rain_1h": None, "rain_1h_date": None}

    @classmethod
    def get_rain_24h(cls, db_model_cls: Type[db.Model]) -> Optional[float]:
        """
        Retrieves the total rain accumulation for the current day (last 24 hours).

        Returns:
            float: The total rain accumulation over the last 24 hours, rounded to 1 decimal place.
                   Returns 0.0 if no data is found.
            None: if an exception occurs.
        """
        try:
            last_record_date = cls.get_last_record_datetime(db_model_cls).date()
            start_datetime = datetime.datetime.combine(last_record_date, datetime.datetime.min.time())

            rain_data_today = (
                db_model_cls.query
                .with_entities(db_model_cls.rain_1h)
                .filter(
                    db_model_cls.date_time > start_datetime,
                    db_model_cls.rain_1h.isnot(None))
                .all())

            rain_cumul_today = [x[0] for x in rain_data_today]

            rain_24h = round(sum(rain_cumul_today), 1) if rain_cumul_today else 0.0

            return rain_24h

        except Exception:
            app.logger.exception(
                "[MeteoLiveUtils::get_rain_24h] - Erreur lors de la récupération du cumul de pluie sur 24h."
            )

            return None

    @classmethod
    def get_daily_temperature_extremes(cls, db_model_cls: Type[db.Model]) -> Dict[str, Any]:
        """
        Retrieves today's temperature extremes (min & max) with their timestamps.

        Returns:
            dict: A dictionary containing four fields:
                - "tmax": The max temperature of the day (if available) or `None`.
                - "tmin": The min temperature of the day (if available) or `None`.
                - "tmax_time": A formatted string showing the datetime of tmax, or `None` if no data is available.
                - "tmin_time": A formatted string showing the datetime of tmin, or `None` if no data is available.
        """
        try:
            last_record_date = cls.get_last_record_datetime(db_model_cls).date()
            start_datetime = datetime.datetime.combine(last_record_date, datetime.datetime.min.time())

            # Retrieve min and max of the day
            extremes = (
                db_model_cls.query
                .with_entities(
                    db.func.min(db_model_cls.temperature).label("tmin"),
                    db.func.max(db_model_cls.temperature).label("tmax")
                )
                .filter(
                    db_model_cls.date_time >= start_datetime,
                    db_model_cls.temperature.isnot(None)
                )
                .first()
            )

            tmin, tmax = extremes.tmin, extremes.tmax

            if tmin is None or tmax is None:
                return {"tmax": None, "tmin": None, "tmax_time": None, "tmin_time": None}

            # Retrieve associated hours
            tmin_time = (
                db_model_cls.query
                .with_entities(
                    db.func.max(db_model_cls.date_time))
                .filter_by(temperature=tmin)
                .scalar()
            )

            tmax_time = (
                db_model_cls.query
                .with_entities(
                    db.func.max(db_model_cls.date_time))
                .filter_by(temperature=tmax)
                .scalar()
            )

            return {
                "tmax": round(tmax, 1),
                "tmin": round(tmin, 1),
                "tmax_time": tmax_time.strftime("%H:%M") if tmax_time else None,
                "tmin_time": tmin_time.strftime("%H:%M") if tmin_time else None,
            }

        except Exception:
            app.logger.exception(
                "[MeteoLiveUtils::get_daily_temperature_extremes] - Erreur lors de la récupération des "
                "températures min et max du jour."
            )

            return {"tmax": None, "tmin": None, "tmax_time": None, "tmin_time": None}

    @classmethod
    def get_daily_max_gust(cls, db_model_cls: Type[db.Model]) -> Dict[str, Any]:
        """
        Retrieves the maximum gust of wind recorded for the current day and the time it occurred.

        Returns:
            dict: A dictionary with two keys:
                - "gust_max" (float or None): The maximum gust speed of the day. Returns `None` if no data is available.
                - "gust_max_time" (str or None): The time when the maximum gust occurred, formatted as `HH:MM`. Returns `None` if no data is available.
        """
        try:
            last_record_date = cls.get_last_record_datetime(db_model_cls).date()
            start_datetime = datetime.datetime.combine(last_record_date, datetime.datetime.min.time())

            gust_max = (
                db_model_cls.query
                .with_entities(
                    db.func.max(db_model_cls.gust_speed))
                .filter(
                    db_model_cls.date_time >= start_datetime,
                    db_model_cls.gust_speed.isnot(None))
                .scalar()
            )

            if gust_max is None:
                return {"gust_max": None, "gust_max_time": None}

            gust_max_time = (
                db_model_cls.query
                .with_entities(
                    db.func.max(db_model_cls.date_time))
                .filter_by(gust_speed=gust_max)
                .scalar()
            )

            return {
                "gust_max": round(gust_max, 1),
                "gust_max_time": gust_max_time.strftime("%H:%M") if gust_max is not None else None
            }

        except:
            app.logger.exception(
                "[MeteoLiveUtils::get_daily_max_gust] Erreur lors de la récupération "
                "de la rafale max du jour."
            )

            return {"gust_max": None, "gust_max_time": None}

    @classmethod
    def get_current_charts_data(cls, db_model_cls, data_name, interval_duration, column_mapping):
        try:
            start_datetime = cls.get_last_record_datetime(db_model_cls) - datetime.timedelta(interval_duration)

            if data_name in column_mapping:
                if data_name == "rain":
                    query = (
                        db_model_cls.query
                        .filter(
                            db_model_cls.date_time >= start_datetime,
                            db_model_cls.rain_1h.isnot(None))
                    )
                    columns = column_mapping["rain"]

                elif data_name == "wind_direction":
                    return {"wind_direction": cls.get_wind_direction_chart_data(db_model_cls, start_datetime)}

                else:
                    query = (
                        db_model_cls.query
                        .filter(
                            db_model_cls.date_time >= start_datetime)
                    )
                    columns = column_mapping[data_name]

                current_charts_data = query.with_entities(*columns).all()

                response = {"datetime": [data.date_time.strftime("%Y-%m-%d %H:%M:%S") for data in current_charts_data]}

                for col in columns[1:]:
                    response[col.name] = [getattr(data, col.name) for data in current_charts_data]

                return response

            else:
                app.logger.exception(f"[get_current_charts_data] : {data_name} est introuvable dans le column mapping.")

        except Exception:
            app.logger.exception(f"[get_current_charts_data] : {data_name} Erreur lors de la récupération des données pour les graphiques.")

    @classmethod
    def get_wind_direction_chart_data(cls, db_model_cls, start_datetime):
        wind_angle_data = (db_model_cls.query.with_entities(db_model_cls.wind_angle)
                           .filter(db_model_cls.date_time >= start_datetime,
                                   db_model_cls.wind_speed > 0,
                                   db_model_cls.wind_angle.isnot(None)).all())

        wind_direction_counts = {
            "N": 0, "NNE": 0, "NE": 0, "ENE": 0, "E": 0, "ESE": 0,
            "SE": 0, "SSE": 0, "S": 0, "SSO": 0, "SO": 0, "OSO": 0,
            "O": 0, "ONO": 0, "NO": 0, "NNO": 0
        }

        for wind_angle in wind_angle_data:
            direction = cls.get_wind_direction(wind_angle[0])
            if direction in wind_direction_counts:
                wind_direction_counts[direction] += 1

        total = sum(wind_direction_counts.values())

        if total != 0:
            results = [round(cls.wind_direction_percentage(wind_direction_counts[direction], total), 1)
                       for direction in
                       ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO",
                        "NNO"]]

        else:
            results = [0] * 16

        return results

    @staticmethod
    def get_last_record_datetime(db_model_cls):
        """
        Retrieves the date and time of the last recorded entry in the database for the given class.

        This method performs an SQL query on the table associated with the `cls` class and returns
        the maximum value of the `date_time` field, corresponding to the most recent record.

        Returns:
            datetime: The date and time of the last record in the table, or `None` if no records are present.
        """
        return db_model_cls.query.with_entities(db.func.max(db_model_cls.date_time)).scalar()

    @staticmethod
    def get_last_record(db_model_cls):
        """
        Retrieves the last record from the database table associated with the class.

        Returns:
            Model or None: The last record retrieved from the database table, or None if no records are found.
        """
        return db_model_cls.query.order_by(db_model_cls.id.desc()).first()

    @staticmethod
    def get_wind_direction(wind_angle: float) -> str:
        """
        Determines the wind direction based on the given wind angle.

        Args:
            wind_angle (float): The wind angle in degrees.

        Returns:
            str: The wind direction as a cardinal or intercardinal direction abbreviation.
        """
        compass_rose = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(compass_rose, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 45: "NE", 67.5: "ENE", 90: "E", 112.5: "ESE", 135: "SE", 157.5: "SSE",
                      180: "S",
                      202.5: "SSO", 225: "SO", 247.5: "OSO", 270: "O", 292.5: "ONO", 315: "NO", 337.5: "NNO", 360: "N"}

        return directions.get(compass_rose_angle)

    @staticmethod
    def wind_direction_percentage(part: int, total: int) -> float:
        try:
            return 100 * part / total

        except ZeroDivisionError:
            app.logger.error(
                f"[MeteoLiveUtils::wind_direction_percentage] - Division par zéro impossible. Total = {total}"
            )

        except Exception:
            app.logger.exception(
                "[MeteoLiveUtils::wind_direction_percentage] - Erreur lors du calcul du pourcentage"
                " de la direction du vent."
            )

        return 0.0
