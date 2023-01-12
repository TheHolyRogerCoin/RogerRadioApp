import { WebsocketsAction } from './actions';
import {
    WEBSOCKETS_CONNECT_DATA,
    WEBSOCKETS_CONNECT_ERROR,
    WEBSOCKETS_CONNECT_FETCH,
    WEBSOCKETS_DISCONNECT_DATA,
} from './constants';

export interface WebsocketsState {
    withAuth: boolean;
    connected: boolean;
    connecting: boolean;
    timestamp?: number;
}

const initialWebsocketsState: WebsocketsState = {
    withAuth: false,
    connected: false,
    connecting: false,
};
export const websocketsReducer = (
    state = initialWebsocketsState,
    action: WebsocketsAction
): WebsocketsState => {
    switch (action.type) {
        case WEBSOCKETS_CONNECT_FETCH:
            return {
                ...state,
                withAuth: action.payload.withAuth,
                connected: false,
                connecting: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case WEBSOCKETS_CONNECT_DATA:
            return {
                ...state,
                connected: true,
                connecting: false,
            };

        case WEBSOCKETS_CONNECT_ERROR:
        case WEBSOCKETS_DISCONNECT_DATA:
            return {
                ...state,
                connected: false,
                connecting: false,
                timestamp: undefined,
            };

        default:
    }

    return state;
};
