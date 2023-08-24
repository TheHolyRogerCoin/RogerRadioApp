import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { RogersChoice } from '../../components/RogersChoice/RogersChoice';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
    },
}));

const RogersChoiceComponent: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.mainCont} container spacing={0} alignItems="center">
            <Grid item xs={12}>
                <RogersChoice />
            </Grid>
        </Grid>
    );
};

export const RogersChoicePage = React.memo(RogersChoiceComponent);
