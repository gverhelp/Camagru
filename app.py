import os
from flask import Flask
from flask_login import  LoginManager
from config import Config, basedir
from jinja2 import Environment, PackageLoader
from flask_sqlalchemy import SQLAlchemy

""" 
Initialisation of the application:
Configuration and link to a Database
"""
app = Flask(__name__)
app.config.from_object(Config)

env = Environment(loader=PackageLoader(__name__, 'templates'))

db = SQLAlchemy(app)

""" 
Blueprints
https://flask.palletsprojects.com/en/2.3.x/blueprints/
it’s a set of operations which can be registered on an application
""" 
from views.auth import auth_blueprint

app.register_blueprint(auth_blueprint)

"""
Creation of the Databse if it's doesn´t exist
""" 
try:
    os.makedirs(basedir + 'db')
except OSError:
    pass

with app.app_context():
    db.create_all()

"""
Configuration of LoginManager
"""
from models.user import User

login_manager = LoginManager(app)
login_manager.login_view = "auth.login" # redirection to the "login" controller

# callback to reload the user object
@login_manager.user_loader
def load_user(userid):
    return User.query.get(int(userid))