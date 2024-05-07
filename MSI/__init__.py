from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_compress import Compress

app = Flask(__name__)
app.config.from_object(Config)


# Initialize Flask modules
Config()
db = SQLAlchemy(app)
compress = Compress(app)

from MSI import routes
