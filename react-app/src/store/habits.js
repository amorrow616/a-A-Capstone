const GET_HABITS = 'habits/GET_HABITS';

const getHabits = (habits) => {
    return {
        type: GET_HABITS,
        payload: habits
    }
}

export const fetchHabits = (userId) => async (dispatch) => {
    const response = await fetch(`/api/habits/${userId}`);
    const data = await response.json();

    const emptyObj = {};
    data.habits.map((habit) => {
        return emptyObj[habit.id] = habit;
    })

    dispatch(getHabits(emptyObj));
}

const initialState = { allHabits: {}, singleHabit: {} }

export default function habitsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_HABITS:
            const newState = Object.assign({}, state);
            newState.allHabits = action.payload;
            return newState;
        default:
            return state;
    }
}
