import os, binascii

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = binascii.hexlify(os.urandom(24))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db', 'camagru.db') # or 'sqlite:/// + global path to db
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TEMPLATES_AUTO_RELOAD = True