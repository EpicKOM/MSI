from flask import Blueprint

bp = Blueprint('api', __name__)

from MSI.api import meteo_live
