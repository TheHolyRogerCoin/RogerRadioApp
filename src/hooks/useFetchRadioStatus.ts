import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { radioStatusFetch, selectShouldFetchRadioStatus } from '../modules/radioStatus';

export const useFetchRadioStatus = (disable = false) => {
    const dispatch = useDispatch();
    const shouldDispatch = useSelector(selectShouldFetchRadioStatus);

    React.useEffect(() => {
        if (!disable && shouldDispatch) {
            dispatch(radioStatusFetch());
        }
    }, [disable, dispatch, shouldDispatch]);
};
