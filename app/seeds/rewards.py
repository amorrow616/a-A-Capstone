from app.models import db, Reward, environment, SCHEMA
from sqlalchemy.sql import text

def seed_rewards():
    reward_one = Reward(
        user_id=1,
        title='Eat some ice cream',
        notes='That was tough! Enjoy some ice cream.',
        cost = 10,
        tags='Health + Wellness'
    )
    reward_two = Reward(
        user_id=1,
        title='Watch TV',
        notes='Is Gilmore Girls on? Time to watch an episode!',
        cost = 30,
        tags='Work'
    )
    reward_three = Reward(
        user_id=1,
        title='Play a game',
        notes='That is enough for today, time for some Overwatch.',
        cost = 50,
        tags='Creativity'
    )

    db.session.add(reward_one)
    db.session.add(reward_two)
    db.session.add(reward_three)
    db.session.commit()

def undo_rewards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rewards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rewards"))

    db.session.commit()
