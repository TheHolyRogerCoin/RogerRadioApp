import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { alertReducer, AlertState, rootHandleAlertSaga } from './alert';
import {
    RadioStatusState,
    radioStatusReducer,
    rootRadioStatusSaga,
} from './radioStatus';

export * from './alert';
export * from './radioStatus';

export interface AppState {
    ready: boolean;
    radioStatus: RadioStatusState;
    alert: AlertState;
}

export const appReducer = combineReducers({
    radioStatus: radioStatusReducer,
    alert: alertReducer,
});

export function* rootSaga() {
    yield all([call(rootRadioStatusSaga), call(rootHandleAlertSaga)]);
}
