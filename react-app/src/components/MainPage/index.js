import UserHabits from '../UserHabits';
import UserDailies from '../UserDailies';
import CreateHabit from '../CreateHabit';
import CreateDaily from '../CreateDaily';
import OpenModalButton from '../OpenModalButton';
import './MainPage.css';

export default function MainPage() {
    return (
        <>
            <OpenModalButton
                modalComponent={<CreateHabit />}
                buttonText={'Habit'}
            />
            <OpenModalButton
                modalComponent={<CreateDaily />}
                buttonText={'Daily'}
            />
            <div className="mainPageColumns">
                <div className="habitsColumn">
                    <h2>Habits</h2>
                    <div className="innerColumns">
                        <UserHabits />
                    </div>
                </div>
                <div className="dailiesColumn">
                    <h2>Dailies</h2>
                    <div className="innerColumns">
                        <UserDailies />
                    </div>
                </div>
                <div className="todosColumn">
                    <h2>To Do's</h2>
                    <div className="innerColumns">
                        <p>column for to do's</p>
                    </div>
                </div>
                <div className="rewardsColumn">
                    <h2>Rewards</h2>
                    <div className="innerColumns">
                        <p>column for rewards</p>
                    </div>
                </div>
            </div>
        </>
    )
}
