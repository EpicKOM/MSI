from MSI import app
from flask import render_template, request, jsonify
from werkzeug.exceptions import HTTPException, InternalServerError
import traceback

API_PATH_PREFIX = app.config.get('API_PATH_PREFIX')


# -------GESTION DES ERREURS--------------------------------------------------------------------------------------------
def log_http_exception(error: HTTPException):
    """ Log the HTTP exception and send a mail to admin if in logger error """

    # No errors logged in testing
    if app.testing:
        return

    # In dev or prod: no 401/404 errors logged
    if error.code == 404 or error.code == 401:
        return

    app.logger.error(f"Erreur {error.code} : {traceback.format_exc()}")


@app.errorhandler(HTTPException)
def http_exception(error):
    log_http_exception(error)

    if request.path.startswith(API_PATH_PREFIX):
        data = dict(
                code=error.code,
                message=error.name,
                description=error.description,
        )

        return jsonify(data), error.code

    return render_template('errors.html',
                           error_code=error.code,
                           title=f"{error.name} - Météo Grenoble Alpes - Live et Prévisions"), error.code


@app.errorhandler(Exception)
def other_exceptions(error):
    """ Catch and handle all the remaining exceptions errors """
    # Log exception traceback
    app.logger.error(traceback.format_exc())

    if request.path.startswith(API_PATH_PREFIX):
        data = dict(
            code=InternalServerError.code,
            message=InternalServerError().name,
            description=InternalServerError.description,
        )

        return jsonify(data), 500

    return render_template('errors.html',
                           error_code=InternalServerError.code,
                           title=f"{InternalServerError().name} - Météo Météo Grenoble Alpes - Live et Prévisions"), 500
