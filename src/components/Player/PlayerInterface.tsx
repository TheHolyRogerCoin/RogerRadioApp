import * as React from 'react';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Media, MediaObject } from '@ionic-native/media';
import { useSelector } from 'react-redux';
import { useDeviceReady } from '../../hooks/useDeviceReady';
import { useMediaControls } from '../../hooks/useMediaControls';
import { useSetPlayerUrl } from '../../hooks/useSetPlayerUrl';
import { selectPlayerMuted, selectPlayerUrl, selectPlayerPlaying, selectPlayerVolume } from '../../modules/player';
import { selectNowPlaying } from '../../modules/radioStatus';

const PlayerInterfaceComponent: React.FC = () => {
    const [media, setMedia] = React.useState<MediaObject | undefined>(undefined);
    const [mediaReloading, setMediaReloading] = React.useState(false);
    const [mediaReloadLock, setMediaReloadLock] = React.useState(false);
    const [mediaIsPlaying, setMediaIsPlaying] = React.useState(false);
    const [mediaEnded, setMediaEnded] = React.useState(false);
    const [mediaErrored, setMediaErrored] = React.useState(false);

    const { Artist, Title } = useSelector(selectNowPlaying);

    const volume: number = useSelector(selectPlayerVolume);
    const muted: boolean = useSelector(selectPlayerMuted);
    const playing: boolean = useSelector(selectPlayerPlaying);
    const url: string | undefined = useSelector(selectPlayerUrl);

    const volRef = React.useRef(volume);

    useSetPlayerUrl();
    useMediaControls({ Title: Title, Artist: Artist, isPlaying: playing });
    useDeviceReady();

    const loadPlayer = React.useCallback((mediaUrl) => {
        window.console.log('loading player');
        setMediaIsPlaying(false);
        const mObj = Media.create(mediaUrl);
        mObj.onStatusUpdate.subscribe((status) => {
            setMediaIsPlaying(status === 2);
            if (status === 4) {
                window.console.log(`Media status update ended.`);
                mObj.release();
                setMediaEnded(true);
                setMedia(undefined);
                BackgroundMode && BackgroundMode.disable();
            }
        });

        mObj.onError.subscribe((err) => {
            window.console.log(`Media error: ${JSON.stringify(err)}`);
            if (err.code > 0) {
                BackgroundMode && BackgroundMode.unlock();
                BackgroundMode && BackgroundMode.moveToForeground();
                setMediaErrored(true);
            }
        });
        setMedia(mObj);
        setMediaReloading(false);
        setMediaReloadLock(false);
    }, []);

    React.useEffect(() => {
        if (!media && url && url.length) {
            loadPlayer(url);
        } else if (media && !url) {
            setMediaReloading(true);
        }
    }, [media, url, loadPlayer]);

    React.useEffect(() => {
        if (mediaReloading && !mediaReloadLock) {
            setMediaReloadLock(true);
            window.console.log('reloading');
            media && media.stop();
            media && media.release();
            BackgroundMode && BackgroundMode.disable();
            setMedia(undefined);
        }
    }, [media, mediaReloading, mediaReloadLock]);

    React.useEffect(() => {
        window.console.log(
            `play effect, media: ${media}, playing: ${playing}, media playing: ${mediaIsPlaying}, media reloading: ${mediaReloading}`
        );
        const vRef = volRef.current;
        if (!mediaReloading && playing && media && !mediaIsPlaying) {
            window.console.log('playing');
            media.playInBackground({ playAudioWhenScreenIsLocked: true });
            media.setVolume(Math.max(Math.min(vRef, 1.0), 0));
            BackgroundMode && BackgroundMode.enable();
            BackgroundMode && BackgroundMode.disableWebViewOptimizations();
        } else if (!mediaReloading && !playing && media && mediaIsPlaying) {
            window.console.log('stopping');
            media.stop();
            BackgroundMode && BackgroundMode.disable();
            setMediaIsPlaying(false);
        }
    }, [playing, media, mediaIsPlaying, mediaReloading]);

    React.useEffect(() => {
        if (mediaIsPlaying && !muted && volume && media) {
            media.setVolume(Math.max(Math.min(volume, 1.0), 0));
        } else if (mediaIsPlaying && muted && media) {
            media.setVolume(0);
        }
    }, [mediaIsPlaying, muted, volume, media]);

    React.useEffect(() => {
        if (mediaErrored) {
            window.console.log(`mediaErrored effect`);
            setMediaErrored(false);
            if (!mediaReloadLock) {
                window.console.log(`mediaErrored effect reloading`);
                setMediaReloading(true);
            }
        }
    }, [mediaReloadLock, mediaErrored]);

    React.useEffect(() => {
        if (mediaEnded) {
            window.console.log(`mediaEnded effect`);
            setMediaEnded(false);
        }
    }, [mediaEnded]);

    React.useEffect(() => {
        return () => {
            if (media) {
                media.stop();
                media.release();
                BackgroundMode && BackgroundMode.disable();
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
};

export const PlayerInterface = React.memo(PlayerInterfaceComponent);
