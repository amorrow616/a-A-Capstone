import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateDaily from '../UpdateDaily';
import DeleteDaily from '../DeleteDaily';
import * as dailyActions from '../../store/dailies';
import './UserDailies.css';

export default function UserDailies() {
    const dispatch = useDispatch();
    const dailies = useSelector((state) => state.dailies.allDailies);
    const sessionUserId = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(dailyActions.fetchDailies(sessionUserId));
    }, [dispatch, sessionUserId]);

    if (!Object.values(dailies)) return null;
    return (
        <>
            {Object.values(dailies).map((daily) => (
                <li key={daily.id} id="dailiesList">
                    <div className="eachElement">
                        <div className="visibleElement">
                            <div>{daily.title}</div>
                            <div>{daily.notes}</div>
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
