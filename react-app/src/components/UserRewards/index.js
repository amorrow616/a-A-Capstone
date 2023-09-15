import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import * as rewardActions from '../../store/rewards';

export default function UserRewards() {
    const dispatch = useDispatch();
    const rewards = useSelector((state) => state.rewards.allRewards);
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReward = {
            title
        }
        const returnFromThunk = rewardActions.createReward(newReward, userId);
        return dispatch(returnFromThunk).then(async () => {
            await dispatch(rewardActions.fetchRewards(userId));
            setTitle('');
        });
    }

    useEffect(() => {
        dispatch(rewardActions.fetchRewards(userId));
    }, [dispatch, userId]);

    if (!Object.values(rewards)) return null;
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Add a Reward'
                        id="habitOneLine"
                    />
                </label>
            </form>
            {Object.values(rewards).map((reward) => (
                <li key={reward.id} id="habitsList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div>{reward.title}</div>
                            <div>{reward.notes}</div>
                        </div>
                        {/* <OpenModalButton
                            modalComponent={<UpdateReward reward={reward} />}
                            className={'updateButton'}
                        /> */}
                    </div >
                </li>
            ))}
        </>
    )
}
