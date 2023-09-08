from .db import db, environment, SCHEMA, add_prefix_for_prod

class Daily(db.Model):
    __tablename__ = 'dailies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(450))
    checklist = db.Column(db.String(255))
    difficulty = db.Column(db.String(20))
    start_date = db.Column(db.Date)
    repeats = db.Column(db.String(20))
    repeat_every = db.Column(db.Integer)
    repeat_on = db.Column(db.String(50))
    tags = db.Column(db.String(25))
    # one user can have many dailies
    daily_user = db.relationship("User", back_populates="user_daily")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'checklist': self.checklist,
            'difficulty': self.difficulty,
            'start_date': self.start_date,
            'repeats': self.repeats,
            'repeat_every': self.repeat_every,
            'repeat_on': self.repeat_on,
            'tags': self.tags
        }
