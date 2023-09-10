import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import UpdateDaily from '../UpdateDaily';
import * as dailyActions from '../../store/dailies';

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
                <li key={daily.id}>
                    <div>{daily.title}</div>
                    <div>{daily.notes}</div>
                    <OpenModalButton
                        modalComponent={<UpdateDaily daily={daily} />}
                        buttonText={'Update daily'}
                    />
                </li>
            ))}
        </>
    )
}
