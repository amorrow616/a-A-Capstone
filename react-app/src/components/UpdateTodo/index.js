import CreateTodo from "../CreateTodo";
import DeleteTodo from "../DeleteTodo";
import OpenModalButton from "../OpenModalButton";

export default function UpdateTodo({ todo }) {
    return (
        <>
            <CreateTodo todo={todo} formType={'Update Todo'} />
            <OpenModalButton
                modalComponent={<DeleteTodo todo={todo} />}
                buttonText={'Delete to do'}
            />
        </>
    )
}
