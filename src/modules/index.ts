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
import {
    TokenControlState,
    tokenControlReducer,
    rootTokenControlSaga,
} from './tokenControl';
import { websocketsReducer, WebsocketsState } from './websockets';

export * from './alert';
export * from './appStatus';
export * from './player';
export * from './radioStatus';
export * from './tokenControl';
export * from './websockets';

export interface AppState {
    ready?: boolean;
    radioStatus: RadioStatusState;
    tokenControl: TokenControlState;
    alert: AlertState;
    appStatus: AppStatusState;
    player: PlayerState;
    websockets: WebsocketsState;
}

export const appReducer = combineReducers({
    radioStatus: radioStatusReducer,
    tokenControl: tokenControlReducer,
    alert: alertReducer,
    appStatus: appStatusReducer,
    player: playerReducer,
    websockets: websocketsReducer,
});

export function* rootSaga() {
    yield all([
        call(rootRadioStatusSaga),
        call(rootTokenControlSaga),
        call(rootHandleAlertSaga),
    ]);
}
