from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class RewardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please enter a title for your habit.'), Length(min=1, max=255, message='Please enter a title between 1 and 255 characters.')])
    notes = StringField('notes', validators=[Length(max=450, message='Please ensure your notes are less than 450 characters.')])
    cost = IntegerField('cost', validators=[NumberRange(min=1, max=5000, message='Please enter a cost between 1 and 5000.')])
    tags = StringField('Tags', validators=[Length(max=25)])
