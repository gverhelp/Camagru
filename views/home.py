from flask import Blueprint, render_template
from flask_login import login_required

home_blueprint = Blueprint('home', __name__)

@home_blueprint.route('/', methods=['GET', 'POST'])
@login_required
def home():
    return render_template('home/index.html')
