const GET_HABITS = 'habits/GET_HABITS';
const GET_HABIT = 'habits/GET_HABIT';

const getHabits = (habits) => {
    return {
        type: GET_HABITS,
        payload: habits
    }
}

const getHabit = (habit) => {
    return {
        type: GET_HABIT,
        payload: habit
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

export const createHabit = (payload, userId) => async (dispatch) => {
    const response = await fetch(`/api/habits/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const habit = await response.json();
        dispatch(getHabit(habit))
        return habit;
    }
}

export const updateHabit = (payload, habitId) => async (dispatch) => {
    const response = await fetch(`/api/habits/habit/${habitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const habit = await response.json();
        dispatch(getHabit(habit));
        return habit;
    }
}

const initialState = { allHabits: {}, singleHabit: {} }

export default function habitsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_HABITS:
            newState = Object.assign({}, state);
            newState.allHabits = action.payload;
            return newState;
        case GET_HABIT:
            newState = Object.assign({}, state);
            newState.singleHabit = action.payload;
            return newState;
        default:
            return state;
    }
}
