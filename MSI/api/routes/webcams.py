from apifairy import response, other_responses

from MSI.api import bp
from MSI.api.schemas import WebcamSchema
from MSI.data_loaders import get_webcams


@bp.route('/webcams/', methods=['GET'])
@response(WebcamSchema(many=True))
@other_responses({
    400: "Bad request",
    404: "Not found",
    500: "Internal server error"
})
def get_webcams_endpoint():
    """
    GET /webcams/

    Retrieve the list of all available webcams.

    This endpoint returns metadata about each webcam, including:
    - title
    - geographic coordinates (latitude, longitude)
    - elevation
    - source URL of the webcam
    - tags (e.g., mountain, ski)
    - flags indicating webcam capabilities

    Returns:
        A JSON list containing the full set of webcams.

    Raises:
        - 400: If the request is malformed.
        - 404: If no webcam data is available.
        - 500: For unexpected server-side errors.
    """
    return get_webcams()
