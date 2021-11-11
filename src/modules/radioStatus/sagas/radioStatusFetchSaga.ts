import { call, put, takeLeading } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { alertPush } from '../../alert';
import { radioStatusData, radioStatusError } from '../actions';
import { RADIO_STATUS_FETCH } from '../constants';

const radioStatusOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* rootRadioStatusSaga() {
    yield takeLeading(RADIO_STATUS_FETCH, radioStatusFetchSaga);
}

export function* radioStatusFetchSaga() {
    try {
        const radioStatus = yield call(
            API.get(radioStatusOptions),
            '/public_stats'
        );
        yield put(radioStatusData(radioStatus.data));
    } catch (error: any) {
        yield put(radioStatusError());
        yield put(
            alertPush({
                message: error.message,
                code: error.code,
                type: 'error',
            })
        );
    }
}
