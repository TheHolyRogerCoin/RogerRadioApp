import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Settings } from '../../components/Settings/Settings';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
    },
}));

const SettingsComponent: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.mainCont} container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <Settings />
            </Grid>
        </Grid>
    );
};

export const SettingsPage = React.memo(SettingsComponent);
