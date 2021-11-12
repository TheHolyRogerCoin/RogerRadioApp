import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { alertPush } from '../../alert';
import { radioScheduleListData, radioScheduleListError } from '../actions';

const radioStatusOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* radioScheduleListFetchSaga() {
    try {
        const response = yield call(
            API.get(radioStatusOptions),
            '/public_stats/schedulelist'
        );
        yield put(radioScheduleListData(response.data));
    } catch (error: any) {
        yield put(radioScheduleListError());
        yield put(
            alertPush({
                message: error.message,
                code: error.code,
                type: 'error',
            })
        );
    }
}
