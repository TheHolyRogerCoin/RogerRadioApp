import * as React from 'react';
import { ForegroundService } from '@ionic-native/foreground-service';
import { Media, MediaObject } from '@ionic-native/media';
import { usePrevious } from '../../hooks/usePrevious';

interface Props {
    url: string;
    muted?: boolean;
    playing?: boolean;
    volume?: number;
    onEnded?: () => void;
}

const PlayerInterfaceComponent: React.FC<Props> = ({ muted, onEnded, playing, url, volume = 1.0 }) => {
    const [media, setMedia] = React.useState<MediaObject | undefined>(undefined);
    // const [mediaStatus, setMediaStatus] = React.useState<number | undefined>(undefined);
    const [mediaIsPlaying, setMediaIsPlaying] = React.useState(false);
    const [mediaEnded, setMediaEnded] = React.useState(false);

    const mediaRef = React.useRef(media);

    const prevUrl = usePrevious(url);

    const loadPlayer = React.useCallback((mediaUrl) => {
        const mObj = Media.create(mediaUrl);
        mObj.onStatusUpdate.subscribe((status) => {
            // setMediaStatus(status);
            setMediaIsPlaying(status === 2);
            if (status === 4) {
                mObj.release();
                setMediaEnded(true);
            }
        });
        setMedia(mObj);
    }, []);

    React.useEffect(() => {
        if (!media) {
            loadPlayer(url);
        } else if (media && url != prevUrl) {
            media.stop();
            media.release();
            url.length && loadPlayer(url);
        }
    }, [media, url, prevUrl, loadPlayer]);

    React.useEffect(() => {
        window.console.log(media);
        if (playing && media && !mediaIsPlaying) {
            window.console.log('playing');
            media.play({ playAudioWhenScreenIsLocked: true });
            ForegroundService.start('RogerRadio', 'RogerRadio is streaming.', 'main_logo_transparent');
        } else if (!playing && media && mediaIsPlaying) {
            media.stop();
            ForegroundService.stop();
            setMediaIsPlaying(false);
        }
    }, [playing, media, mediaIsPlaying]);

    React.useEffect(() => {
        if (!muted && volume && media) {
            media.setVolume(Math.max(Math.min(volume, 1.0), 0));
        } else if (muted && media) {
            media.setVolume(0);
        }
    }, [muted, volume, media]);

    React.useEffect(() => {
        if (mediaEnded) {
            onEnded && onEnded();
            setMediaEnded(false);
            setMedia(undefined);
        }
    }, [mediaEnded, onEnded]);

    React.useEffect(() => {
        const mRef = mediaRef.current;
        return () => {
            if (mRef) {
                mRef.stop();
                mRef.release();
            }
        };
    }, []);
    return null;
    // const media = new Media(src, mediaSuccess, [mediaError], [mediaStatus]);
};

export const PlayerInterface = React.memo(PlayerInterfaceComponent);
