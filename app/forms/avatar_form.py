from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Length

class AvatarForm(FlaskForm):
    hair_color = StringField('Hair Color', validators=[DataRequired()])
    hair_style = StringField('Hair Style', validators=[DataRequired()])
    eye_color = StringField('Eye Color', validators=[DataRequired()])
    shirt_color = StringField('Shirt Color', validators=[DataRequired()])
    background_color = StringField('Background Color', validators=[DataRequired()])
