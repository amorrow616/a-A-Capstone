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
    const [checkboxStates, setCheckboxStates] = useState(() => {
        const storedStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
        return storedStates;
    });

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
    };

    const handleCheckboxChange = (todoId, index) => {
        const updatedStates = {
            ...checkboxStates,
            [todoId]: {
                ...(checkboxStates[todoId] || {}),
                [index]: !(checkboxStates[todoId]?.[index] || false)
            }
        };
        setCheckboxStates(updatedStates);
        localStorage.setItem('checkboxStates', JSON.stringify(updatedStates));
    };

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
            {todos && Object.values(todos).map((todo) => {
                const todoId = todo.id;
                const todoCheckboxStates = checkboxStates[todoId] || [];
                return (
                    <li key={todo.id} id="dailiesList">
                        <div className="eachElement">
                            <div className="visibleElement">
                                <div className="formTitle">{todo.title}</div>
                                <div className="formNotes">{todo.notes}</div>
                                <div>{todo.checklist && todo.checklist.split(',').map((item, index) => (
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={todoCheckboxStates[index] || false}
                                            onChange={() => handleCheckboxChange(todoId, index)}
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
                )
            })}
            <h4 className='infoBlurbs'>These are your To Do's</h4>
            <p className='infoBlurbs'>To Do's need to be completed once. Add checklists to your To Do's to increase their value.</p>
        </>
    )
}
