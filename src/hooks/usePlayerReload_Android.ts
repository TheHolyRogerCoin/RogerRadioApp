import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RogerRadioPlayer } from '@ionic-native/roger-radio-player';
import { playerClearReload, selectPlayerReload } from '../modules/player';

export const usePlayerReload_Android = () => {
    const dispatch = useDispatch();
    const playerShouldReload = useSelector(selectPlayerReload);

    React.useEffect(() => {
        if (playerShouldReload) {
            dispatch(playerClearReload());
            RogerRadioPlayer && RogerRadioPlayer.playerReload();
        }
    }, [dispatch, playerShouldReload]);
};
