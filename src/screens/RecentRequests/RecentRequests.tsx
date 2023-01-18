import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { RecentRequests } from '../../components/RecentRequests/RecentRequests';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
    },
}));

const RecentRequestsComponent: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.mainCont} container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <RecentRequests />
            </Grid>
        </Grid>
    );
};

export const RecentRequestsPage = React.memo(RecentRequestsComponent);
