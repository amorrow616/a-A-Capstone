import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateHabit from '../UpdateHabit';
import * as habitActions from '../../store/habits';
import { AiOutlineTag } from "react-icons/ai";
import './UserHabits.css';

export default function UserHabits() {
    const dispatch = useDispatch();
    const habits = useSelector((state) => state.habits.allHabits);
    const sessionUserId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length < 1 || title.length > 255) {
            return;
        }
        const newHabit = {
            title
        }

        const returnFromThunk = habitActions.createHabit(newHabit, sessionUserId);
        return dispatch(returnFromThunk).then(async () => {
            await dispatch(habitActions.fetchHabits(sessionUserId));
            setTitle('');
        });
    }

    useEffect(() => {
        dispatch(habitActions.fetchHabits(sessionUserId));
    }, [dispatch, sessionUserId]);

    if (!Object.values(habits)) return null;
    return (
        <>
            {title.length > 255 ? <p id="errorP">Title cannot be longer than 255 characters.</p> : ''}
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Add a Habit'
                        id="habitOneLine"
                    />
                </label>
            </form>
            {habits && Object.values(habits).map((habit) => (
                <li key={habit.id} id="habitsList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div className="formTitle">{habit.title}</div>
                            <div className="formNotes">{habit.notes}</div>
                            <div className="tagIcon">{habit.tags ? <AiOutlineTag /> : ''}</div>
                        </div>
                        <OpenModalButton
                            modalComponent={<UpdateHabit habit={habit} />}
                            className={'updateButtonWhole'}
                        />
                    </div >
                </li>
            ))
            }
        </>
    )
}
