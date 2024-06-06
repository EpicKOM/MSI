from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_compress import Compress
import logging
from logging.handlers import SysLogHandler

app = Flask(__name__)
app.config.from_object(Config)


# Initialize Flask modules
Config()
db = SQLAlchemy(app)
compress = Compress(app)

handler = SysLogHandler(address=(app.config.get('PAPERTRAIL_HOST'), app.config.get('PAPERTRAIL_PORT')))
handler.setFormatter(logging.Formatter("[%(asctime)s] - %(levelname)s - %(message)s"))
handler.setLevel(logging.INFO)
app.logger.setLevel(logging.INFO)
app.logger.addHandler(handler)
# app.logger.info("MSI startup")

from MSI import routes
