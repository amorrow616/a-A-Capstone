import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as dailyActions from "../../store/dailies";
import './DeleteDaily.css';

export default function DeleteDaily({ daily }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const dailyId = daily.id;

    const dailyDelete = async (e, dailyId) => {
        e.preventDefault();
        await dispatch(dailyActions.deleteDailyThunk(dailyId));
        await dispatch(dailyActions.fetchDailies(daily.user_id));
        closeModal();
    };
    return (
        <>
            <div className="deleteModal">
                <h1 id='deleteSpotHead'>Confirm Delete</h1>
                <h2 id='deleteSpotBlurb'>Are you sure you want to delete this daily?</h2>
                <button onClick={(e) => dailyDelete(e, dailyId)} id='deleteButton'>Yes (delete daily)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (keep daily)</button>
            </div>
        </>
    )
}
