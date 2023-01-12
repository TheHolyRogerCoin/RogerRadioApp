import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { alertReducer, AlertState, rootHandleAlertSaga } from './alert';
import { playerReducer, PlayerState } from './player';
import {
    RadioStatusState,
    radioStatusReducer,
    rootRadioStatusSaga,
} from './radioStatus';
import { websocketsReducer, WebsocketsState } from './websockets';

export * from './alert';
export * from './player';
export * from './radioStatus';

export interface AppState {
    ready: boolean;
    radioStatus: RadioStatusState;
    alert: AlertState;
    player: PlayerState;
    websockets: WebsocketsState;
}

export const appReducer = combineReducers({
    radioStatus: radioStatusReducer,
    alert: alertReducer,
    player: playerReducer,
    websockets: websocketsReducer,
});

export function* rootSaga() {
    yield all([call(rootRadioStatusSaga), call(rootHandleAlertSaga)]);
}
