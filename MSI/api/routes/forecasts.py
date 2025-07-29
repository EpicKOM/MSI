from flask import abort
from apifairy import response, other_responses

from MSI.api import bp
from MSI.api.schemas import DailyForecastsOutputSchema
from MSI.data_loaders import ForecastsApi


@bp.route('/forecasts/', methods=['GET'])
@other_responses({
    400: "Bad request",
    404: "Not found",
    500: "Internal server error"
})
def get_forecasts():
    return ForecastsApi.get_7_day_forecasts()


# ------------Requête AJAX Forecasts---------------------------------------------------------------------------
@bp.route('/forecasts/<int:day_index>', methods=['GET'])
@response(DailyForecastsOutputSchema)
@other_responses({
    400: "Invalid day index. Must be between 0 and 6.",
    404: "Forecast data not found.",
    500: "Internal server error"
})
def get_daily_forecasts(day_index: int):
    """
    GET /forecasts/<int:day_index>

    Retrieve daily weather forecasts data for a specific day index.

    Args:
        day_index (int): Index of the forecasts day (0 = today, 6 = in 6 days).

    Returns:
        DailyForecastsOutputSchema: Weather forecast for the selected day.

    Raises:
        400: If the day index is not between 0 and 6.
        404: If forecast data is not available.
        500: For internal server errors.
    """
    if not (0 <= day_index <= 6):
        abort(400, description="Invalid day index. Must be between 0 and 6.")

    return ForecastsApi.get_daily_forecast(day_index)
