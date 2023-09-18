import CreateHabit from '../CreateHabit';
import OpenModalButton from '../OpenModalButton';
import DeleteHabit from '../DeleteHabit';
import { FaRegTrashCan } from "react-icons/fa6";
import './UpdateHabit.css';

export default function UpdateHabit({ habit }) {
    return (
        <>
            <CreateHabit habit={habit} formType='Update Habit' />
            <OpenModalButton
                modalComponent={<DeleteHabit habit={habit} />}
                buttonText={<>
                    <FaRegTrashCan />
                    Delete this habit
                </>}
                className="deleteOnEditForm"
            />
        </>
    )
}
