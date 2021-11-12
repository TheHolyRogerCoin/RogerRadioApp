import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { ScheduleListComponent } from '../../components/ScheduleList/ScheduleList';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
    },
}));

const ScheduleListScreen: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.mainCont} container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <ScheduleListComponent />
            </Grid>
        </Grid>
    );
};

export const Schedule = React.memo(ScheduleListScreen);
