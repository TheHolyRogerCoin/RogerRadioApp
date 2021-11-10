import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { NowPlaying } from '../../components/NowPlaying/NowPlaying';
import { Player } from '../../components/Player/Player';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
    },
}));

const DashboardComponent: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.mainCont} container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <Player />
            </Grid>
            <Grid item xs={12}>
                <NowPlaying />
            </Grid>
        </Grid>
    );
};

export const Dashboard = React.memo(DashboardComponent);
