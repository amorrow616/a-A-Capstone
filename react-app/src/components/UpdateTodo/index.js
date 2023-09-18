import CreateTodo from "../CreateTodo";
import DeleteTodo from "../DeleteTodo";
import OpenModalButton from "../OpenModalButton";
import { FaRegTrashCan } from "react-icons/fa6";

export default function UpdateTodo({ todo }) {
    return (
        <>
            <CreateTodo todo={todo} formType={'Update Todo'} />
            <OpenModalButton
                modalComponent={<DeleteTodo todo={todo} />}
                buttonText={<>
                    <FaRegTrashCan />
                    Delete this to do
                </>}
                className="deleteOnEditForm"
            />
        </>
    )
}
