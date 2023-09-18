import CreateDaily from "../CreateDaily";
import OpenModalButton from "../OpenModalButton";
import DeleteDaily from "../DeleteDaily";
import { FaRegTrashCan } from "react-icons/fa6";

export default function UpdateDaily({ daily }) {
    return (
        <>
            <CreateDaily daily={daily} formType={'Update Daily'} />
            <OpenModalButton
                modalComponent={<DeleteDaily daily={daily} />}
                buttonText={<>
                    <FaRegTrashCan />
                    Delete this daily
                </>}
                className="deleteOnEditForm"
            />
        </>
    )
}
