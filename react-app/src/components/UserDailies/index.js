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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDaily = {
            title
        }
        const returnFromThunk = dailyActions.createDaily(newDaily, sessionUserId);
        return dispatch(returnFromThunk).then(async () => {
            await dispatch(dailyActions.fetchDailies(sessionUserId));
            setTitle('');
        });
    }

    useEffect(() => {
        dispatch(dailyActions.fetchDailies(sessionUserId));
    }, [dispatch, sessionUserId]);

    if (!Object.values(dailies)) return null;
    return (
        <>
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
            {Object.values(dailies).map((daily) => (
                <li key={daily.id} id="dailiesList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div>{daily.title}</div>
                            <div>{daily.notes}</div>
                            <div>{daily.checklist}</div>
                        </div>
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
