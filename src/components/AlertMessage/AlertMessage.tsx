import SnackbarContent from '@mui/material/SnackbarContent';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
    alertMessage: {
        position: 'relative',
        zIndex: 10000,
        display: 'flex',
        margin: 10,
        fontWeight: '900!important' as any,
    },
    snackbar: {
        background: `linear-gradient(0deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%) !important`,
        color: '#fff !important',
    },
    error: {
        background: '#d32f2f !important',
    },
    success: {
        background: '#43a047 !important',
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
        return classNames(classes[type], classes.alertMessage);
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
