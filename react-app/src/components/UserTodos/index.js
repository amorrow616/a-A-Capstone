import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateTodo from '../UpdateTodo';
import OpenModalButton from '../OpenModalButton';
import * as todoActions from '../../store/todos';
import './UserTodos.css';

export default function UserTodos() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.allTodos);
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length < 1 || title.length > 255) {
            return;
        }
        const newTodo = {
            title
        }
        const returnFromThunk = todoActions.createTodo(newTodo, userId);
        return dispatch(returnFromThunk).then(async () => {
            await dispatch(todoActions.fetchTodos(userId));
            setTitle('');
        });
    }

    useEffect(() => {
        dispatch(todoActions.fetchTodos(userId));
    }, [dispatch, userId]);

    if (!Object.values(todos)) return null;
    return (
        <>
            {title.length > 255 ? <p id="errorP">Title cannot be longer than 255 characters.</p> : ''}
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder={'Add a To Do'}
                        id="dailyOneLine"
                    />
                </label>
            </form>
            {Object.values(todos).map((todo) => (
                <li key={todo.id} id="dailiesList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div className="formTitle">{todo.title}</div>
                            <div>{todo.notes}</div>
                            <div>{todo.checklist.split(',').map((item) => (
                                <label>
                                    <input
                                        type='checkbox'
                                    />
                                    {item}
                                </label>
                            ))}</div>
                        </div>
                        <OpenModalButton
                            modalComponent={<UpdateTodo todo={todo} />}
                            className={'updateButton'}
                        />
                    </div>
                </li>
            ))}
        </>
    )
}
