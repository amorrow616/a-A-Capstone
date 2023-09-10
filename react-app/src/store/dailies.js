const GET_DAILIES = 'dailies/GET_DAILIES';
const GET_DAILY = 'dailies/GET_DAILY';
const DELETE_DAILY = 'dailies/DELETE_DAILY';

const getDailies = (dailies) => {
    return {
        type: GET_DAILIES,
        payload: dailies
    }
}

const getDaily = (daily) => {
    return {
        type: GET_DAILY,
        payload: daily
    }
}

const toDeleteDaily = (dailyId) => {
    return {
        type: DELETE_DAILY,
        payload: dailyId
    }
}

export const fetchDailies = (userId) => async (dispatch) => {
    const response = await fetch(`/api/dailies/${userId}`);
    const data = await response.json();

    const flatten = {};
    data.dailies.map((daily) => {
        return flatten[daily.id] = daily;
    });

    dispatch(getDailies(flatten));
}

export const createDaily = (payload, userId) => async (dispatch) => {
    const response = await fetch(`/api/dailies/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const daily = await response.json();
        dispatch(getDaily(daily));
        return daily;
    }
}

export const
