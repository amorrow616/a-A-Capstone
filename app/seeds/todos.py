from app.models import db, Todo, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_todos():
    todo_one = Todo(
        user_id=1,
        title='Purchase case of nail polish',
        notes='Purchase large case of bad tasting nail polish',
        checklist='Drive to store, pick out polish, pay for polish',
        difficulty='Easy',
        due_date=date(2023, 9, 15),
        tags='Health + Wellness'
    )
    todo_two = Todo(
        user_id=2,
        title='Call repair man for water source',
        notes='Want to make sure water source is pure, crack needs to be repaired',
        checklist='Find correct phone number, schedule repair, be home for repair',
        difficulty='Medium',
        due_date=date(2023, 10, 1),
        tags='Health + Wellness'
    )
    todo_three = Todo(
        user_id=3,
        title='Look for a new job',
        notes='Want to check the job market, see if I can get a new offer',
        checklist='Update resume, send out resume, schedule interviews',
        difficulty='Hard',
        due_date=date(2023, 10, 12),
        tags='Work'
    )

    db.session.add(todo_one)
    db.session.add(todo_two)
    db.session.add(todo_three)
    db.session.commit()

def undo_todos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.todos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM todos"))

    db.session.commit()
