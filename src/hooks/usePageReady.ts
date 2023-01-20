import * as React from 'react';
import { useDispatch } from 'react-redux';
import { alertsDisable } from '../modules/alert';

interface Params {
    isVisible: boolean;
}

export const usePageReady = (params: Params) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!params.isVisible) {
            dispatch(alertsDisable(true));
        } else {
            dispatch(alertsDisable(false));
        }
    }, [dispatch, params.isVisible]);
};
