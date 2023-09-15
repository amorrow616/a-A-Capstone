import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as todoActions from '../../store/todos';

export default function CreateTodo({ todo, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState(formType === 'Update Todo' ? todo.title : '');
    const [notes, setNotes] = useState(formType === 'Update Todo' ? todo.notes : '');
    const [checklist, setChecklist] = useState(formType === 'Update Todo' ? todo.checklist : '');
    // const [checklistItems, setChecklistItems] = useState([]);
    const [difficulty, setDifficulty] = useState(formType === 'Update Todo' ? todo.difficulty : '');
    const [dueDate, setDueDate] = useState(formType === 'Update Todo' ? todo.dueDate : '');
    const [tags, setTags] = useState(formType === 'Update Todo' ? todo.tags : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTodo = {
            title,
            notes,
            checklist,
            difficulty,
            dueDate,
            tags
        }

        if (formType === 'Update Todo') {
            const returnFromThunk = todoActions.updateTodo(newTodo, todo.id);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(todoActions.fetchTodos(userId));
                closeModal();
            });
        } else {
            const returnFromThunk = todoActions.createTodo(newTodo, userId);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(todoActions.fetchTodos(userId));
                closeModal();
            })
        }
    }
    return (
        <>
            {formType === 'Update Todo' ? <h1>Edit To Do</h1> : <h1>Create To Do</h1>}
            <form onSubmit={handleSubmit} className="createForms">
                <label>
                    Title*
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Add a title'
                    />
                </label>
                <label>
                    Notes
                    <input
                        type='text'
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        placeholder='Add notes'
                    />
                </label>
                <label>
                    Checklist
                    <input
                        type='text'
                        onChange={(e) => setChecklist(e.target.value)}
                        value={checklist}
                        placeholder='New checklist item'
                    />
                </label>
                Difficulty
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value='Trivial'>Trivial</option>
                    <option value='Easy'>Easy</option>
                    <option value='Medium'>Medium</option>
                    <option value='Hard'>Hard</option>
                </select>
                <label>
                    Due Date
                    <input
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                Tags
                <select
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                >
                    <option value='Work'>Work</option>
                    <option value='Exercise'>Exercise</option>
                    <option value='Health + Wellness'>Health + Wellness</option>
                    <option value='School'>School</option>
                    <option value='Teams'>Teams</option>
                    <option value='Chores'>Chores</option>
                    <option value='Creativity'>Creativity</option>
                </select>
                {formType === 'Update Todo' ? <button type='submit' disabled={title.length < 1}>Save</button> : <button type='submit' disabled={title.length < 1}>Create</button>}
            </form>
        </>
    )
}
