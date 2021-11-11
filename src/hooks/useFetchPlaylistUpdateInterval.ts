import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { radioPlaylistFetch, selectShouldFetchRadioPlaylist } from '../modules/radioStatus';

const TIMEOUT_INT = 3000;

export const useFetchPlaylistUpdateInterval = () => {
    const dispatch = useDispatch();
    const shouldDispatch = useSelector(selectShouldFetchRadioPlaylist);

    const isSet = React.useRef(false);

    const fetchUpdates = React.useCallback(() => {
        if (shouldDispatch) {
            dispatch(radioPlaylistFetch());
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
