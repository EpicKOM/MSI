"""
Main configuration file of MSI
"""

import os
import ast
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(dotenv_path=os.path.join(basedir, '.env'))


class Config:
    """ Config class for main parameters """

    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') or 'sqlite:///msi.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = ast.literal_eval(os.environ.get('SQLALCHEMY_TRACK_MODIFICATIONS')) or False

    JSON_FORECASTS_PATH = os.path.join(basedir, os.environ.get('JSON_FORECASTS_PATH'))
    JSON_METADATA_PATH = os.path.join(basedir, os.environ.get('JSON_METADATA_PATH'))

    PAPERTRAIL_HOST = os.environ.get('PAPERTRAIL_HOST')
    PAPERTRAIL_PORT = int(os.getenv('PAPERTRAIL_PORT'))

    # Configure the API documentation
    APIFAIRY_TITLE = os.environ.get('APIFAIRY_TITLE') or 'MSI API'
    APIFAIRY_VERSION = os.environ.get('APIFAIRY_VERSION')
    APIFAIRY_UI = 'elements'

    API_PATH_PREFIX = os.environ.get('API_PATH_PREFIX') or '/api/'

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'flask-secret-key'
    ENV = os.environ.get('ENV') or 'development'
    TESTING = os.environ.get('TESTING') or True
