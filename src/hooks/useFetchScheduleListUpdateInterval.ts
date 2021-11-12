import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { radioScheduleListFetch, selectShouldFetchRadioScheduleList } from '../modules/radioStatus';

const TIMEOUT_INT = 30000;

export const useFetchScheduleListUpdateInterval = () => {
    const dispatch = useDispatch();
    const shouldDispatch = useSelector(selectShouldFetchRadioScheduleList);

    const isSet = React.useRef(false);

    const fetchUpdates = React.useCallback(() => {
        if (shouldDispatch) {
            dispatch(radioScheduleListFetch());
        }
    }, [dispatch, shouldDispatch]);

    React.useEffect(() => {
        if (!isSet.current) {
            fetchUpdates();
            isSet.current = true;
        }
        const timer = setInterval(() => {
            fetchUpdates();
        }, TIMEOUT_INT);
        return () => {
            clearInterval(timer);
        };
    }, [fetchUpdates]);
};
