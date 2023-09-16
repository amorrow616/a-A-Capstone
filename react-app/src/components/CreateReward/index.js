import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as rewardActions from '../../store/rewards';

export default function CreateReward({ reward, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState(formType === 'Update Reward' ? reward.title : '');
    const [notes, setNotes] = useState(formType === 'Update Reward' ? reward.notes : '');
    const [cost, setCost] = useState(formType === 'Update Reward' ? reward.cost : 1);
    const [tags, setTags] = useState(formType === 'Update Reward' ? reward.tags : '');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReward = {
            title,
            notes,
            cost,
            tags
        };

        if (formType === 'Update Reward') {
            const returnFromThunk = rewardActions.updateReward(newReward, reward.id);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(rewardActions.fetchRewards(userId));
                closeModal();
            }).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
        } else {
            const returnFromThunk = rewardActions.createReward(newReward, userId);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(rewardActions.fetchRewards(userId));
                closeModal();
            }).catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
        }
    }
    return (
        <>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            {formType === 'Update Reward' ? <h1>Edit Reward</h1> : <h1>Create Reward</h1>}
            <form onSubmit={handleSubmit} className="createForms">
                <label>
                    Title*
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder='Add a title'
                    />
                </label>
                <label>
                    Notes
                    <input
                        type='text'
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        placeholder='Add notes'
                    />
                </label>
                <label>
                    Cost
                    <input
                        type='number'
                        onChange={(e) => setCost(e.target.value)}
                        value={cost}
                    />
                </label>
                Tags
                <select
                    name='tags'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder='Add tags...'
                >
                    <option value='Work'>Work</option>
                    <option value='Exercise'>Exercise</option>
                    <option value='Health + Wellness'>Health + Wellness</option>
                    <option value='School'>School</option>
                    <option value='Teams'>Teams</option>
                    <option value='Chores'>Chores</option>
                    <option value='Creativity'>Creativity</option>
                </select>
                {formType === 'Update Reward' ? <button type='submit' disabled={title.length < 1}>Save</button> : <button type='submit' disabled={title.length < 1}>Create</button>}
            </form>
        </>
    )
}
