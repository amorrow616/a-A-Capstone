import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as habitActions from '../../store/habits';
import './CreateHabit.css';

export default function CreateHabit({ habit, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState(formType === 'Update Habit' ? habit.title : '');
    const [notes, setNotes] = useState(formType === 'Update Habit' ? habit.notes : '');
    const [positive, setPositive] = useState(formType === 'Update Habit' ? habit.positive : false);
    const [negative, setNegative] = useState(formType === 'Update Habit' ? habit.negative : false);
    const [difficulty, setDifficulty] = useState(formType === 'Update Habit' ? habit.difficulty : '');
    const [tags, setTags] = useState(formType === 'Update Habit' ? habit.tags : '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (title.length < 1 || title.length > 255) {
            errors.title = 'Title must be between 1 and 255 characters.'
        }
        if (notes && notes.length > 450) {
            errors.notes = 'Notes must be less than 450 characters.'
        }

        setErrors(errors);
    }, [title, notes])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHabit = {
            title,
            notes,
            positive,
            negative,
            difficulty,
            tags
        };

        if (formType === 'Update Habit') {
            const returnFromThunk = habitActions.updateHabit(newHabit, habit.id);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(habitActions.fetchHabits(userId));
                closeModal();
            });
        } else {
            const returnFromThunk = habitActions.createHabit(newHabit, userId);
            await dispatch(returnFromThunk);
            await dispatch(habitActions.fetchHabits(userId));
            closeModal();
        }
    }
    return (
        <>
            {formType === 'Update Habit' ? <h1>Edit Habit</h1> : <h1>Create Habit</h1>}
            <form onSubmit={handleSubmit} className="createForms">
                <label>
                    Title*
                    {errors.title && <p id="errorP">{errors.title}</p>}
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Add a title'
                    />
                </label>
                <label>
                    {errors.notes && <p id="errorP">{errors.notes}</p>}
                    Notes
                    <input
                        type='text'
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        placeholder='Add notes'
                    />
                </label>
                <label for="positive">Positive</label>
                <input
                    type='checkbox'
                    name='positive'
                    id='positive'
                    onChange={() => setPositive(!positive)}
                    value={positive}
                    checked={positive}
                />
                <label for="negative">Negative</label>
                <input
                    type='checkbox'
                    name='negative'
                    id='negative'
                    onChange={() => setNegative(!negative)}
                    value={negative}
                    checked={negative}
                />
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
                {formType === 'Update Habit' ? <button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450)}>Save</button> : <button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450)}>Create</button>}
            </form>
        </>
    )
}
