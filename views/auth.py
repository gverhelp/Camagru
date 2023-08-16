from app import db
from flask import Blueprint, flash, redirect, render_template, url_for
from flask_login import current_user, login_user, logout_user

from models.user import User

from werkzeug.security import generate_password_hash, check_password_hash

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route("/", methods=['GET', 'POST'])
def shit():
    return 'cey buguey'

@auth_blueprint.route("/login", methods=['GET', 'POST'])
def login():
    return 'lol'