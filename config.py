"""
Main configuration file of MSI
"""

import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(dotenv_path=os.path.join(basedir, '.env'))


class Config:
    """ Config class for main parameters """

    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI', 'sqlite:///msi.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv('SQLALCHEMY_TRACK_MODIFICATIONS', 'False').lower() in ('true', '1')

    JSON_FORECASTS_PATH = os.path.join(basedir, os.getenv('JSON_FORECASTS_PATH'))
    JSON_METADATA_PATH = os.path.join(basedir, os.getenv('JSON_METADATA_PATH'))
    JSON_MOUNTAIN_WEATHER_PATH = os.path.join(basedir, os.getenv('JSON_MOUNTAIN_WEATHER_PATH'))
    JSON_WEATHER_ALERTS_PATH = os.path.join(basedir, os.getenv('JSON_WEATHER_ALERTS_PATH'))
    JSON_POLLUTION_ALERTS_PATH = os.path.join(basedir, os.getenv('JSON_POLLUTION_ALERTS_PATH'))
    JSON_WEBCAMS_PATH = os.path.join(basedir, os.getenv('JSON_WEBCAMS_PATH'))

    # Logger
    PAPERTRAIL_HOST = os.getenv('PAPERTRAIL_HOST')
    PAPERTRAIL_PORT = int(os.getenv('PAPERTRAIL_PORT'), 0) or None

    # API documentation
    APIFAIRY_TITLE = os.getenv('APIFAIRY_TITLE', 'Méteo Grenoble Alpes API')
    APIFAIRY_VERSION = os.getenv('APIFAIRY_VERSION')
    APIFAIRY_UI = 'elements'
    API_PATH_PREFIX = os.getenv('API_PATH_PREFIX', '/api/')
    APIFAIRY_UI_PATH = f"{API_PATH_PREFIX}docs/"

    # Flask core config
    SECRET_KEY = os.getenv('SECRET_KEY', 'flask-secret-key')
    ENV = os.getenv('ENV', 'development')
    TESTING = os.getenv('TESTING', False).lower() in ('true', '1')
