import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Playlist } from '../../components/Playlist/Playlist';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
    },
}));

const PlaylistComponent: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.mainCont} container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <Playlist />
            </Grid>
        </Grid>
    );
};

export const PlaylistPage = React.memo(PlaylistComponent);
