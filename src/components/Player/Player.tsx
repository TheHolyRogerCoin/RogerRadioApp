import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RogerRadioStatic from '../../assets/images/rogerradiostatic.gif';
import {
    playerTogglePlay,
    playerToggleMute,
    playerSetVolume,
    playerSetUrl,
    selectPlayerMuted,
    selectPlayerPlaying,
    selectPlayerVolume,
} from '../../modules/player';

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

    const dispatch = useDispatch();

    const volume: number = useSelector(selectPlayerVolume);
    const isMuted: boolean = useSelector(selectPlayerMuted);
    const isPlaying: boolean = useSelector(selectPlayerPlaying);

    const togglePlay = React.useCallback(() => {
        dispatch(playerTogglePlay());
    }, [dispatch]);

    const toggleMute = React.useCallback(() => {
        dispatch(playerToggleMute());
    }, [dispatch]);

    const handleReload = React.useCallback(() => {
        dispatch(playerSetUrl(undefined));
    }, [dispatch]);

    const handleVolChange = React.useCallback(
        (event: Event, value: any) => {
            dispatch(playerSetVolume(Number(value)));
        },
        [dispatch]
    );

    return (
        <div className={classes.radioPlayer}>
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
                <Button variant="contained" onClick={togglePlay}>
                    {!isPlaying ? 'Play' : 'Stop'}
                </Button>
                <Button variant="contained" onClick={toggleMute}>
                    {!isMuted ? 'Mute' : 'UnMute'}
                </Button>
                <Button variant="contained" onClick={handleReload}>
                    Reload
                </Button>
            </div>
        </div>
    );
};

export const Player = React.memo(PlayerComponent);
