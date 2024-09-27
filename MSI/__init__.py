from flask import Flask
from apifairy import APIFairy
from flask_compress import Compress
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from config import Config
from logging.handlers import SysLogHandler
import logging

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Flask modules
db = SQLAlchemy(app)
compress = Compress(app)
ma = Marshmallow(app)
apifairy = APIFairy(app)

# Initialize Flask logs
handler = SysLogHandler(address=(app.config.get('PAPERTRAIL_HOST'), app.config.get('PAPERTRAIL_PORT')))
handler.setFormatter(logging.Formatter("[%(asctime)s] - %(levelname)s - %(message)s"))
handler.setLevel(logging.INFO)
app.logger.setLevel(logging.INFO)
app.logger.addHandler(handler)

from MSI.api import bp as api_bp

app.register_blueprint(api_bp, url_prefix='/api')

from MSI import routes, errors
