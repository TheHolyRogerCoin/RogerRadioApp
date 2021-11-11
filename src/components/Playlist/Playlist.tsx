import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useFetchPlaylistUpdateInterval } from '../../hooks/useFetchPlaylistUpdateInterval';
import { selectRadioPlaylist } from '../../modules/radioStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    playlist: {
        position: 'relative',
    },
    title: {
        position: 'relative',
    },
    plItems: {
        fontSize: '0.75em',
    },
}));

const PlaylistComponent: React.FC = () => {
    const classes = useStyles();

    useFetchPlaylistUpdateInterval();

    // const [curTime, setCurTime] = React.useState(Math.floor(Date.now() / 1000));

    const playlist = useSelector(selectRadioPlaylist);

    const renderPlaylistItem = React.useCallback((plItem, index: number) => {
        return (
            <React.Fragment key={`${index}`}>
                <Grid key={`${index}-pos`} item xs={1}>
                    {plItem.Position}
                </Grid>
                <Grid key={`${index}-art`} item xs={4}>
                    {plItem.Artist}
                </Grid>
                <Grid key={`${index}-tit`} item xs={7}>
                    {plItem.Title}
                </Grid>
            </React.Fragment>
        );
    }, []);

    return (
        <div className={classes.playlist}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                    <span className={classes.title}>Rogering You Next With...</span>
                </Grid>
                <Grid item xs={12}>
                    <Grid className={classes.plItems} container spacing={1} alignItems="center">
                        {playlist.map(renderPlaylistItem)}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export const Playlist = React.memo(PlaylistComponent);
