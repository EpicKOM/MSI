"""
## 🌤️ Méteo Grenoble Alpes API Overview

Welcome to the **Méteo Grenoble Alpes API** — Your gateway to real-time weather data for **Grenoble and the mountainous regions of the Isère department ⛰️**.

### 🔍 What can you do with this API?

- **Get current weather data**
  - Retrieve real-time weather information (e.g., temperature, humidity, wind speed, pressure) from a specific weather station.

- **Get 7-day forecasts**
  - Get detailed 7-day weather forecasts for Grenoble — perfect for residents, event organizers, and local businesses.

- **Access historical weather data**
  - Get recent weather history by metric and time range (24h to 7 days), returned as hourly data points — ready for use in charts, dashboards, or raw analysis.

- **Track air pollution**
  - Access real-time air quality data for Grenoble, including detailed concentrations for each major pollutant (e.g., PM10, NO2, O3).

- **Track weather alerts**
  - Get official weather vigilance information for the Isère department, covering nine types of weather-related risks, as provided by Météo-France.

### ⚠️ Usage Notice

This data is provided for **non-commercial use only**.

### 📬 Need help?

For questions or support, please refer to the full endpoint documentation or contact me at [contact@meteo-grenoble-alpes.fr](mailto:contact@meteo-grenoble-alpes.fr).

### ☕ Support this project

If you find it useful and would like to support future updates, you can offer me a coffee at: [Ko-fi](https://ko-fi.com/epickom).
"""
from flask import Flask
from apifairy import APIFairy
from flask_compress import Compress
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from config import Config
from logging.handlers import SysLogHandler
from MSI.sse import SSEBroadcaster
import logging

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Flask modules
db = SQLAlchemy(app)
compress = Compress(app)
ma = Marshmallow(app)
apifairy = APIFairy(app)
sse_broadcaster = SSEBroadcaster()

# Initialize Flask logs
handler = SysLogHandler(address=(app.config.get('PAPERTRAIL_HOST'), app.config.get('PAPERTRAIL_PORT')))
handler.setFormatter(logging.Formatter("[%(asctime)s] - %(levelname)s - %(message)s"))
handler.setLevel(logging.INFO)
app.logger.setLevel(logging.INFO)
app.logger.addHandler(handler)

from MSI.api import bp as api_bp
app.register_blueprint(api_bp, url_prefix=f"{app.config.get('API_PATH_PREFIX')}")

from MSI import routes, errors