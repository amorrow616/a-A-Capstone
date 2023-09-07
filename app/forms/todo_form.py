from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length

class TodoForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255)])
    notes = StringField('Notes', validators=[Length(max=450)])
    checklist = StringField('Checklist', validators=[Length(max=255)])
    difficulty = StringField('Difficulty', validators=[Length(max=20)])
    due_date = DateField('Due Date')
    tags = StringField('Tags', validators=[Length(max=25)])
