from sqlalchemy import event
from MSI.models import *
from MSI import sse_broadcaster
from MSI.sse import format_sse


@event.listens_for(SaintIsmierData, 'after_insert')
def saint_ismier_sse_update(mapper, connection, target):
    print(sse_broadcaster.subscribers)
    data = {"current_weather_data": SaintIsmierData.get_current_weather_data(),
            "daily_extremes": SaintIsmierData.get_daily_extremes()}

    message = format_sse(data=data, event="saint_ismier_weather_update")

    sse_broadcaster.broadcast(message)
