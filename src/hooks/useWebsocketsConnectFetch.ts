import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from './usePrevious';
import { websocketsConnectFetch } from '../modules/websockets';
import { selectWebsockets } from '../modules/websockets/selectors';

export const useWebsocketsConnectFetch = () => {
    const dispatch = useDispatch();
    const { connected } = useSelector(selectWebsockets);
    const prevConnected = usePrevious(connected);

    React.useEffect(() => {
        if (!connected) {
            dispatch(websocketsConnectFetch({ withAuth: false }));
        }
    }, [dispatch, connected, prevConnected]);
};
