from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length

class HabitForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message='Please enter a title.'), Length(min=1, max=255, message='Please enter a title between 1 and 255 characters.')])
    notes = StringField('Notes', validators=[Length(max=450, message='Please enter a note that is less than 450 characters.')])
    positive = BooleanField('Positive')
    negative = BooleanField('Negative')
    difficulty = StringField('Difficulty', validators=[Length(max=20)])
    tags = StringField('Tags', validators=[Length(max=25)])
