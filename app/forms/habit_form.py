from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Length

difficulties = ['Trivial', 'Easy', 'Medium', 'Hard']
tag_choices = ['Work', 'Exercise', 'Health + Wellness', 'School', 'Teams', 'Chores', 'Creativity']
reset_choices = ['Daily', 'Weekly', 'Monthly']
pos_neg_choices = ['Positive', 'Negative', 'Both']

class HabitForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message='Please enter a title for your habit.'), Length(min=1, max=255, message='Please enter a title between 1 and 255 characters.')])
    notes = StringField('Notes', validators=[Length(max=450, message='Please enter a note that is less than 450 characters.')])
    positive_negative = SelectField('Positive Negative', choices=pos_neg_choices)
    difficulty = SelectField('Difficulty', choices=difficulties)
    tags = SelectField('Tags', choices=tag_choices)
    reset_counter = SelectField('Reset Counter', choices=reset_choices)
