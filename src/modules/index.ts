import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { alertReducer, AlertState, rootHandleAlertSaga } from './alert';
import { appStatusReducer, AppStatusState } from './appStatus';
import { playerReducer, PlayerState } from './player';
import {
    RadioStatusState,
    radioStatusReducer,
    rootRadioStatusSaga,
} from './radioStatus';
import { websocketsReducer, WebsocketsState } from './websockets';

export * from './alert';
export * from './appStatus';
export * from './player';
export * from './radioStatus';
export * from './websockets';

export interface AppState {
    ready?: boolean;
    radioStatus: RadioStatusState;
    alert: AlertState;
    appStatus: AppStatusState;
    player: PlayerState;
    websockets: WebsocketsState;
}

export const appReducer = combineReducers({
    radioStatus: radioStatusReducer,
    alert: alertReducer,
    appStatus: appStatusReducer,
    player: playerReducer,
    websockets: websocketsReducer,
});

export function* rootSaga() {
    yield all([call(rootRadioStatusSaga), call(rootHandleAlertSaga)]);
}
