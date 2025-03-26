from flask import Blueprint

bp = Blueprint('api', __name__)

from MSI.api.routes import meteo_live, observations
