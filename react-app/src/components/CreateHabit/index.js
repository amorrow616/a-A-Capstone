import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as habitActions from '../../store/habits';
import './CreateHabit.css';

export default function CreateHabit() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [positiveOrNegative, setPositiveOrNegative] = useState(false);
    const [difficulty, setDifficulty] = useState('');
    const [tags, setTags] = useState('');
    const [resetCounter, setResetCounter] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHabit = {
            title,
            notes,
            positiveOrNegative,
            difficulty,
            tags,
            resetCounter
        };
        const returnFromThunk = habitActions.createHabit(newHabit, userId);
        return dispatch(returnFromThunk).then(() => {
            dispatch(habitActions.fetchHabits(userId));
            closeModal();
        })
    }
    return (
        <>
            <h1>Create Habit</h1>
            <form onSubmit={handleSubmit}>
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
                    Positive
                    <input
                        type='radio'
                        name="positiveornegative"
                        onClick={(e) => setPositiveOrNegative(e.target.value)}
                        value={positiveOrNegative}
                    />
                </label>
                <label>
                    Negative
                    <input
                        type='radio'
                        name="positiveornegative"
                        onClick={(e) => setPositiveOrNegative(e.target.value)}
                        value={positiveOrNegative}
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
                <button type='submit' disabled={title.length < 1}>Create</button>
            </form>
        </>
    )
}
