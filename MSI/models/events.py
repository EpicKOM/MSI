from sqlalchemy import event
from MSI.models import *
from MSI import app, db


@event.listens_for(SaintIsmierData, 'after_insert')
def receive_after_insert(mapper, connection, target):
    print("hello ZEEEBIIII")
