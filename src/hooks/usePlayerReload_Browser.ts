import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerClearReload, playerSetUrl, selectPlayerReload } from '../modules/player';

export const usePlayerReload_Browser = () => {
    const dispatch = useDispatch();
    const playerShouldReload = useSelector(selectPlayerReload);

    React.useEffect(() => {
        if (playerShouldReload) {
            dispatch(playerClearReload());
            dispatch(playerSetUrl(undefined));
        }
    }, [dispatch, playerShouldReload]);
};
