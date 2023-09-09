import CreateHabit from '../CreateHabit';

export default function UpdateHabit({ habit }) {
    return (
        <CreateHabit habit={habit} formType='Update Habit' />
    )
}
