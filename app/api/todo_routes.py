import json
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Todo
from app.forms.todo_form import TodoForm

todo_routes = Blueprint('todos', __name__)

@todo_routes.route('/<int:userId>')
@login_required
def user_todos(userId):
    """
    Query for all todos of a specific user and return them in a dictionary
    """

    todos = Todo.query.filter(Todo.user_id == userId).all()
    return {'todos': [todo.to_dict() for todo in todos]}

@todo_routes.route('/<int:userId>', methods=['POST'])
@login_required
def create_todo(userId):
    """
    Creates a todo linked to logged in user
    """

    form = TodoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_todo = Todo(
            user_id = userId,
            title = form.data["title"],
            notes = form.data["notes"],
            checklist = form.data["checklist"],
            difficulty = form.data["difficulty"],
            due_date = form.data["due_date"],
            tags = form.data["tags"]
        )

        db.session.add(new_todo)
        db.session.commit()

        return json.dumps([{'todo': new_todo.to_dict()}]), 201

    if form.errors:
        return form.errors

@todo_routes.route('/todo/<int:todoId>', methods=['PUT'])
@login_required
def update_todo(todoId):
    """
    Updates a todo using the todo id, returns the updated todo in a dictionary
    """

    todo = Todo.query.get(todoId)
    if not todo:
        return json.dumps({'message': 'Todo not found'}), 404

    data = request.get_json()

    title = data.get('title')
    notes = data.get('notes')
    checklist = data.get('checklist')
    difficulty = data.get('difficulty')
    due_date = data.get('due_date')
    tags = data.get('tags')

    todo.title = title
    todo.notes = notes
    todo.checklist = checklist
    todo.difficulty = difficulty
    todo.due_date = due_date
    todo.tags = tags

    db.session.commit()

    return jsonify(todo.to_dict())

@todo_routes.route('/todo/<int:todoId>', methods=['DELETE'])
@login_required
def delete_todo(todoId):
    """
    Deletes a todo based on its id
    """

    todo = Todo.query.get(todoId)
    if todo:
        db.session.delete(todo)
        db.session.commit()
        return json.dumps({'message': 'Todo deleted successfully'}), 200

    return json.dumps({'message': 'Todo not found'}), 404
