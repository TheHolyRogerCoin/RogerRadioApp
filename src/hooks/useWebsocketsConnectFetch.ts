import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from './usePrevious';
import { selectAppTasksDisabled } from '../modules/appStatus';
import { websocketsConnectFetch, websocketsDisconnectFetch } from '../modules/websockets';
import { selectWebsocketsIsConnected, selectWebsocketsIsConnecting } from '../modules/websockets/selectors';

export const useWebsocketsConnectFetch = () => {
    const dispatch = useDispatch();
    const tasksDisabled = useSelector(selectAppTasksDisabled);
    const connected = useSelector(selectWebsocketsIsConnected);
    const connecting = useSelector(selectWebsocketsIsConnecting);
    const prevConnected = usePrevious(connected);

    React.useEffect(() => {
        if (!tasksDisabled && !connected && !connecting) {
            dispatch(websocketsConnectFetch({ withAuth: false }));
        } else if (tasksDisabled && connected && !connecting) {
            dispatch(websocketsDisconnectFetch());
        }
    }, [dispatch, connected, prevConnected, tasksDisabled, connecting]);
};
