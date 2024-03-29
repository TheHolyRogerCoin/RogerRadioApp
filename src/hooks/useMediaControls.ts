import { BackgroundMode } from '@ionic-native/background-mode';
import { MusicControls } from '@ionic-native/music-controls';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { playerStop } from '../modules/player';

interface Params {
    Title: string;
    Artist: string;
    isPlaying: boolean;
}

export const useMediaControls = (params: Params) => {
    // const isSet = React.useRef(false);
    const controlsActive = React.useRef(false);
    const dispatch = useDispatch();

    const subControls = React.useCallback(() => {
        MusicControls.subscribe().subscribe((action) => {
            const message = JSON.parse(action).message;
            switch (message) {
                case 'music-controls-pause':
                case 'music-controls-destroy':
                case 'music-controls-headset-unplugged':
                case 'music-controls-media-button-pause':
                case 'music-controls-media-button-stop':
                case 'music-controls-stop-listening':
                    BackgroundMode && BackgroundMode.unlock();
                    BackgroundMode && BackgroundMode.moveToForeground();
                    dispatch(playerStop());
                    controlsActive.current = false;
                    MusicControls.destroy();
                    break;
                default:
                    window.console.log(`MusicControls: ${message}`);
                    break;
            }
        });
        MusicControls.listen();
    }, [dispatch]);

    const createControls = React.useCallback(() => {
        MusicControls.create({
            track: params.Title,
            artist: params.Artist,
            isPlaying: true,
            dismissable: false,
            hasNext: false,
            hasPrev: false,
            hasClose: false,
            hasSkipForward: false,
            hasSkipBackward: false,
            hasScrubbing: false,
            notificationIcon: 'notification_logo',
            ticker: `RogerRadio :: ${params.Artist} - ${params.Title}`,
            cover: 'https://theholyroger.com/resources/assets/rogerradiostatic.gif',
        });
    }, [params.Title, params.Artist]);

    React.useEffect(() => {
        window.console.log(`media controls effect playing: ${params.isPlaying}, active: ${controlsActive.current}`);
        if (params.isPlaying && !controlsActive.current) {
            controlsActive.current = true;
            createControls();
            subControls();
        } else if (!params.isPlaying) {
            window.console.log(`media controls effect closing`);
            controlsActive.current = false;
            MusicControls.destroy();
        } else if (params.isPlaying && controlsActive.current) {
            controlsActive.current = true;
            createControls();
        }
    }, [createControls, subControls, params.isPlaying]);

    React.useEffect(() => {
        return () => {
            controlsActive.current = false;
            MusicControls.destroy();
        };
    }, []);
};
