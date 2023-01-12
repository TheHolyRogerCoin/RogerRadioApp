import { AppState } from '../';
import { WebsocketsState } from './reducer';

export const selectWebsockets = (state: AppState): WebsocketsState =>
    state.websockets;

export const selectWebsocketsIsConnected = (state: AppState): boolean =>
    state.websockets.connected;

export const selectWebsocketsIsConnecting = (state: AppState): boolean =>
    state.websockets.connecting;

export const selectWebsocketsTimestamp = (
    state: AppState
): number | undefined => state.websockets.timestamp;

export const selectShouldWebsocketsConnect = (state: AppState): boolean =>
    !selectWebsocketsIsConnecting(state);
