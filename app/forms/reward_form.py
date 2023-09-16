from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

tag_choices = ['Work', 'Exercise', 'Health + Wellness', 'School', 'Teams', 'Chores', 'Creativity']

class RewardForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Please enter a title for your habit.'), Length(min=1, max=255, message='Please enter a title between 1 and 255 characters.')])
    notes = StringField('notes', validators=[Length(max=450)])
    cost = IntegerField('cost', validators=[NumberRange(min=1, max=5000)])
    tags = SelectField('tags', choices=tag_choices)
