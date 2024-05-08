from MSI import app
from flask import render_template
from MSI.models.saint_martin_dheres_data import SaintMartinDheresData
from datetime import datetime


@app.context_processor
def current_year():
    return {'current_year': datetime.now().year}


@app.route("/")
@app.route("/meteo-live/saint-ismier/")
def meteo_live_saint_ismier():
    return render_template("meteo_live_saint_ismier.html")


@app.route("/meteo-live/saint-martin-d-heres/")
def meteo_live_saint_martin_dheres():
    table_is_empty = SaintMartinDheresData.table_is_empty()

    if table_is_empty:
        return render_template("meteo_live_saint_martin_dheres.html",
                               table_is_empty=table_is_empty)

    else:
        return render_template("meteo_live_saint_martin_dheres.html",
                               table_is_empty=table_is_empty,
                               current_data=SaintMartinDheresData.current_data())


@app.route("/previsions/")
def previsions():
    return render_template("previsions.html")
