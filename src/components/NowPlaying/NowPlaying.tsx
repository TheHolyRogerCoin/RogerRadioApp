import { Grid, LinearProgress, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useFetchStatusUpdateInterval } from '../../hooks/useFetchStatusUpdateInterval';
import { selectNowPlaying, selectRadioStatusTimestampData } from '../../modules/radioStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    nowPlaying: {
        position: 'relative',
        textAlign: 'center',
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
    npHead: {
        fontSize: '1.5em',
        fontWeight: 900,
        marginBottom: theme.spacing(1),
    },
    npProg: {
        marginBottom: theme.spacing(2),
    },
    npRotation: {
        fontSize: '0.8em',
        fontWeight: 900,
        marginBottom: theme.spacing(1),
    },
    npString: {
        fontWeight: 900,
    },
}));

const NowPlayingComponent: React.FC = () => {
    const classes = useStyles();

    useFetchStatusUpdateInterval();

    const [curTime, setCurTime] = React.useState(Math.floor(Date.now() / 1000));
    const [timer, setTimer] = React.useState<ReturnType<typeof setInterval> | undefined>(
        setInterval(() => {
            setCurTime(Math.floor(Date.now() / 1000));
        }, 1000)
    );

    const timerRef = React.useRef(timer);

    const nowPlaying = useSelector(selectNowPlaying);
    const timestamp = useSelector(selectRadioStatusTimestampData);

    React.useEffect(() => {
        const tRef = timerRef.current;
        return () => {
            tRef && clearInterval(tRef);
            setTimer(undefined);
        };
    }, []);

    const getProgress = React.useCallback(() => {
        const now = curTime;
        const drift = now - (timestamp || now);
        const durn = Number(nowPlaying.Duration);
        const tLleft = Number(nowPlaying.TimeLeft) - drift;
        const prog = ((durn - tLleft) / durn) * 100;
        return Math.max(Math.min(prog, 100), 0);
    }, [nowPlaying, timestamp, curTime]);

    return (
        <div className={classes.nowPlaying}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <div className={classes.npHead}>Rogering You With...</div>
                    <span className={classes.npString}>
                        {nowPlaying.Artist} - {nowPlaying.Title}
                    </span>
                    <div className={classes.npProg}>
                        <LinearProgress variant="determinate" value={getProgress()} />
                    </div>
                    <div className={classes.npRotation}>Playing tracks from {nowPlaying.CurrentRotation}</div>
                </Grid>
            </Grid>
        </div>
    );
};

export const NowPlaying = React.memo(NowPlayingComponent);
