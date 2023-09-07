from app.models import db, Avatar, environment, SCHEMA
from sqlalchemy.sql import text

def seed_avatars():
    avatar_one = Avatar(
        user_id=1,
        hair_color='Blonde',
        hair_style='Short',
        eye_color='Blue',
        shirt_color='Black',
        background_color='Pink'
    )
    avatar_two = Avatar(
        user_id=2,
        hair_color='Black',
        hair_style='Medium',
        eye_color='Brown',
        shirt_color='Red',
        background_color='Orange'
    )
    avatar_three = Avatar(
        user_id=3,
        hair_color='Red',
        hair_style='Long',
        eye_color='Green',
        shirt_color='Green',
        background_color='Purple'
    )

    db.session.add(avatar_one)
    db.session.add(avatar_two)
    db.session.add(avatar_three)
    db.session.commit()

def undo_avatars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.avatars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM avatars"))

    db.session.commit()
