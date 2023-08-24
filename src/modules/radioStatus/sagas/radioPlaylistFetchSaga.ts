import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { alertPush } from '../../alert';
import { radioPlaylistData, radioPlaylistError } from '../actions';

const radioStatusOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* radioPlaylistFetchSaga() {
    try {
        const response = yield call(
            API.get(radioStatusOptions),
            '/public_stats/playlist'
        );
        yield put(radioPlaylistData(response.data));
    } catch (error: any) {
        yield put(radioPlaylistError());
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
