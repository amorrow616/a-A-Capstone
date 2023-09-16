import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as rewardActions from '../../store/rewards';

export default function DeleteReward({ reward }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const rewardId = reward.id;

    const rewardDelete = async (e, rewardId) => {
        e.preventDefault();
        await dispatch(rewardActions.deleteRewardThunk(rewardId));
        await dispatch(rewardActions.fetchRewards(reward.user_id));
        closeModal();
    }
    return (
        <>
            <div>
                <h1>Confirm Delete</h1>
                <h2>Are you sure you want to delete this reward?</h2>
                <button onClick={(e) => rewardDelete(e, rewardId)} id='deleteButton'>Yes (delete reward)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (keep reward)</button>
            </div>
        </>
    )
}
