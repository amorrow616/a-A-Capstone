import UserHabits from '../UserHabits';
import CreateHabit from '../CreateHabit';
import OpenModalButton from '../OpenModalButton';
import './MainPage.css';

export default function MainPage() {
    return (
        <>
            <UserHabits />
            <OpenModalButton
                modalComponent={<CreateHabit />}
                buttonText={'Habit'}
            />
        </>
    )
}
