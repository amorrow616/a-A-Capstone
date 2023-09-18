from app.models import db, Habit, environment, SCHEMA
from sqlalchemy.sql import text

def seed_habits():
    habit_one = Habit(
        user_id=1,
        title='Chewing nails',
        notes='Want to stop chewing on my nails',
        positive=False,
        negative=True,
        difficulty='Medium',
        tags='Health + Wellness'
    )
    habit_two = Habit(
        user_id=1,
        title='Drinking water',
        notes='Want to keep up my healthy water intake',
        positive=True,
        negative=False,
        difficulty='Easy',
        tags='Health + Wellness'
    )
    habit_three = Habit(
        user_id=1,
        title='Clocking out early',
        notes='Want to try and stay for my entire shift instead of going home early',
        positive=True,
        negative=True,
        difficulty='Hard',
        tags='Work'
    )

    db.session.add(habit_one)
    db.session.add(habit_two)
    db.session.add(habit_three)
    db.session.commit()


def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
