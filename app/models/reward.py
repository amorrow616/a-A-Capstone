from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reward(db.Model):
    __tablename__ = 'rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(450))
    cost = db.Column(db.Integer)
    tags = db.Column(db.String(25))

    # one user can have many rewards
    reward_user = db.relationship("User", back_populates='user_reward')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'cost': self.cost,
            'tags': self.tags
        }
