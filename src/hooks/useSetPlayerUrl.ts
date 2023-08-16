import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { streamUrlMp3Max } from '../api';
import { getPlayerStreamUrl } from '../helpers/playerStreamUrl';
import { playerSetUrl, selectPlayerUrl } from '../modules/player';

export const useSetPlayerUrl = () => {
    const dispatch = useDispatch();
    const playerUrl = useSelector(selectPlayerUrl);

    React.useEffect(() => {
        if (!playerUrl) {
            getPlayerStreamUrl()
                .then((sUrl) => {
                    dispatch(playerSetUrl(sUrl));
                })
                .catch((err) => {
                    dispatch(playerSetUrl(streamUrlMp3Max()));
                });
        }
    }, [dispatch, playerUrl]);
};
