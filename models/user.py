from flask_login import UserMixin
from app import db


"""
This is the model (database table with columns) of a user
"""
class User(UserMixin, db.Model):  # User inherit from UserMixin and SQLAlchemy.Model)
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)

    # Constructor
    def __init__(self, username, email, password, firstname, lastname):
        self.username = username
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname

    # Representation
    def __repr__(self):
        return '<User %r id %d>' %(self.username, self.id)
    
    # Getter for id
    def get_id(self):
        return self.id