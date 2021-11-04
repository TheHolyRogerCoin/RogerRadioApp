import { Button, Grid, makeStyles, Slider } from '@material-ui/core';
import { VolumeDown, VolumeUp } from '@material-ui/icons';
import * as React from 'react';
import ReactPlayer from 'react-player';
import { streamUrl } from '../../api';
import RogerRadioStatic from '../../assets/images/rogerradiostatic.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    radioPlayer: {
        position: 'relative',
        textAlign: 'center',
    },
    splash: {
        position: 'relative',
    },
    splashImg: {
        maxWidth: '100%',
        position: 'relative',
    },
    buttons: {
        position: 'relative',
    },
    volControl: {
        position: 'relative',
    },
}));

const PlayerComponent: React.FC = () => {
    const classes = useStyles();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [volume, setVolume] = React.useState(1);

    const togglePlay = React.useCallback(() => {
        setIsPlaying((pState) => !pState);
    }, []);

    const toggleMute = React.useCallback(() => {
        setIsMuted((pState) => !pState);
    }, []);

    const handleVolChange = React.useCallback((event: React.ChangeEvent<any>, value) => {
        setVolume(value);
    }, []);

    const onError = React.useCallback(() => {
        setIsPlaying(false);
    }, []);

    return (
        <div className={classes.radioPlayer}>
            <ReactPlayer
                volume={volume}
                width="100%"
                height="100%"
                controls={false}
                playing={isPlaying}
                muted={isMuted}
                url={streamUrl()}
                onEnded={onError}
                onError={onError}
            />
            <div className={classes.splash}>
                <img className={classes.splashImg} src={RogerRadioStatic} alt="" />
            </div>
            <div className={classes.volControl}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            disabled={isMuted}
                            aria-label="Volume"
                            step={0.001}
                            value={volume}
                            min={0}
                            max={1}
                            onChange={handleVolChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <VolumeUp />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.buttons}>
                <Button onClick={togglePlay}>{!isPlaying ? 'Play' : 'Stop'}</Button>
                <Button onClick={toggleMute}>{!isMuted ? 'Mute' : 'UnMute'}</Button>
            </div>
        </div>
    );
};

export const Player = React.memo(PlayerComponent);
