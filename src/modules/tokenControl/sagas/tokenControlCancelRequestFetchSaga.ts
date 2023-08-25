import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers/buildQueryString';
import { alertPush } from '../../alert';
import {
    tokenControlCancelRequestData,
    tokenControlCancelRequestError,
    TokenControlCancelRequestFetch,
    tokenControlPendingRequestsFetch,
} from '../actions';

const tokenControlOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* tokenControlCancelRequestFetchSaga(
    action: TokenControlCancelRequestFetch
) {
    try {
        const get_params = {
            ...action.payload,
            cancel_request: true,
        };
        const params = buildQueryString(get_params);
        const response = yield call(
            API.get(tokenControlOptions),
            `/token_control?${params}`
        );
        yield put(tokenControlCancelRequestData(response.data));
        yield put(
            alertPush({
                message: response.data.response,
                type: response.data.response.includes('Cancelled')
                    ? 'success'
                    : 'error',
                receive_timestamp: Date.now(),
            })
        );
        yield put(
            tokenControlPendingRequestsFetch({ tokens: action.payload.tokens })
        );
    } catch (error: any) {
        yield put(tokenControlCancelRequestError());
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
