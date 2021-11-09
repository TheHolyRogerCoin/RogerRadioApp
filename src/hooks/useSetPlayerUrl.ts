import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { streamUrl } from '../api';
import { playerSetUrl, selectPlayerUrl } from '../modules/player';

export const useSetPlayerUrl = () => {
    const dispatch = useDispatch();
    const playerUrl = useSelector(selectPlayerUrl);

    React.useEffect(() => {
        if (!playerUrl) {
            dispatch(playerSetUrl(streamUrl()));
        }
    }, [dispatch, playerUrl]);
};
