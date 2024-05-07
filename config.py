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

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'flask-secret-key'
