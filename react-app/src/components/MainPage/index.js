import UserHabits from '../UserHabits';
import UserDailies from '../UserDailies';
import AddTask from '../AddTask';
import './MainPage.css';

export default function MainPage() {
    return (
        <>
            <AddTask />
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
