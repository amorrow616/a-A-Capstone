import CreateHabit from '../CreateHabit';
import OpenModalButton from '../OpenModalButton';
import DeleteHabit from '../DeleteHabit';

export default function UpdateHabit({ habit }) {
    return (
        <>
            <CreateHabit habit={habit} formType='Update Habit' />
            <OpenModalButton
                modalComponent={<DeleteHabit habit={habit} />}
                buttonText={'Delete habit'}
            />
        </>
    )
}
