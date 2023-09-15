import { useState } from 'react';
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
    const [positiveNegative, setPositiveNegative] = useState(formType === 'Update Habit' ? habit.positiveNegative : false);
    const [difficulty, setDifficulty] = useState(formType === 'Update Habit' ? habit.difficulty : '');
    const [tags, setTags] = useState(formType === 'Update Habit' ? habit.tags : '');
    const [resetCounter, setResetCounter] = useState(formType === 'Update Habit' ? habit.resetCounter : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHabit = {
            title,
            notes,
            positiveNegative,
            difficulty,
            tags,
            resetCounter
        };

        if (formType === 'Update Habit') {
            const returnFromThunk = habitActions.updateHabit(newHabit, habit.id);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(habitActions.fetchHabits(userId));
                closeModal();
            });
        } else {
            const returnFromThunk = habitActions.createHabit(newHabit, userId);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(habitActions.fetchHabits(userId));
                closeModal();
            });
        }
    }
    return (
        <>
            {formType === 'Update Habit' ? <h1>Edit Habit</h1> : <h1>Create Habit</h1>}
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
                <input
                    type='checkbox'
                    name='positive'
                    id='positive'
                    onChange={(e) => setPositiveNegative(e.target.value)}
                    value={positiveNegative}
                />
                <label for="positive">Positive</label>
                <input
                    type='checkbox'
                    name='negative'
                    id='negative'
                    onChange={(e) => setPositiveNegative(e.target.value)}
                    value={positiveNegative}
                />
                <label for="negative">Negative</label>
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
                Reset Counter
                <select
                    value={resetCounter}
                    onChange={(e) => setResetCounter(e.target.value)}
                >
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Monthly'>Monthly</option>
                </select>
                {formType === 'Update Habit' ? <button type='submit' disabled={title.length < 1}>Save</button> : <button type='submit' disabled={title.length < 1}>Create</button>}
            </form>
        </>
    )
}
