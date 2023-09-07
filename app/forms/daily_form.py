from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, Length

class DailyForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=255)])
    notes = StringField('Notes', validators=[Length(max=450)])
    checklist = StringField('Checklist', validators=[Length(max=255)])
    difficulty = StringField('Difficulty', validators=[Length(max=20)])
    start_date = DateField('Start Date')
    repeats = StringField('Repeats', validators=[Length(max=20)])
    repeat_every = IntegerField('Repeat Every')
    repeat_on = StringField('Repeat On', validators=[Length(max=50)])
    tags = StringField('Tags', validators=[Length(max=25)])
