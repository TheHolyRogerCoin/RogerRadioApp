import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers/buildQueryString';
import { alertPush } from '../../alert';
import {
    tokenControlBalanceFetch,
    tokenControlPayRequestData,
    tokenControlPayRequestError,
    TokenControlPayRequestFetch,
    tokenControlPendingRequestsFetch,
} from '../actions';

const tokenControlOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* tokenControlPayRequestFetchSaga(
    action: TokenControlPayRequestFetch
) {
    try {
        const get_params = {
            ...action.payload,
            pay_top_request: true,
        };
        const params = buildQueryString(get_params);
        const response = yield call(
            API.get(tokenControlOptions),
            `/token_control?${params}`
        );
        yield put(tokenControlPayRequestData(response.data));
        yield put(
            alertPush({
                message: response.data.response,
                type: response.data.response.includes('added')
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
        yield put(tokenControlPayRequestError());
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
