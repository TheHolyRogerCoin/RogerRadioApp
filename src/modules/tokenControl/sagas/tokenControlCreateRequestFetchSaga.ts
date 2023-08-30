import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers/buildQueryString';
import { alertPush } from '../../alert';
import {
    tokenControlBalanceFetch,
    tokenControlCreateRequestData,
    tokenControlCreateRequestError,
    TokenControlCreateRequestFetch,
    tokenControlPendingRequestsFetch,
} from '../actions';

const tokenControlOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* tokenControlCreateRequestFetchSaga(
    action: TokenControlCreateRequestFetch
) {
    try {
        const get_params = {
            ...action.payload,
        };
        const params = buildQueryString(get_params);
        const response = yield call(
            API.get(tokenControlOptions),
            `/token_control?${params}`
        );
        yield put(tokenControlCreateRequestData(response.data));
        yield put(
            alertPush({
                message: response.data.response,
                type: response.data.response.includes('Received request')
                    ? 'success'
                    : 'error',
                receive_timestamp: Date.now(),
            })
        );
        yield put(
            tokenControlPendingRequestsFetch({ tokens: action.payload.tokens })
        );
        yield put(tokenControlBalanceFetch({ tokens: action.payload.tokens }));
    } catch (error: any) {
        yield put(tokenControlCreateRequestError());
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
