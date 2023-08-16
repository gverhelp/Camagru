from flask_wtf import FlaskForm
from wtforms   import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length

"""
This is the form for the login
"""
class LoginForm( FlaskForm ): # LoginForm inherit from FlaskForm
    # Attributes
    username = StringField('Username:', validators=[InputRequired(), Length(min=5, max=20)])
    password = PasswordField('Password:', validators=[Length(min=3, max=16)])
    submit   = SubmitField('Log in')