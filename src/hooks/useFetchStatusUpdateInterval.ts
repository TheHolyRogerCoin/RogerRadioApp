import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from './usePrevious';
import { radioStatusFetch, selectShouldFetchRadioStatus } from '../modules/radioStatus';

const TIMEOUT_INT = 20000;

export const useFetchStatusUpdateInterval = () => {
    const [timer, setTimer] = React.useState<ReturnType<typeof setInterval> | undefined>(undefined);

    const dispatch = useDispatch();
    const shouldDispatch = useSelector(selectShouldFetchRadioStatus);

    const isSet = React.useRef(false);
    const timerRef = React.useRef(timer);

    const prevShould = usePrevious(shouldDispatch);

    const fetchUpdates = React.useCallback(() => {
        if (shouldDispatch) {
            dispatch(radioStatusFetch());
        }
    }, [dispatch, shouldDispatch]);

    React.useEffect(() => {
        if (isSet.current) {
            return;
        }
        setTimer(
            setInterval(() => {
                fetchUpdates();
            }, TIMEOUT_INT)
        );
        fetchUpdates();
        isSet.current = true;
    }, [fetchUpdates]);

    React.useEffect(() => {
        if (!isSet.current) {
            return;
        }
        if (timer && shouldDispatch != prevShould) {
            timer && clearInterval(timer);
            setTimer(
                setInterval(() => {
                    fetchUpdates();
                }, TIMEOUT_INT)
            );
        }
    }, [prevShould, shouldDispatch, timer, fetchUpdates]);

    React.useEffect(() => {
        const tRef = timerRef.current;
        return () => {
            tRef && clearInterval(tRef);
            setTimer(undefined);
        };
    }, []);
};
