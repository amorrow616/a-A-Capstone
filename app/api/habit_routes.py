import json
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Habit
from app.forms import HabitForm

habit_routes = Blueprint('habits', __name__)

@habit_routes.route('/<int:userId>')
@login_required
def user_habits(userId):
    """
    Query for all habits of specific user and return them in a dictionary
    """
    habits = Habit.query.filter(Habit.user_id == userId).all()
    return {'habits': [habit.to_dict() for habit in habits]}

@habit_routes.route('/<int:userId>', methods=['POST'])
@login_required
def create_habit(userId):
    """
    Creates a habit linked to logged in user
    """
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_habit = Habit(
            user_id = userId,
            title = form.data["title"],
            notes = form.data["notes"],
            positive_negative = form.data["positive_negative"],
            difficulty = form.data["difficulty"],
            tags = form.data["tags"],
            reset_counter = form.data["reset_counter"]
        )
        db.session.add(new_habit)
        db.session.commit()

        return json.dumps([{'habit': new_habit.to_dict()}]), 201

    if form.errors:
        return form.errors

@habit_routes.route('/habit/<int:habitId>', methods=['PUT'])
@login_required
def update_habit(habitId):
    """
    Updates a habit using the habits id, returns updated habit in dictionary
    """
    habit = Habit.query.get(habitId)
    if not habit:
        return json.dumps({'message': 'Habit not found'}), 404

    data = request.get_json()

    title = data.get('title')
    notes = data.get('notes')
    positive_negative = data.get('positive_negative')
    difficulty = data.get('difficulty')
    tags = data.get('tags')
    reset_counter = data.get('reset_counter')

    habit.title = title
    habit.notes = notes
    habit.positive_negative = positive_negative
    habit.difficulty = difficulty
    habit.tags = tags
    habit.reset_counter = reset_counter

    db.session.commit()

    return jsonify(habit.to_dict())

@habit_routes.route('/habit/<int:habitId>', methods=['DELETE'])
@login_required
def delete_habit(habitId):
    """
    Deletes a habit based on its id
    """

    habit = Habit.query.get(habitId)
    if habit:
        db.session.delete(habit)
        db.session.commit()
        return json.dumps({'message': 'Habit deleted successfully'}), 200

    return json.dumps({'message': 'Habit not found'}), 404
