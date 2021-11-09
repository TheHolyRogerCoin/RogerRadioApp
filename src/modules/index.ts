import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { alertReducer, AlertState, rootHandleAlertSaga } from './alert';
import { playerReducer, PlayerState } from './player';
import {
    RadioStatusState,
    radioStatusReducer,
    rootRadioStatusSaga,
} from './radioStatus';

export * from './alert';
export * from './player';
export * from './radioStatus';

export interface AppState {
    ready: boolean;
    radioStatus: RadioStatusState;
    alert: AlertState;
    player: PlayerState;
}

export const appReducer = combineReducers({
    radioStatus: radioStatusReducer,
    alert: alertReducer,
    player: playerReducer,
});

export function* rootSaga() {
    yield all([call(rootRadioStatusSaga), call(rootHandleAlertSaga)]);
}
