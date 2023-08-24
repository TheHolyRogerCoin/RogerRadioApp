import { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenControlBalanceFetch, selectShouldFetchBalance } from '../modules/tokenControl';

const TIMEOUT_INT = 15000;

interface Params {
    tokens: string[];
    lastChange?: number;
}

export const useFetchUserBalance = (params: Params) => {
    const dispatch = useDispatch();
    const shouldDispatch = useSelector(selectShouldFetchBalance);

    const [knownLastChange, setKnownLastChange] = useState<number | undefined>(params.lastChange);

    const isSet = useRef(false);

    const fetchUpdates = useCallback(() => {
        setKnownLastChange(params.lastChange);
        if (params.tokens.length < 1) return;
        if (shouldDispatch) {
            dispatch(tokenControlBalanceFetch({ tokens: params.tokens }));
        }
        isSet.current = true;
    }, [params.lastChange, params.tokens, dispatch, shouldDispatch]);

    useEffect(() => {
        if (!isSet.current || knownLastChange != params.lastChange) {
            fetchUpdates();
        }
        const timer = setInterval(() => {
            fetchUpdates();
        }, TIMEOUT_INT);
        return () => {
            clearInterval(timer);
        };
    }, [params.lastChange, knownLastChange, fetchUpdates]);
};
