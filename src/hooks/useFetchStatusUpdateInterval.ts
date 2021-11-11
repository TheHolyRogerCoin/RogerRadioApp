import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { radioStatusFetch, selectShouldFetchRadioStatus } from '../modules/radioStatus';

const TIMEOUT_INT = 15000;

export const useFetchStatusUpdateInterval = () => {
    const dispatch = useDispatch();
    const shouldDispatch = useSelector(selectShouldFetchRadioStatus);

    const isSet = React.useRef(false);

    const fetchUpdates = React.useCallback(() => {
        if (shouldDispatch) {
            dispatch(radioStatusFetch());
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
