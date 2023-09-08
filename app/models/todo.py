from .db import db, environment, SCHEMA, add_prefix_for_prod

class Todo(db.Model):
    __tablename__ = 'todos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(255), nullable=False)
    notes = db.Column(db.String(450))
    checklist = db.Column(db.String(255))
    difficulty = db.Column(db.String(20))
    due_date = db.Column(db.Date)
    tags = db.Column(db.String(25))
    # one user can have many todos
    todo_user = db.relationship("User", back_populates="user_todo")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'notes': self.notes,
            'checklist': self.checklist,
            'difficulty': self.difficulty,
            'due_date': self.due_date,
            'tags': self.tags
        }
