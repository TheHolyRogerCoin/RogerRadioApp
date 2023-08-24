import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { alertPush } from '../../alert';
import { radioStatusData, radioStatusError } from '../actions';

const radioStatusOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

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
                receive_timestamp: Date.now(),
            })
        );
    }
}
