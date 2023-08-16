from flask_wtf import FlaskForm
from wtforms   import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, Email

"""
This is the form for the register
""" 
class SignupForm( FlaskForm ): # RegisterForm inherit from FlaskForm
    # Attributes
    username = StringField('Username:', validators=[InputRequired(), Length(min=5, max=20)])
    firstname = StringField('First name:', validators=[InputRequired(), Length(min=2, max=30)])
    lastname = StringField('Last name:', validators=[InputRequired(), Length(min=2, max=30)])
    password = PasswordField('Password:', validators=[InputRequired(), Length(min=3, max=100)])
    email = StringField('Email:', validators=[Email(message="Please fill in a valid email address"), InputRequired(), Length(min=3, max=60)])
    submit   = SubmitField('Register')