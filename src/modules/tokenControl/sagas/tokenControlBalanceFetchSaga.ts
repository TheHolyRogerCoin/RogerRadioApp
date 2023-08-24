import { call, put } from 'redux-saga/effects';
import { API, radioApiKey, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers/buildQueryString';
import {
    tokenControlBalanceData,
    tokenControlBalanceError,
    TokenControlBalanceFetch,
} from '../actions';

const tokenControlOptions: RequestOptions = {
    apiVersion: 'radio',
    headers: {
        'pub-api-key': radioApiKey(),
    },
};

export function* tokenControlBalanceFetchSaga(
    action: TokenControlBalanceFetch
) {
    try {
        const get_params = {
            ...action.payload,
            get_balance: true,
        };
        const params = buildQueryString(get_params);
        const response = yield call(
            API.get(tokenControlOptions),
            `/token_control?${params}`
        );
        yield put(tokenControlBalanceData(response.data));
    } catch (error: any) {
        yield put(tokenControlBalanceError());
    }
}
