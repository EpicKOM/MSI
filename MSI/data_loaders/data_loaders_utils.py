from MSI import app
import json
import os


def load_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)

    except FileNotFoundError:
        app.logger.exception(
            f"[data_loaders - utils.py] - Erreur : Le fichier {file_path} n'a pas été trouvé.")

    except json.JSONDecodeError:
        app.logger.exception(f"[data_loaders - utils.py] - Erreur lors de la lecture du fichier JSON.")

    except Exception:
        app.logger.exception(
            f"[data_loaders - utils.py] - Erreur inconnue lors de la récupération des données du fichier {file_path}.")

    return None
