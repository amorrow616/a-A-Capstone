const GET_HABITS = 'habits/GET_HABITS';

const flatten = (arr) => {
    const obj = {};
    if (arr) {
        if (!arr.length) return {};
        for (let el of arr) {
            obj[el.id] = el
        }
    }
    return obj;
}

const getHabits = (habits) => {
    return {
        type: GET_HABITS,
        payload: habits
    }
}

export const fetchHabits = (userId) => async (dispatch) => {
    const response = await fetch(`/api/habits/${userId}`);
    const data = await response.json();

    if (data && !data.errors) dispatch(getHabits(data));
    return data;
}

const initialState = { allHabits: {}, singleHabit: {} }

export default function habitsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HABITS:
            const newState = Object.assign({}, state);
            newState.allHabits = flatten(action.habits);
            return newState;
        default:
            return state;
    }
}
