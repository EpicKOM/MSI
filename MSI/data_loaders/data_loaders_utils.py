from MSI import app
import json
import os

# Dictionnaire interne pour stocker le cache
_json_cache = {}


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


def load_json_cached(file_path):
    try:
        mtime = os.path.getmtime(file_path)
        cache_entry = _json_cache.get(file_path)

        # Si pas de cache ou si le fichier a été modifié
        if not cache_entry or cache_entry['mtime'] != mtime:
            data = load_json(file_path)
            _json_cache[file_path] = {
                'mtime': mtime,
                'data': data
            }

        return _json_cache[file_path]['data']

    except FileNotFoundError:
        app.logger.exception(
            f"[data_loaders - utils.py] - Erreur : Le fichier {file_path} n'a pas été trouvé.")
        return None
