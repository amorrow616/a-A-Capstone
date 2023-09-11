import CreateDaily from "../CreateDaily";
import OpenModalButton from "../OpenModalButton";
import DeleteDaily from "../DeleteDaily";

export default function UpdateDaily({ daily }) {
    return (
        <>
            <CreateDaily daily={daily} formType={'Update Daily'} />
            <OpenModalButton
                modalComponent={<DeleteDaily daily={daily} />}
                buttonText={'Delete daily'}
            />
        </>
    )
}
