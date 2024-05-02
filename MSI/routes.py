from MSI import app
from flask import render_template


@app.route("/")
@app.route("/test/")
def test():
    return render_template("layout.html")
