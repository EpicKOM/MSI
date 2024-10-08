"""
## API Overview

This API provides easy access to weather information from various weather stations located in the French Alps,
particularly in the Isère department.

What can you do with this API?

Get Current Weather Data

Quickly retrieve up-to-date weather information for a specific location.
Access details like temperature, humidity, wind speed, and more.

Generate Live Weather Charts

Create dynamic charts showing how weather conditions change over time.
Customize charts based on different weather metrics and time intervals.

Why use this API?

Real-time Information: Always get the latest weather data.
Customizable: Choose the weather stations and metrics you're interested in.
Easy Integration: Perfect for weather apps, websites, or any project needing weather data.

Whether you're building a weather app, planning outdoor activities, or just curious about current conditions, this API provides the weather data you need, when you need it.
"""
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
