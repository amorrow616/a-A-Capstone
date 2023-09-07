from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length

class HabitForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255)])
    notes = StringField('Notes', validators=[Length(max=450)])
    positive_or_negative = BooleanField('Positive Negative')
    difficulty = StringField('Difficulty', validators=[Length(max=20)])
    tags = StringField('Tags', validators=[Length(max=25)])
    reset_counter = StringField('Reset Counter', validators=[Length(max=15)])
