const GET_TODOS = 'todos/GET_TODOS';
const GET_TODO = 'todos/GET_TODO';
const DELETE_TODO = 'todos/DELETE_TODO';

const getTodos = (todos) => {
    return {
        type: GET_TODOS,
        payload: todos
    }
}

const getTodo = (todo) => {
    return {
        type: GET_TODO,
        payload: todo
    }
}

const toDeleteTodo = (todoId) => {
    return {
        type: DELETE_TODO,
        payload: todoId
    }
}

export const fetchTodos = (userId) => async (dispatch) => {
    const response = await fetch(`/api/todos/${userId}`);
    const data = await response.json();

    const flatten = {};
    data.todos.map((todo) => {
        return flatten[todo.id] = todo;
    });

    dispatch(getTodos(flatten));
}

export const createTodo = (payload, userId) => async (dispatch) => {
    const response = await fetch(`/api/todos/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const todo = await response.json();
        dispatch(getTodo(todo));
        return todo;
    }
}

export const updateTodo = (payload, todoId) => async (dispatch) => {
    const response = await fetch(`/api/todos/todo/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const todo = await response.json();
        dispatch(getTodo(todo));
        return todo;
    }
}

export const deleteTodoThunk = (todoId) => async (dispatch) => {
    const response = await fetch(`/api/todos/todo/${todoId}`, {
        method: 'DELETE'
    });

    const todo = await response.json();
    dispatch(toDeleteTodo(todo));
    return todo;
}

const initialState = { allTodos: {}, singleTodo: {} };

export default function todosReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_TODOS:
            newState = Object.assign({}, state);
            newState.allTodos = action.payload;
            return newState;
        case GET_TODO:
            newState = Object.assign({}, state);
            newState.singleTodo = action.payload;
            return newState;
        case DELETE_TODO:
            const newRef = { ...state.allTodos };
            delete newRef[action.payload];
            newState = { ...state, allTodos: { ...newRef } };
            return newState;
        default:
            return state;
    }
}
