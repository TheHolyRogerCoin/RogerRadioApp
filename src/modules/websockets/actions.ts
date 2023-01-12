import { CommonError } from '../types';
import {
    WEBSOCKETS_CONNECT_DATA,
    WEBSOCKETS_CONNECT_ERROR,
    WEBSOCKETS_CONNECT_FETCH,
    WEBSOCKETS_DIRECT_WRITE,
    WEBSOCKETS_DISCONNECT_DATA,
    WEBSOCKETS_DISCONNECT_FETCH,
} from './constants';

export interface WebsocketsConnectFetch {
    type: typeof WEBSOCKETS_CONNECT_FETCH;
    payload: {
        withAuth: boolean;
    };
}

export interface WebsocketsConnectData {
    type: typeof WEBSOCKETS_CONNECT_DATA;
}

export interface WebsocketsDisconnectFetch {
    type: typeof WEBSOCKETS_DISCONNECT_FETCH;
}

export interface WebsocketsDisconnectData {
    type: typeof WEBSOCKETS_DISCONNECT_DATA;
}

export interface WebsocketsDirectMessage {
    type: typeof WEBSOCKETS_DIRECT_WRITE;
    // tslint:disable-next-line no-any
    payload: {
        [pair: string]: any;
    };
}

export interface WebsocketsConnectError {
    type: typeof WEBSOCKETS_CONNECT_ERROR;
    payload?: {
        code: number;
        message: string[];
    };
}

export type WebsocketsAction =
    | WebsocketsConnectFetch
    | WebsocketsConnectData
    | WebsocketsConnectError
    | WebsocketsDisconnectData;

export type WebsocketsErrorType = typeof WEBSOCKETS_CONNECT_ERROR;

export const websocketsConnectFetch = (
    payload: WebsocketsConnectFetch['payload']
): WebsocketsConnectFetch => ({
    type: WEBSOCKETS_CONNECT_FETCH,
    payload,
});

export const websocketsConnectData = (): WebsocketsConnectData => ({
    type: WEBSOCKETS_CONNECT_DATA,
});

export const websocketsConnectError = (
    payload: CommonError
): WebsocketsConnectError => ({
    type: WEBSOCKETS_CONNECT_ERROR,
    payload,
});

export const websocketsDisconnectData = (): WebsocketsDisconnectData => ({
    type: WEBSOCKETS_DISCONNECT_DATA,
});

export const websocketsDirectMessage = (
    payload: WebsocketsDirectMessage['payload']
): WebsocketsDirectMessage => ({
    type: WEBSOCKETS_DIRECT_WRITE,
    payload,
});

export const websocketsDisconnectFetch = (): WebsocketsDisconnectFetch => ({
    type: WEBSOCKETS_DISCONNECT_FETCH,
});
