"""
Main script to start MSI
"""

import os
import ast
from MSI import app

if __name__ == "__main__":
    try:
        debug = os.getenv('FLASK_DEBUG', False).lower() in ('true', '1')

    except:
        debug = True

    app.run(debug=debug)
