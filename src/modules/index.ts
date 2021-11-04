import { combineReducers } from 'redux';
// import { all, call } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';

export interface AppState {
    ready: boolean;
}

export const appReducer = combineReducers({
    // radioData: radioReducer,,
});

export function* rootSaga() {
    yield all([
        // call(rootRadioSaga),
    ]);
}
