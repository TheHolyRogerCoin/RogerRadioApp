import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers/buildQueryString';
import { alertPush } from '../../alert';
import {
    tokenControlPendingRequestsData,
    tokenControlPendingRequestsError,
    TokenControlPendingRequestsFetch,
} from '../actions';

const tokenControlOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* tokenControlPendingRequestsFetchSaga(
    action: TokenControlPendingRequestsFetch
) {
    try {
        const get_params = {
            ...action.payload,
            get_requests: true,
        };
        const params = buildQueryString(get_params);
        const response = yield call(
            API.get(tokenControlOptions),
            `/token_control?${params}`
        );
        if (response.data.response) {
            yield put(
                alertPush({
                    message: response.data.response,
                    type: 'error',
                    receive_timestamp: Date.now(),
                })
            );
        } else {
            yield put(tokenControlPendingRequestsData(response.data));
        }
    } catch (error: any) {
        yield put(tokenControlPendingRequestsError());
    }
}
