import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateHabit from '../UpdateHabit';
import * as habitActions from '../../store/habits';
import './UserHabits.css';

export default function UserHabits() {
    const dispatch = useDispatch();
    const habits = useSelector((state) => state.habits.allHabits);
    const sessionUserId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(habitActions.fetchHabits(sessionUserId));
    }, [dispatch, sessionUserId]);

    if (!Object.values(habits)) return null;
    return (
        <>
            {Object.values(habits).map((habit) => (
                <li key={habit.id}>
                    <div>{habit.title}</div>
                    <div>{habit.notes}</div>
                    <OpenModalButton
                        modalComponent={<UpdateHabit habit={habit} />}
                        buttonText={'Update habit'}
                    />
                </li>
            ))
            }
        </>
    )
}
