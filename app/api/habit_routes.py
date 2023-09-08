from flask import Blueprint
from flask_login import login_required
from app.models import db, Habit
# from app.forms import HabitForm

habit_routes = Blueprint('habits', __name__)

@habit_routes.route('/<int:userId>')
@login_required
def user_habits(userId):
    """
    Query for a habit based on its id and return it in a dictionary
    """
    habits = Habit.query.filter(Habit.user_id == userId).all()
    return {'habits': [habit.to_dict() for habit in habits]}
