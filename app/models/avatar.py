from .db import db, environment, SCHEMA, add_prefix_for_prod

class Avatar(db.Model):
    __tablename__ = 'avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    hair_color = db.Column(db.String(75), nullable=False)
    hair_style = db.Column(db.String(75), nullable=False)
    eye_color = db.Column(db.String(75), nullable=False)
    shirt_color = db.Column(db.String(75), nullable=False)
    background_color = db.Column(db.String(75), nullable=False)
    # one user can have one avatar
    avatar_user = db.relationship("User", back_populates="user_avatar")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'hair_color': self.hair_color,
            'hair_style': self.hair_style,
            'eye_color': self.eye_color,
            'shirt_color': self.shirt_color,
            'background_color': self.background_color
        }
