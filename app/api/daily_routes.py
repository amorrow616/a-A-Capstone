import json
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Daily
from app.forms import DailyForm

daily_routes = Blueprint('dailies', __name__)

@daily_routes.route('/<int:userId>')
@login_required
def user_dailies(userId):
    """
    Query for all dailies of a specific user and return them in a dictionary
    """

    dailies = Daily.query.filter(Daily.user_id == userId).all()
    return {'dailies': [daily.to_dict() for daily in dailies]}

@daily_routes.route('/<int:userId>', methods=['POST'])
@login_required
def create_daily(userId):
    """
    Creates a daily linked to logged in user
    """
    form = DailyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_daily = Daily(
            user_id = userId,
            title = form.data["title"],
            notes = form.data["notes"],
            checklist = form.data["checklist"],
            difficulty = form.data["difficulty"],
            start_date = form.data["start_date"],
            # repeats = form.data["repeats"],
            # repeat_every = form.data["repeat_every"],
            # repeat_on = form.data["repeat_on"],
            tags = form.data["tags"]
        )

        db.session.add(new_daily)
        db.session.commit()

        return json.dumps([{'daily': new_daily.to_dict()}]), 201

    if form.errors:
        return form.errors

@daily_routes.route('/daily/<int:dailyId>', methods=['PUT'])
@login_required
def update_daily(dailyId):
    """
    Updates a daily using the dailys id, returns the updated daily in a dictionary
    """

    daily = Daily.query.get(dailyId)
    if not daily:
        return json.dumps({'message': 'Daily not found'}), 404

    data = request.get_json()

    title = data.get('title')
    notes = data.get('notes')
    checklist = data.get('checklist')
    difficulty = data.get('difficulty')
    start_date = data.get('start_date')
    # repeats = data.get('repeats')
    # repeat_every = data.get('repeat_every')
    # repeat_on = data.get('repeat_on')
    tags = data.get('tags')

    daily.title = title
    daily.notes = notes
    daily.checklist = checklist
    daily.difficulty = difficulty
    daily.start_date = start_date
    # daily.repeats = repeats
    # daily.repeat_every = repeat_every
    # daily.repeat_on = repeat_on
    daily.tags = tags

    db.session.commit()

    return jsonify(daily.to_dict())

@daily_routes.route('/daily/<int:dailyId>', methods=['DELETE'])
@login_required
def delete_daily(dailyId):
    """
    Deletes a daily based on its id
    """

    daily = Daily.query.get(dailyId)
    if daily:
        db.session.delete(daily)
        db.session.commit()
        return json.dumps({'message': 'Daily deleted successfully'}), 200

    return json.dumps({'message': 'Daily not found'}), 404
