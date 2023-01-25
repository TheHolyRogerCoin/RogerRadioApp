import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectNowPlaying, selectRadioStatusTimestampData } from '../../modules/radioStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    nowPlaying: {
        position: 'relative',
        textAlign: 'center',
        margin: `${theme.spacing(3)} ${theme.spacing(1)}`,
    },
    npHead: {
        fontSize: '1.5em',
        fontWeight: 900,
    },
    npProg: {
        position: 'relative',
    },
    npProgComp: {
        position: 'relative',
    },
    npRotation: {
        fontSize: '0.8em',
        '& span': {
            fontWeight: 900,
        },
    },
    npString: {
        fontWeight: 900,
    },
    npNext: {
        fontSize: '0.75em',
        position: 'relative',
        '& span': {
            fontWeight: 900,
        },
    },
}));

const NowPlayingComponent: React.FC = () => {
    const classes = useStyles();

    const isSet = React.useRef(false);

    const [curTime, setCurTime] = React.useState(0);

    const timerRef = React.useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    const nowPlaying = useSelector(selectNowPlaying);
    const timestamp = useSelector(selectRadioStatusTimestampData);

    React.useEffect(() => {
        if (isSet.current) {
            return;
        }
        isSet.current = true;
        setCurTime(Date.now() / 1000);
        timerRef.current = setInterval(() => {
            setCurTime(Date.now() / 1000);
        }, 500);
    }, []);

    React.useEffect(() => {
        const tRef = timerRef.current;
        return () => {
            tRef && clearInterval(tRef);
            setCurTime(0);
            isSet.current = false;
        };
    }, []);

    const getProgress = React.useCallback(() => {
        const now = curTime;
        const drift = now > 0 ? now - ((timestamp || now) + 1) : 1;
        const durn = Number(nowPlaying.Duration);
        const tLleft = Number(nowPlaying.TimeLeft) - drift;
        const prog = ((durn - tLleft) / durn) * 100;
        return Math.max(Math.min(prog, 100), 0);
    }, [nowPlaying, timestamp, curTime]);

    return (
        <div className={classes.nowPlaying}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.npString}>
                        {nowPlaying.Artist} - {nowPlaying.Title}
                    </span>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.npProg}>
                        <LinearProgress className={classes.npProgComp} variant="determinate" value={getProgress()} />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.npRotation}>
                        Playing tracks from <span>{nowPlaying.CurrentRotation}</span>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.npNext}>
                        After this...{' '}
                        <span>
                            {nowPlaying.NextTrack.Artist} - {nowPlaying.NextTrack.Title}
                        </span>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export const NowPlaying = React.memo(NowPlayingComponent);
