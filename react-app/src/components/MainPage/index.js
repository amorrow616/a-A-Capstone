import AddTask from '../AddTask';
import UserHabits from '../UserHabits';
import UserDailies from '../UserDailies';
import UserTodos from '../UserTodos';
import UserRewards from '../UserRewards';
import './MainPage.css';

export default function MainPage() {
    return (
        <>
            <AddTask />
            <div className="mainPageColumns">
                <div className="habitsColumn">
                    <h2 className="columnHeads">Habits</h2>
                    <div className="innerColumns">
                        <UserHabits />
                    </div>
                </div>
                <div className="dailiesColumn">
                    <h2 className="columnHeads">Dailies</h2>
                    <div className="innerColumns">
                        <UserDailies />
                    </div>
                </div>
                <div className="todosColumn">
                    <h2 className="columnHeads">To Do's</h2>
                    <div className="innerColumns">
                        <UserTodos />
                    </div>
                </div>
                <div className="rewardsColumn">
                    <h2 className="columnHeads">Rewards</h2>
                    <div className="innerColumns">
                        <UserRewards />
                    </div>
                </div>
            </div>
        </>
    )
}
