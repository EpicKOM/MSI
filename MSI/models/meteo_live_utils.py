from MSI import db, app
from typing import Type, Dict, Any, Optional, List, TypeVar
from sqlalchemy.orm.attributes import InstrumentedAttribute

import datetime

T = TypeVar('T', bound=db.Model)


class MeteoLiveUtils:

    @classmethod
    def is_data_fresh(cls, db_model_cls: Type[db.Model]) -> bool:
        """
        Check if the latest record is less than 3 hours old.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model class to query.

        Returns:
            bool: True if fresh, False otherwise.
        """
        current_time = datetime.datetime.now()
        last_record_datetime = cls._get_last_record_datetime(db_model_cls)
        delta_time = current_time - last_record_datetime
        deadline = datetime.timedelta(hours=3)

        return delta_time < deadline

    @classmethod
    def get_rain_1h(cls, db_model_cls: Type[db.Model]) -> Dict[str, Any]:
        """
        Get the rainfall accumulation for the last recorded hour.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            dict: Contains "rain_1h" (float | None) and
                  "rain_1h_date" (str | None).
        """
        try:
            end_datetime = cls._get_last_record_datetime(db_model_cls).replace(minute=0, second=0, microsecond=0)
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
        Get the total rainfall accumulation over the last 24 hours.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            float: Total rainfall, rounded to 1 decimal.
            None: If an error occurs.
        """
        try:
            start_datetime = cls._get_last_record_day_start(db_model_cls)

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
        Get today's minimum and maximum temperatures with their times.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            dict: Contains:
                - "tmax" (float | None): Maximum temperature of the day.
                - "tmin" (float | None): Minimum temperature of the day.
                - "tmax_time" (str | None): Time of max temperature (HH:MM).
                - "tmin_time" (str | None): Time of min temperature (HH:MM).
        """
        try:
            start_datetime = cls._get_last_record_day_start(db_model_cls)

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
        Get today's maximum wind gust with its time.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            dict: Contains:
                - "gust_max" (float | None): Maximum gust speed of the day.
                - "gust_max_time" (str | None): Time of max gust (HH:MM).
        """
        try:
            start_datetime = cls._get_last_record_day_start(db_model_cls)

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
    def get_current_charts_data(
            cls,
            db_model_cls: Type[db.Model],
            data_name: str,
            interval_duration: int,
            column_mapping: Dict[str, List[Any]]
    ) -> Dict[str, List[Any]]:
        """
        Get live chart data for the given metric.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.
            data_name (str): The name of the metric (e.g., "temperature", "wind_direction").
            interval_duration (int): Interval in days to look back from the last record.
            column_mapping (dict): Mapping of metric names to corresponding DB columns.

        Returns:
            dict: Chart data with lists of values by column.
                  Empty dict if metric is unknown or an error occurs.
        """
        try:
            start_datetime = cls._get_last_record_datetime(db_model_cls) - datetime.timedelta(interval_duration)

            if data_name not in column_mapping:
                app.logger.exception(
                    f"[MeteoLiveUtils::get_current_charts_data] - {data_name} introuvable dans le column mapping."
                )
                return {}

            if data_name == "rain":
                return cls._get_rain_chart_data(db_model_cls, start_datetime, column_mapping["rain"])

            elif data_name == "wind_direction":
                return {"wind_direction": cls._get_wind_direction_chart_data(db_model_cls, start_datetime)}

            else:
                return cls._get_default_chart_data(db_model_cls, start_datetime, column_mapping[data_name])

        except Exception:
            app.logger.exception(
                f"[MeteoLiveUtils::get_current_charts_data] - Erreur lors de la récupération des données de {data_name}"
                f" pour les graphiques Live."
            )
            return {}

    @classmethod
    def _get_rain_chart_data(
            cls,
            db_model_cls: Type[db.Model],
            start_datetime: datetime.datetime,
            columns: List[InstrumentedAttribute]
    ) -> Dict[str, List[Any]]:
        """
        Query and format rainfall data since `start_datetime`.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.
            start_datetime (datetime): Start datetime for filtering records.
            columns (list): List of DB columns to include.

        Returns:
            dict: Contains "datetime" (list of str) and rainfall values.
        """
        query = (
            db_model_cls.query
            .filter(
                db_model_cls.date_time >= start_datetime,
                db_model_cls.rain_1h.isnot(None))
        )

        current_charts_data = query.with_entities(*columns).all()

        return cls._format_response(current_charts_data, columns)

    @classmethod
    def _get_default_chart_data(
            cls,
            db_model_cls: Type[db.Model],
            start_datetime: datetime.datetime,
            columns: List[InstrumentedAttribute]
    ) -> Dict[str, List[Any]]:
        """
         Query and format generic metric data since `start_datetime`.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.
            start_datetime (datetime): Start datetime for filtering records.
            columns (list): List of DB columns to include.

        Returns:
            dict: Contains "datetime" (list of str) and one key per column with values.
        """
        query = db_model_cls.query.filter(db_model_cls.date_time >= start_datetime)

        current_charts_data = query.with_entities(*columns).all()

        return cls._format_response(current_charts_data, columns)

    @classmethod
    def _get_wind_direction_chart_data(
            cls,
            db_model_cls: Type[db.Model],
            start_datetime: datetime.datetime
    ) -> List[float]:
        """
        Query and format wind direction distribution since `start_datetime`.

        Args:
            db_model_cls: SQLAlchemy model class.
            start_datetime: Start datetime for filtering records.

        Returns:
            list[float]: Percentages (0.0–100.0) for the 16 compass directions,
                         ordered ["N", "NNE", ..., "NNO"].
        """
        wind_angle_data = (
            db_model_cls
            .query.with_entities(
                db_model_cls.wind_angle)
            .filter(db_model_cls.date_time >= start_datetime,
                    db_model_cls.wind_speed > 0,
                    db_model_cls.wind_angle.isnot(None))
            .all()
        )

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
            results = [round(cls._calculate_percentage(wind_direction_counts[direction], total), 1)
                       for direction in
                       ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO",
                        "NNO"]]

        else:
            results = [0.0] * 16

        return results

    @staticmethod
    def _get_last_record_datetime(db_model_cls: Type[db.Model]) -> datetime.datetime:
        """
        Get the datetime of the last recorded entry.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            datetime | None: Datetime of the last record, or None if no records exist.
        """
        return db_model_cls.query.with_entities(db.func.max(db_model_cls.date_time)).scalar()

    @classmethod
    def _get_last_record_day_start(cls, db_model_cls: Type[db.Model]) -> Optional[datetime.datetime]:
        """
        get the datetime of the start of the day for the last record date.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            datetime | None: Datetime of the start of the day, or None if no records exist.
        """
        last_dt = cls._get_last_record_datetime(db_model_cls)

        return datetime.datetime.combine(last_dt.date(), datetime.time.min) if last_dt else None

    @staticmethod
    def get_last_record(db_model_cls: Type[db.Model]) -> Optional[T]:
        """
        Get the last record.

        Args:
            db_model_cls (Type[db.Model]): The SQLAlchemy model to query.

        Returns:
            Model | None: The last record, or None if no records exist.
        """
        return db_model_cls.query.order_by(db_model_cls.id.desc()).first()

    @staticmethod
    def get_wind_direction(wind_angle: float) -> str:
        """
        Convert a wind angle to a compass direction.

        Args:
            wind_angle (float): Wind angle in degrees.

        Returns:
            str: Cardinal or intercardinal direction (e.g., "N", "SO").
        """
        compass_rose = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 360]
        compass_rose_angle = min(compass_rose, key=lambda x: abs(x - wind_angle))

        directions = {0: "N", 22.5: "NNE", 45: "NE", 67.5: "ENE", 90: "E", 112.5: "ESE", 135: "SE", 157.5: "SSE",
                      180: "S",
                      202.5: "SSO", 225: "SO", 247.5: "OSO", 270: "O", 292.5: "ONO", 315: "NO", 337.5: "NNO", 360: "N"}

        return directions.get(compass_rose_angle)

    @staticmethod
    def _calculate_percentage(part: int, total: int) -> float:
        """
        Calculate a percentage, handling division by zero.

        Args:
            part (int): Numerator.
            total (int): Denominator.

        Returns:
            float: Percentage in [0.0, 100.0]. Returns 0.0 if invalid.
        """
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

    @staticmethod
    def _format_response(
            current_charts_data: List[Any],
            columns: List[InstrumentedAttribute]
    ) -> Dict[str, List[Any]]:
        """
        Format query results into a dictionary for chart responses.

        Args:
            current_charts_data (list): Query results.
            columns (list): Columns to include.

        Returns:
            dict: Contains "datetime" (list of str) and one key per column with values.
        """
        response = {"datetime": [data.date_time.strftime("%Y-%m-%d %H:%M:%S") for data in current_charts_data]}

        for col in columns[1:]:
            response[col.name] = [getattr(data, col.name) for data in current_charts_data]

        return response
