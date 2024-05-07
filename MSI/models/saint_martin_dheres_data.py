from MSI import app, db


class SaintMartinDheresData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float)

    @classmethod
    def is_empty(cls):
        print("zizi")
        return cls.query.first() is None


with app.app_context():
    SaintMartinDheresData.is_empty()