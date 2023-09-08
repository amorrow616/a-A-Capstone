import json
from flask import Blueprint
from flask_login import login_required
from app.models import db, Habit
from app.forms.habit_form import HabitForm

habit_routes = Blueprint('habits', __name__)

@habit_routes.route('/<int:userId>')
@login_required
def user_habits(userId):
    """
    Query for a habit based on its id and return it in a dictionary
    """
    habits = Habit.query.filter(Habit.user_id == userId).all()
    return {'habits': [habit.to_dict() for habit in habits]}

@habit_routes.route('/<int:userId>', method=['POST'])
@login_required
def create_habit(userId):
    """
    Creates a habit based on the user id
    """
    form = HabitForm()
    if form.validate_on_submit():
        new_habit = Habit(
            user_id=userId,
            title= form.data["title"],
            notes= form.data["notes"],
            positive_or_negative= form.data["positive_or_negative"],
            difficulty= form.data["difficulty"],
            tags= form.data["tags"],
            reset_counter= form.data["reset_counter"]
        )
        db.session.add(new_habit)
        db.session.commit()

        return json.dumps([{'habit': new_habit.to_dict()}]), 201

    if form.errors:
        return form.errors
