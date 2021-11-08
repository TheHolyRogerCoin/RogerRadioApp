import { delay, put } from 'redux-saga/effects';
import { msAlertDisplayTime } from '../../../api/config';
import { alertData, alertDelete, AlertPush } from '../actions';

export function* handleAlertSaga(action: AlertPush) {
    yield put(alertData(action.payload));
    yield delay(parseFloat(msAlertDisplayTime()));
    yield put(alertDelete());
}
