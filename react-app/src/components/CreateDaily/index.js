import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as dailyActions from '../../store/dailies';

export default function CreateDaily({ daily, formType }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState(formType === 'Update Daily' ? daily.title : '');
    const [notes, setNotes] = useState(formType === 'Update Daily' ? daily.notes : '');
    const [checklist, setChecklist] = useState(formType === 'Update Daily' ? daily.checklist : '');
    const [checklistItems, setChecklistItems] = useState(formType === 'Update Daily' ? (daily.checklist ? daily.checklist.split(',') : []) : []);
    const [difficulty, setDifficulty] = useState(formType === 'Update Daily' ? daily.difficulty : '');
    const [startDate, setStartDate] = useState(formType === 'Update Daily' ? daily.startDate : '');
    // const [repeats, setRepeats] = useState(formType === 'Update Daily' ? daily.repeats : 0);
    // const [repeatEvery, setRepeatEvery] = useState(formType === 'Update Daily' ? daily.repeatEvery : '');
    // const [repeatOn, setRepeatOn] = useState(formType === 'Update Daily' ? daily.repeatOn : '');
    const [tags, setTags] = useState(formType === 'Update Daily' ? daily.tags : '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (title.length > 255) {
            errors.title = 'Title must be between 1 and 255 characters.'
        }
        if (notes && notes.length > 450) {
            errors.notes = 'Notes must be less than 450 characters.'
        }

        setErrors(errors);
    }, [title, notes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDaily = {
            title,
            notes,
            checklist,
            difficulty,
            startDate,
            // repeats,
            // repeatEvery,
            // repeatOn,
            tags
        };

        if (formType === 'Update Daily') {
            const returnFromThunk = dailyActions.updateDaily(newDaily, daily.id);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(dailyActions.fetchDailies(userId));
                closeModal();
            });
        } else {
            const returnFromThunk = dailyActions.createDaily(newDaily, userId);
            return dispatch(returnFromThunk).then(async () => {
                await dispatch(dailyActions.fetchDailies(userId));
                closeModal();
            });
        }
    }

    const addCheckItem = (e) => {
        e.preventDefault();
        if (checklist.length === 0) return;
        setChecklistItems([...checklistItems, checklist]);
        setChecklist('');
    }

    const removeCheckItem = (index) => {
        const itemsList = [...checklistItems];
        itemsList.splice(index, 1);
        setChecklistItems(itemsList);
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="createForms">
                <div className="upperForm">
                    {formType === 'Update Daily' ? <h1 className="upperForm">Edit Daily</h1> : <h1 className="upperForm">Create Daily</h1>}
                    <label className="upperForm">
                        {errors.title && <p id="errorP">{errors.title}</p>}
                        Title*
                        <input
                            type='text'
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder='Add a title'
                        />
                    </label>
                    <label className="upperForm">
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
                        Checklist
                        <input
                            type='text'
                            onChange={(e) => setChecklist(e.target.value)}
                            value={checklist}
                            placeholder='New checklist item'
                        />
                        <button onClick={addCheckItem}>Add</button>
                        <ul>
                            {checklistItems.map((item, index) => (
                                <div key={index}>
                                    <input value={item} type="checkbox" />
                                    {item}
                                    <button onClick={() => removeCheckItem(index)}>Remove</button>
                                </div>
                            ))}
                        </ul>
                    </label>
                    Difficulty
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value='Trivial'>Trivial</option>
                        <option value='Easy'>Easy</option>
                        <option value='Medium'>Medium</option>
                        <option value='Hard'>Hard</option>
                    </select>
                    <label>
                        Start Date
                        <input
                            type='date'
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                        />
                    </label>
                    {/* <label>
                    Repeats
                    <select
                        value={repeats}
                        onChange={(e) => setRepeats(e.target.value)}
                    >
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                        <option value='Yearly'>Yearly</option>
                    </select>
                </label>
                <label>
                    Repeat Every
                    <input
                        type='number'
                        onChange={(e) => setRepeatEvery(e.target.value)}
                        value={repeatEvery}
                        placeholder='0'
                    />
                </label> */}
                    Tags
                    <select
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
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
                {formType === 'Update Daily' ? <button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450)} className="formSubmit">Save</button> : <button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450)} className="formSubmit">Create</button>}
            </form >
        </>
    )
}
