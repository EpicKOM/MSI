from MSI import app, db


class SaintIsmierData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float)

    @classmethod
    def is_empty(cls):
        return cls.query.first() is None

    @classmethod
    def current_data(cls):
        current_data = cls.query.order_by(cls.id.desc()).first()
        print(current_data.temperature)


with app.app_context():
    SaintIsmierData.current_data()
