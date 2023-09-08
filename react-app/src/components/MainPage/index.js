import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as habitActions from '../../store/habits';
import './MainPage.css';

export default function MainPage() {
    const dispatch = useDispatch();
    const habits = useSelector((state) => state.habits.allHabits);
    const sessionUserId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(habitActions.fetchHabits(sessionUserId));
    }, [dispatch, sessionUserId]);

    if (!Object.values(habits)) return null;
    console.log(habits)
    return (
        <>
            {Object.values(habits).map((habit) => (
                <li key={habit.id}>
                    <div>{habit}</div>
                </li>
            ))}
        </>
    )
}
