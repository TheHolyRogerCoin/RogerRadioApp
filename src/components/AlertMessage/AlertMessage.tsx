import SnackbarContent from '@mui/material/SnackbarContent';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
    snackbar: {
        position: 'relative',
        zIndex: 10000,
        display: 'flex',
        margin: 10,
        backgroundColor: 'transparent',
    },
    error: {
        background: '#d32f2f !important',
    },
    success: {
        backgroundColor: '#43a047',
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

interface Props {
    message: string;
    type: 'error' | 'snackbar' | 'success';
}

const AlertMessageComponent: React.FC<Props> = ({ message, type }) => {
    const classes = useStyles();

    const cx = React.useCallback(() => {
        return classNames(classes[type], classes.snackbar);
    }, [classes, type]);

    return (
        <SnackbarContent
            className={classNames(classes[type], cx())}
            message={
                <span id="client-snackbar" className={classes.message}>
                    {message}
                </span>
            }
        />
    );
};

export const AlertMessage = React.memo(AlertMessageComponent);
