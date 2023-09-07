from app.models import db, Daily, environment, SCHEMA
from sqlalchemy.sql import text

def seed_dailies():
    daily_one = Daily(
        user_id=1,
        title='Apply bad tasting polish',
        notes='Apply polish that tastes bad to my nails each week to minimize chewing',
        checklist='Apply polish, let polish dry',
        difficulty='Easy',
        start_date='09 Sep 2023',
        repeats='Weekly',
        repeat_every=1,
        repeat_on='We',
        tags='Health + Wellness'
    )
    daily_two = Daily(
        user_id=2,
        title='Change the water filter',
        notes='Change the water filter to keep water fresh and clean',
        checklist='Take out old filter, put in new filter, test by running water',
        difficulty='Hard',
        start_date='28 Sep 2023',
        repeats='Monthly',
        repeat_every=2,
        repeat_on='Day of the Month',
        tags='Health + Wellness'
    )
    daily_three = Daily(
        user_id=3,
        title='Fun activity after work',
        notes='Have a fun activity planned after work to look forward to, can only do it by staying until shift end',
        checklist='Check with spouse, plan activity, profit',
        difficulty='Trivial',
        start_date='5 Oct 2023',
        repeats='Daily',
        repeat_every=1,
        tags='Work'
    )

    db.session.add(daily_one)
    db.session.add(daily_two)
    db.session.add(daily_three)
    db.session.commit()

def undo_dailies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.dailies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM dailies"))

    db.session.commit()
