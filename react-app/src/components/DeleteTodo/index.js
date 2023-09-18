import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as todoActions from '../../store/todos';

export default function DeleteTodo({ todo }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const todoId = todo.id;

    const todoDelete = async (e, todoId) => {
        e.preventDefault();
        await dispatch(todoActions.deleteTodoThunk(todoId));
        await dispatch(todoActions.fetchTodos(todo.user_id));
        closeModal();
    }
    return (
        <>
            <div className="deleteModal">
                <h1 id='deleteSpotHead'>Confirm Delete</h1>
                <h2 id='deleteSpotBlurb'>Are you sure you want to delete this to do?</h2>
                <button onClick={(e) => todoDelete(e, todoId)} id='deleteButton'>Yes (delete to do)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (keep to do)</button>
            </div>
        </>
    )
}
