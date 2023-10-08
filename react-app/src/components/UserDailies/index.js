import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateDaily from '../UpdateDaily';
import * as dailyActions from '../../store/dailies';
import './UserDailies.css';

export default function UserDailies() {
    const dispatch = useDispatch();
    const dailies = useSelector((state) => state.dailies.allDailies);
    const sessionUserId = useSelector((state) => state.session.user.id);
    const [title, setTitle] = useState('');
    const [checked, setChecked] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length < 1 || title.length > 255) {
            return;
        }
        const newDaily = {
            title
        }
        const returnFromThunk = dailyActions.createDaily(newDaily, sessionUserId);
        return dispatch(returnFromThunk).then(async () => {
            await dispatch(dailyActions.fetchDailies(sessionUserId));
            setTitle('');
        });
    };

    const checkboxChange = (index) => {
        const newState = [...checked];
        newState[index] = !newState[index]; // flip the switch on the state
        setChecked(newState);
        localStorage.setItem('checked', JSON.stringify(newState));
    };

    useEffect(() => {
        dispatch(dailyActions.fetchDailies(sessionUserId));
    }, [dispatch, sessionUserId]);

    useEffect(() => {
        const storedStates = JSON.parse(localStorage.getItem('checked')) || [];
        setChecked(storedStates);
    }, []);
    console.log('checked', checked)
    if (!Object.values(dailies)) return null;
    return (
        <>
            {title.length > 255 ? <p id="errorP">Title cannot be longer than 255 characters.</p> : ''}
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder={'Add a Daily'}
                        id="dailyOneLine"
                    />
                </label>
            </form>
            {dailies && Object.values(dailies).map((daily) => (
                <li key={daily.id} id="dailiesList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div className="formTitle">{daily.title}</div>
                            <div className="formNotes">{daily.notes}</div>
                            <div>{daily.checklist && daily.checklist.split(',').map((item, index) => (
                                <label key={index}>
                                    <input
                                        type='checkbox'
                                        checked={checked[index] || false}
                                        onChange={() => checkboxChange(index)}
                                    />
                                    <span>{item}</span>
                                </label>
                            ))}</div>
                        </div>
                        {/* <div>Start Date: {daily.start_date && daily.start_date.slice(0, 16)}</div> */}
                        <OpenModalButton
                            modalComponent={<UpdateDaily daily={daily} />}
                            className={'updateButton'}
                        />
                    </div>
                </li>
            ))}
        </>
    )
}
