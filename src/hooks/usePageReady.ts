import * as React from 'react';
import { useDispatch } from 'react-redux';
import { appTasksDisable } from '../modules/appStatus';

interface Params {
    isVisible: boolean;
}

export const usePageReady = (params: Params) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!params.isVisible) {
            dispatch(appTasksDisable(true));
        } else {
            dispatch(appTasksDisable(false));
        }
    }, [dispatch, params.isVisible]);
};
