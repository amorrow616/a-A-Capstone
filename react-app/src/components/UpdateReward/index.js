import CreateReward from "../CreateReward";
import DeleteReward from '../DeleteReward';
import OpenModalButton from "../OpenModalButton";

export default function UpdateReward({ reward }) {
    return (
        <>
            <CreateReward reward={reward} formType={'Update Reward'} />
            <OpenModalButton
                modalComponent={<DeleteReward reward={reward} />}
                buttonText={'Delete reward'}
            />
        </>
    )
}
