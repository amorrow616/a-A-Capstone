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
            <div>
                <h1>Confirm Delete</h1>
                <h2>Are you sure you want to delete this to do?</h2>
                <button onClick={(e) => todoDelete(e, todoId)} id='deleteButton'>Yes (delete todo)</button>
                <button onClick={closeModal} id='dontDeleteButton'>No (keep todo)</button>
            </div>
        </>
    )
}
