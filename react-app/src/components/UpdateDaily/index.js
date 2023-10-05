import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dailyActions from '../../store/dailies';
import OpenModalButton from "../OpenModalButton";
import DeleteDaily from "../DeleteDaily";
import { FaRegTrashCan } from "react-icons/fa6";

export default function UpdateDaily({ daily }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const userId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState(daily.title);
    const [notes, setNotes] = useState(daily.notes);
    const [checklist, setChecklist] = useState('');
    const [checklistItems, setChecklistItems] = useState(daily.checklist ? daily.checklist.split(',') : []);
    const [difficulty, setDifficulty] = useState(daily.difficulty);
    const [startDate, setStartDate] = useState(daily.start_date ? new Date(daily.start_date) : new Date());
    const [tags, setTags] = useState(daily.tags);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (title.length > 255) {
            errors.title = 'Title must be between 1 and 255 characters.'
        }
        if (notes && notes.length > 450) {
            errors.notes = 'Notes must be less than 450 characters.'
        }
        if (checklist && checklist.length > 255) {
            errors.checklist = 'Item must be less than 255 characters.'
        }

        setErrors(errors);
    }, [title, notes, checklist]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDaily = {
            title,
            notes,
            checklist: checklistItems.join(),
            difficulty,
            start_date: startDate.toISOString().split('T')[0],
            tags
        };
        const returnFromThunk = dailyActions.updateDaily(newDaily, daily.id);
        return dispatch(returnFromThunk).then(async () => {
            await dispatch(dailyActions.fetchDailies(userId));
            closeModal();
        });
    }

    const addCheckItem = (e) => {
        e.preventDefault();
        if (checklist.length === 0 || checklist.length > 255) return;
        setChecklistItems([...checklistItems, checklist]);
        setChecklist('');
    };

    const removeCheckItem = (index) => {
        const itemsList = [...checklistItems];
        itemsList.splice(index, 1);
        setChecklistItems(itemsList);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="createForms">
                <div className="upperForm">
                    {<h1 className="upperForm">Edit Daily</h1>}
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
                        {errors.checklist && <p id="errorP">{errors.checklist}</p>}
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
                    Start Date
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat='yyyy-MM-dd'
                        shouldCloseOnSelect={true}
                    />
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
                {<button type='submit' disabled={title.length < 1 || title.length > 255 || (notes && notes.length > 450)} className="formSubmit">Save</button>}
            </form >
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
