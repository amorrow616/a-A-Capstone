import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as habitActions from "../../store/habits";

export default function DeleteHabit({ habit }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const habitId = habit.id;

    const habitDelete = async (e, habitId) => {
        e.preventDefault();
        await dispatch(habitActions.deleteHabitThunk(habitId));
        await dispatch(habitActions.fetchHabits(habit.user_id));
        closeModal();
    };
    return (
        <>
            <div>
                <h1>Confirm Delete</h1>
                <h2>Are you sure you want to delete this habit?</h2>
                <button onClick={(e) => habitDelete(e, habitId)} id='deleteButton'>Yes (delete habit)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (keep habit)</button>
            </div>
        </>
    )
};
