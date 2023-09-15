from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SelectField
from wtforms.validators import DataRequired, Length

difficulties = ['Trivial', 'Easy', 'Medium', 'Hard']
tag_choices = ['Work', 'Exercise', 'Health + Wellness', 'School', 'Teams', 'Chores', 'Creativity']

class TodoForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(message='Please enter a title for your To Do.'), Length(min=1, max=255, message='Please enter a title between 1 and 255 characters.')])
    notes = StringField('Notes', validators=[Length(max=450, message='Please enter a note that is less than 450 characters.')])
    checklist = StringField('Checklist', validators=[Length(max=255, message='Please enter a checklist item less than 255 characters.')])
    difficulty = SelectField('Difficulty', choices=difficulties)
    due_date = DateField('Due Date', format='%Y-%m-%d')
    tags = SelectField('Tags', choices=tag_choices)
