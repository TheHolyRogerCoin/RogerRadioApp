import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers/buildQueryString';
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
        yield put(tokenControlPendingRequestsData(response.data));
    } catch (error: any) {
        yield put(tokenControlPendingRequestsError());
    }
}
