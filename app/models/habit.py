from .db import db, environment, SCHEMA, add_prefix_for_prod

class Habit(db.Model):
    __tablename__ = 'habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(450))
    positive = db.Column(db.Boolean)
    negative = db.Column(db.Boolean)
    difficulty = db.Column(db.String(20))
    tags = db.Column(db.String(25))
    # one user can have many habits
    habit_user = db.relationship("User", back_populates='user_habit')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'positive': self.positive,
            'negative': self.negative,
            'difficulty': self.difficulty,
            'tags': self.tags
        }
