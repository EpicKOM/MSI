from MSI import app
from flask import render_template


@app.route("/")
@app.route("/meteo-live/saint-ismier/")
def meteo_live_saint_ismier():
    return render_template("meteo_live_saint_ismier.html")


@app.route("/meteo-live/saint-martin-d-heres/")
def meteo_live_saint_martin_dheres():
    return render_template("")


@app.route("/previsions/")
def previsions():
    return render_template("previsions.html")
