import { createStyles, Grid, WithStyles } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { NowPlaying } from '../../components/NowPlaying/NowPlaying';
import { Player } from '../../components/Player/Player';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
    });

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
}

const DashboardComponent: React.FC<Props> = ({ classes }) => {
    return (
        <Grid container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <Player />
            </Grid>
            <Grid item xs={12}>
                <NowPlaying />
            </Grid>
        </Grid>
    );
};

export const Dashboard = withStyles(styles, { withTheme: true })(React.memo(DashboardComponent));
