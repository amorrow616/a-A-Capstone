import { useState, useEffect } from 'react';
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
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (title.length > 255) {
            errors.title = 'Title must be between 1 and 255 characters.'
        }
        if (notes && notes.length > 450) {
            errors.notes = 'Notes must be less than 450 characters.'
        }
        if ((cost && cost < 1) || (cost && cost > 5000)) {
            errors.cost = 'Cost must be between 1 and 5000.'
        }

        setErrors(errors);
    }, [title, notes, cost]);

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
            <form onSubmit={handleSubmit} className="createForms">
                <div className="upperForm">
                    {formType === 'Update Reward' ? <h1>Edit Reward</h1> : <h1>Create Reward</h1>}
                    <label>
                        {errors.title && <p id="errorP">{errors.title}</p>}
                        Title*
                        <input
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder='Add a title'
                        />
                    </label>
                    <label>
                        {errors.notes && <p id="errorP">{errors.notes}</p>}
                        Notes
                        <input
                            type='text'
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                            placeholder='Add notes'
                        />
                    </label>
                </div>
                <div className="lowerCreateForm">
                    <label>
                        {errors.cost && <p id="errorP">{errors.cost}</p>}
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
                </div>
                {formType === 'Update Reward' ? <button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450) || (cost && cost < 1) || (cost && cost > 5000)} className="formSubmit">Save</button> : <button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450) || (cost && cost < 1) || (cost && cost > 5000)} className="formSubmit">Create</button>}
            </form>
        </>
    )
}
