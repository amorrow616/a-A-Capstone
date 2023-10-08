import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateReward from '../UpdateReward';
import OpenModalButton from '../OpenModalButton';
import { BsCoin } from "react-icons/bs";
import * as rewardActions from '../../store/rewards';
import './UserRewards.css';

export default function UserRewards() {
    const dispatch = useDispatch();
    const rewards = useSelector((state) => state.rewards.allRewards);
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length < 1 || title.length > 255) {
            return;
        }
        const newReward = {
            title,
            cost: 10
        }
        const returnFromThunk = rewardActions.createReward(newReward, userId);
        await dispatch(returnFromThunk);
        await dispatch(rewardActions.fetchRewards(userId));
        setTitle('');
    }

    useEffect(() => {
        dispatch(rewardActions.fetchRewards(userId));
    }, [dispatch, userId]);

    if (!Object.values(rewards)) return null;
    return (
        <>
            {title.length > 255 ? <p id="errorP">Title cannot be longer than 255 characters.</p> : ''}
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
            {rewards && Object.values(rewards).map((reward) => (
                <li key={reward.id} id="habitsList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div className="formTitle">{reward.title}</div>
                            <div className="formNotes">{reward.notes}</div>
                            <div id="rewardCost"><BsCoin id='rewardCoin' />{reward.cost}</div>
                        </div>
                        <OpenModalButton
                            modalComponent={<UpdateReward reward={reward} />}
                            className={'updateButtonWhole'}
                        />
                    </div >
                </li>
            ))}
        </>
    )
}
