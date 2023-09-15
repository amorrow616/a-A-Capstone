from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

tag_choices = ['Work', 'Exercise', 'Health + Wellness', 'School', 'Teams', 'Chores', 'Creativity']

class RewardForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message='Please enter a title for your habit.'), Length(min=1, max=255, message='Please enter a title between 1 and 255 characters.')])
    notes = StringField('Notes', validators=[Length(max=450, message='Please enter a note that is less than 450 characters.')])
    cost = IntegerField('Cost', validators=[NumberRange(min=1, max=5000, message='Please enter a cost between 1 and 5000.')])
    tags = SelectField('Tags', choices=tag_choices)
