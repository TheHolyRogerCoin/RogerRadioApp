import { takeLeading } from 'redux-saga/effects';
import {
    TOKENCONTROL_BALANCE_FETCH,
    TOKENCONTROL_CANCELREQUEST_FETCH,
    TOKENCONTROL_CREATEREQUEST_FETCH,
    TOKENCONTROL_PAYREQUEST_FETCH,
    TOKENCONTROL_PENDINGREQUESTS_FETCH,
} from '../constants';
import { tokenControlBalanceFetchSaga } from './tokenControlBalanceFetchSaga';
import { tokenControlCancelRequestFetchSaga } from './tokenControlCancelRequestFetchSaga';
import { tokenControlPendingRequestsFetchSaga } from './tokenControlPendingRequestsFetchSaga';
import { tokenControlCreateRequestFetchSaga } from './tokenControlCreateRequestFetchSaga';
import { tokenControlPayRequestFetchSaga } from './tokenControlPayRequestFetchSaga';

export function* rootTokenControlSaga() {
    yield takeLeading(TOKENCONTROL_BALANCE_FETCH, tokenControlBalanceFetchSaga);
    yield takeLeading(
        TOKENCONTROL_CREATEREQUEST_FETCH,
        tokenControlCreateRequestFetchSaga
    );
    yield takeLeading(
        TOKENCONTROL_CANCELREQUEST_FETCH,
        tokenControlCancelRequestFetchSaga
    );
    yield takeLeading(
        TOKENCONTROL_PAYREQUEST_FETCH,
        tokenControlPayRequestFetchSaga
    );
    yield takeLeading(
        TOKENCONTROL_PENDINGREQUESTS_FETCH,
        tokenControlPendingRequestsFetchSaga
    );
}
