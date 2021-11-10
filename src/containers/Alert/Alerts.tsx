import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage } from '../../components/AlertMessage/AlertMessage';
import { convertError } from '../../helpers/convertError';
import { alertDeleteByIndex, AlertState, selectAlertState } from '../../modules';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'fixed',
        right: 10,
        top: 10,
        zIndex: 10000,
    },
}));

const AlertComponent: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const alerts: AlertState = useSelector(selectAlertState);

    const deleteAlertByIndex = React.useCallback(
        (key: number) => {
            dispatch(alertDeleteByIndex(key));
        },
        [dispatch]
    );

    const renderMessage = React.useCallback((w) => {
        if (typeof w.message !== 'object') {
            return (
                <AlertMessage key={w.message} message={w.message} type={w.type as 'error' | 'snackbar' | 'success'} />
            );
        }

        return w.message.map((e, i) => (
            <AlertMessage key={i} message={convertError(e)} type={w.type as 'error' | 'snackbar' | 'success'} />
        ));
    }, []);

    return (
        <div className={classes.wrapper}>
            {alerts.alerts.map((w, k) => (
                <div key={k} onClick={() => deleteAlertByIndex(k)}>
                    {w.message && renderMessage(w)}
                </div>
            ))}
        </div>
    );
};

export const Alerts = React.memo(AlertComponent);
