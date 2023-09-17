import json
from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import db, Reward
from app.forms import RewardForm

reward_routes = Blueprint('rewards', __name__)

@reward_routes.route('/<int:userId>')
@login_required
def user_rewards(userId):
    """
    Query for all rewards of specific userand return them in a dictionary
    """
    rewards = Reward.query.filter(Reward.user_id == userId).all()
    return {'rewards': [reward.to_dict() for reward in rewards]}

@reward_routes.route('/<int:userId>', methods=['POST'])
@login_required
def create_reward(userId):
    """
    Create a reward linked to logged in user
    """
    form = RewardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_reward = Reward(
            user_id = userId,
            title = form.data["title"],
            notes = form.data["notes"],
            cost = form.data["cost"],
            tags = form.data["tags"]
        )
        db.session.add(new_reward)
        db.session.commit()

        return json.dumps([{'reward': new_reward.to_dict()}]), 201

    if form.errors:
        return form.errors

@reward_routes.route('/reward/<int:rewardId>', methods=['PUT'])
@login_required
def update_reward(rewardId):
    """
    Updates a reward using the rewards id, returns updated reward in a dictionary
    """
    reward = Reward.query.get(rewardId)
    if not reward:
        return json.dumps({'message': 'Reward not found'}), 404

    data = request.get_json()

    title = data.get('title')
    notes = data.get('notes')
    cost = data.get('cost')
    tags = data.get('tags')

    reward.title = title
    reward.notes = notes
    reward.cost = cost
    reward.tags = tags

    db.session.commit()

    return jsonify(reward.to_dict())

@reward_routes.route('/reward/<int:rewardId>', methods=['DELETE'])
@login_required
def delete_reward(rewardId):
    """
    Deletes a reward based on its id
    """
    reward = Reward.query.get(rewardId)
    if reward:
        db.session.delete(reward)
        db.session.commit()
        return json.dumps({'message': 'Reward deleted successfully'}), 200

    return json.dumps({'message': 'Reward not found'}), 404
