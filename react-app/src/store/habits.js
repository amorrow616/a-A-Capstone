const GET_HABITS = 'habits/GET_HABITS';
const GET_HABIT = 'habits/GET_HABIT';
const DELETE_HABIT = 'habits/DELETE_HABIT';

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

const toDeleteHabit = (habitId) => {
    return {
        type: DELETE_HABIT,
        payload: habitId
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

export const deleteHabitThunk = (habitId) => async (dispatch) => {
    const response = await fetch(`/api/habits/habit/${habitId}`, {
        method: 'DELETE'
    });

    const habit = await response.json();

    dispatch(toDeleteHabit(habit));
    return habit;
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
        case DELETE_HABIT:
            const newRef = { ...state.allHabits };
            delete newRef[action.payload];
            newState = { ...state, allHabits: { ...newRef } };
            return newState;
        default:
            return state;
    }
}
