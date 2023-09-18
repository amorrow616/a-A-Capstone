import CreateReward from "../CreateReward";
import DeleteReward from '../DeleteReward';
import OpenModalButton from "../OpenModalButton";
import { FaRegTrashCan } from "react-icons/fa6";

export default function UpdateReward({ reward }) {
    return (
        <>
            <CreateReward reward={reward} formType={'Update Reward'} />
            <OpenModalButton
                modalComponent={<DeleteReward reward={reward} />}
                buttonText={<>
                    <FaRegTrashCan />
                    Delete this reward
                </>}
                className="deleteOnEditForm"
            />
        </>
    )
}
