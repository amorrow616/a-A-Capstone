import json
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Daily
from app.forms.daily_form import DailyForm

daily_routes = Blueprint('dailies', __name__)

@daily_routes.route('/<int:userId>')
@login_required
def user_dailies(userId):
    """
    Query for all dailies of a specific user and return them in a dictionary
    """

    dailies = Daily.query.filter(Daily.user_id == userId).all()
    return {'dailies': [daily.to_dict() for daily in dailies]}
