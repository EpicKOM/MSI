"""
Main script to start MSI
"""

import os
import ast
from MSI import app

if __name__ == "__main__":
    try:
        debug = ast.literal_eval(os.environ.get('FLASK_DEBUG'))

    except:
        debug = True

    # app.run(debug=debug)
    app.run(host="192.168.1.11")
