from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username is required.'), Length(min=5, max=40, message='Please enter a username between 5 and 40 characters.'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Email address is required.'), Email(message='Please enter a valid email.'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required.'), Length(min=8, max=255, message='Please enter a password between 8 and 255 characters.')])
