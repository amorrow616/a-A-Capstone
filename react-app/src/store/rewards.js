const GET_REWARDS = 'rewards/GET_REWARDS';
const GET_REWARD = 'rewards/GET_REWARD';
const DELETE_REWARD = 'rewards/DELETE_REWARD';

const getRewards = (rewards) => {
    return {
        type: GET_REWARDS,
        payload: rewards
    }
}

const getReward = (reward) => {
    return {
        type: GET_REWARD,
        payload: reward
    }
}

const toDeleteReward = (rewardId) => {
    return {
        type: DELETE_REWARD,
        payload: rewardId
    }
}

export const fetchRewards = (userId) => async (dispatch) => {
    const response = await fetch(`/api/rewards/${userId}`);
    const data = await response.json();

    const flattened = {};
    data.rewards.map((reward) => {
        return flattened[reward.id] = reward;
    });

    dispatch(getRewards(flattened));
}

export const createReward = (payload, userId) => async (dispatch) => {
    const response = await fetch(`/api/rewards/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const reward = await response.json();
        dispatch(getReward(reward));
        return reward;
    }
}

export const updateReward = (payload, rewardId) => async (dispatch) => {
    const response = await fetch(`/api/rewards/reward/${rewardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const reward = await response.json();
        dispatch(getReward(reward));
        return reward;
    }
}

export const deleteRewardThunk = (rewardId) => async (dispatch) => {
    const response = await fetch(`/api/rewards/reward/${rewardId}`, {
        method: 'DELETE'
    });

    const reward = await response.json();

    dispatch(toDeleteReward(reward));
    return reward;
}

const initialState = { allRewards: {}, singleReward: {} };

export default function rewardsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_REWARDS:
            newState = Object.assign({}, state);
            newState.allRewards = action.payload;
            return newState;
        case GET_REWARD:
            newState = Object.assign({}, state);
            newState.singleReward = action.payload;
            return newState;
        case DELETE_REWARD:
            const newRef = { ...state.allRewards };
            delete newRef[action.payload];
            newState = { ...state, allRewards: { ...newRef } };
            return newState;
        default:
            return state;
    }
}
