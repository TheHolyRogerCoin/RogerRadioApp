import * as React from 'react';
import { RogerRadioPlayer } from '@ionic-native/roger-radio-player';
import { useDispatch, useSelector } from 'react-redux';
import { useSetPlayerUrl } from '../../hooks/useSetPlayerUrl';
import { alertsDisable } from '../../modules/alert';
import {
    playerStop,
    selectPlayerMuted,
    selectPlayerUrl,
    selectPlayerPlaying,
    selectPlayerVolume,
} from '../../modules/player';
import { selectNowPlaying } from '../../modules/radioStatus';

const PlayerInterfaceComponent: React.FC = () => {
    const [mediaIsPlaying, setMediaIsPlaying] = React.useState(false);

    const dispatch = useDispatch();

    const { Artist, Title } = useSelector(selectNowPlaying);

    const volume: number = useSelector(selectPlayerVolume);
    const muted: boolean = useSelector(selectPlayerMuted);
    const playing: boolean = useSelector(selectPlayerPlaying);
    const url: string | undefined = useSelector(selectPlayerUrl);

    useSetPlayerUrl();

    const enableAlerts = React.useCallback(() => {
        dispatch(alertsDisable(false));
    }, [dispatch]);

    const disableAlerts = React.useCallback(() => {
        dispatch(alertsDisable(true));
    }, [dispatch]);

    const dispatchPlayerStop = React.useCallback(() => {
        dispatch(playerStop());
        setMediaIsPlaying(false);
    }, [dispatch]);

    React.useEffect(() => {
        RogerRadioPlayer && RogerRadioPlayer.setCallbackStopped(dispatchPlayerStop);
        RogerRadioPlayer && RogerRadioPlayer.setCallbackAlertsEnable(enableAlerts);
        RogerRadioPlayer && RogerRadioPlayer.setCallbackAlertsDisable(disableAlerts);
    }, [disableAlerts, dispatchPlayerStop, enableAlerts]);

    React.useEffect(() => {
        RogerRadioPlayer && RogerRadioPlayer.updateMetadata(Artist, Title);
    }, [Artist, Title]);

    React.useEffect(() => {
        if (url && url.length) {
            RogerRadioPlayer && RogerRadioPlayer.playerLoad(url);
        } else if (!url) {
            RogerRadioPlayer && RogerRadioPlayer.playerReload();
        }
    }, [url]);

    React.useEffect(() => {
        window.console.log(`play effect triggered, playing: ${playing}, mediaIsPlaying: ${mediaIsPlaying}`);
        if (playing && !mediaIsPlaying) {
            window.console.log('play effect playing');
            setMediaIsPlaying(true);
            RogerRadioPlayer && RogerRadioPlayer.playerPlay();
        } else if (!playing && mediaIsPlaying) {
            window.console.log('play effect stopping');
            RogerRadioPlayer && RogerRadioPlayer.playerStop();
            setMediaIsPlaying(false);
        }
    }, [playing, mediaIsPlaying]);

    React.useEffect(() => {
        if (!muted && volume) {
            RogerRadioPlayer && RogerRadioPlayer.playerSetVolume(volume);
        } else if (muted) {
            RogerRadioPlayer && RogerRadioPlayer.playerMute();
        }
    }, [muted, volume]);

    React.useEffect(() => {
        return () => {
            RogerRadioPlayer && RogerRadioPlayer.playerExit();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
};

export const PlayerInterface_Android = React.memo(PlayerInterfaceComponent);
