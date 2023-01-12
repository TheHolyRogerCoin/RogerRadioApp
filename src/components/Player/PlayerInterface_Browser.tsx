import * as React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';
import { useDeviceReady } from '../../hooks/useDeviceReady';
import { useSetPlayerUrl } from '../../hooks/useSetPlayerUrl';
import { selectPlayerMuted, selectPlayerUrl, selectPlayerPlaying, selectPlayerVolume } from '../../modules/player';

const PlayerInterfaceComponent: React.FC = () => {
    const [mediaShouldRender, setMediaShouldRender] = React.useState(false);
    const [mediaReloading, setMediaReloading] = React.useState(false);
    const [mediaReloadLock, setMediaReloadLock] = React.useState(false);
    const [mediaIsPlaying, setMediaIsPlaying] = React.useState(false);
    const [mediaIsStopped, setMediaIsStopped] = React.useState(true);
    const [mediaEnded, setMediaEnded] = React.useState(false);
    const [mediaErrored, setMediaErrored] = React.useState(false);
    const [mediaVolume, setMediaVolume] = React.useState(0);

    const volume: number = useSelector(selectPlayerVolume);
    const muted: boolean = useSelector(selectPlayerMuted);
    const playing: boolean = useSelector(selectPlayerPlaying);
    const url: string | undefined = useSelector(selectPlayerUrl);

    const volRef = React.useRef(volume);

    useSetPlayerUrl();
    useDeviceReady();

    React.useEffect(() => {
        if (!mediaShouldRender && url && url.length) {
            setMediaIsPlaying(false);
            setMediaShouldRender(true);
            setMediaReloading(false);
            setMediaReloadLock(false);
        } else if (mediaShouldRender && !url) {
            setMediaReloading(true);
        }
    }, [mediaShouldRender, url]);

    React.useEffect(() => {
        if (mediaReloading && !mediaReloadLock) {
            setMediaReloadLock(true);
            window.console.log('reloading');
            setMediaShouldRender(false);
        }
    }, [mediaReloading, mediaReloadLock]);

    React.useEffect(() => {
        window.console.log(
            `play effect, mediaShouldRender: ${mediaShouldRender}, playing: ${playing}, media playing: ${mediaIsPlaying}, media reloading: ${mediaReloading}`
        );
        const vRef = volRef.current;
        if (!mediaReloading && playing && mediaShouldRender && !mediaIsPlaying) {
            window.console.log('playing');
            setMediaIsPlaying(true);
            setMediaIsStopped(false);
            setMediaVolume(Math.max(Math.min(vRef, 1.0), 0));
        } else if (!mediaReloading && !playing && mediaShouldRender && mediaIsPlaying) {
            setMediaIsStopped(true);
            setMediaIsPlaying(false);
        }
    }, [playing, mediaShouldRender, mediaIsPlaying, mediaReloading]);

    React.useEffect(() => {
        if (mediaIsPlaying && !muted && volume && mediaShouldRender) {
            setMediaVolume(Math.max(Math.min(volume, 1.0), 0));
        } else if (mediaIsPlaying && muted && mediaShouldRender) {
            setMediaVolume(0);
        }
    }, [mediaIsPlaying, muted, volume, mediaShouldRender]);

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
            setMediaShouldRender(false);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onMediaEnded = React.useCallback((err) => {
        window.console.log(`Media ended: ${JSON.stringify(err)}`);
        setMediaEnded(true);
        setMediaShouldRender(false);
    }, []);

    const onMediaError = React.useCallback((err) => {
        window.console.log(`Media error: ${JSON.stringify(err)}`);
        setMediaErrored(true);
    }, []);

    return mediaShouldRender && !mediaIsStopped ? (
        <ReactAudioPlayer
            src={url}
            autoPlay={true}
            muted={muted}
            volume={mediaVolume}
            onEnded={onMediaEnded}
            onError={onMediaError}
        />
    ) : null;
};

export const PlayerInterface_Browser = React.memo(PlayerInterfaceComponent);
