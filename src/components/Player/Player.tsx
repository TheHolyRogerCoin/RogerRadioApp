import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import CachedIcon from '@mui/icons-material/Cached';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RogerRadioStatic from '../../assets/images/rogerradiostatic.gif';
import { getBase64ImageString } from '../../helpers/getBase64ImageString';
import {
    playerSetUrl,
    playerSetVolume,
    playerStop,
    playerToggleMute,
    playerTogglePlay,
    selectPlayerMuted,
    selectPlayerPlaying,
    selectPlayerVolume,
} from '../../modules/player';
import { selectNowPlaying } from '../../modules/radioStatus';

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
        maxHeight: '39vh',
        position: 'relative',
    },
    buttons: {
        position: 'relative',
    },
    volControl: {
        position: 'relative',
    },
    btnVol: {
        display: 'inline !important',
        padding: '0px !important',
    },
    btnIcn: {
        fill: '#fff !important',
        fontSize: '1.75em !important',
    },
}));

const PlayerComponent: React.FC = () => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const volume: number = useSelector(selectPlayerVolume);
    const isMuted: boolean = useSelector(selectPlayerMuted);
    const isPlaying: boolean = useSelector(selectPlayerPlaying);
    const nowPlaying = useSelector(selectNowPlaying);

    const togglePlay = React.useCallback(() => {
        dispatch(playerTogglePlay());
    }, [dispatch]);

    const toggleMute = React.useCallback(() => {
        dispatch(playerToggleMute());
    }, [dispatch]);

    const handleReload = React.useCallback(() => {
        dispatch(playerStop());
        dispatch(playerSetUrl(undefined));
    }, [dispatch]);

    const handleVolChange = React.useCallback(
        (event: Event, value: any) => {
            dispatch(playerSetVolume(Number(value)));
        },
        [dispatch]
    );

    const handleVolDown = React.useCallback(() => {
        dispatch(playerSetVolume(Math.max(Number(volume) - 0.01, 0.0)));
    }, [dispatch, volume]);

    const handleVolUp = React.useCallback(() => {
        dispatch(playerSetVolume(Math.min(Number(volume) + 0.01, 1.0)));
    }, [dispatch, volume]);

    const getImgSrc = React.useCallback(() => {
        if (nowPlaying.Artwork.length) {
            return getBase64ImageString(nowPlaying.Artwork);
        } else {
            return RogerRadioStatic;
        }
    }, [nowPlaying.Artwork]);

    return (
        <div className={classes.radioPlayer}>
            <div className={classes.splash}>
                <img className={classes.splashImg} src={getImgSrc()} alt="" />
            </div>
            <div className={classes.volControl}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                        <IconButton className={classes.btnVol} onClick={handleVolDown}>
                            <VolumeDown />
                        </IconButton>
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
                        <IconButton className={classes.btnVol} onClick={handleVolUp}>
                            <VolumeUp />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.buttons}>
                <Button variant="contained" onClick={togglePlay}>
                    {!isPlaying ? (
                        <PlayCircleIcon className={classes.btnIcn} />
                    ) : (
                        <StopCircleIcon className={classes.btnIcn} />
                    )}
                </Button>
                <Button variant="contained" onClick={toggleMute}>
                    {isMuted ? <VolumeOffIcon className={classes.btnIcn} /> : <VolumeUp className={classes.btnIcn} />}
                </Button>
                <Button variant="contained" onClick={handleReload}>
                    <CachedIcon className={classes.btnIcn} />
                </Button>
            </div>
        </div>
    );
};

export const Player = React.memo(PlayerComponent);
