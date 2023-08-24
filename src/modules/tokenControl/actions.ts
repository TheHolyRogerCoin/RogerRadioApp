import {
    TOKENCONTROL_CREATEREQUEST_DATA,
    TOKENCONTROL_CREATEREQUEST_ERROR,
    TOKENCONTROL_CREATEREQUEST_FETCH,
    TOKENCONTROL_PAYREQUEST_DATA,
    TOKENCONTROL_PAYREQUEST_ERROR,
    TOKENCONTROL_PAYREQUEST_FETCH,
    TOKENCONTROL_PENDINGREQUESTS_DATA,
    TOKENCONTROL_PENDINGREQUESTS_ERROR,
    TOKENCONTROL_PENDINGREQUESTS_FETCH,
    TOKENCONTROL_BALANCE_DATA,
    TOKENCONTROL_BALANCE_ERROR,
    TOKENCONTROL_BALANCE_FETCH,
} from './constants';
import {
    BalanceFetchPayload,
    BalancePayload,
    CreateRequestFetchPayload,
    CreateRequestPayload,
    PayRequestFetchPayload,
    PayRequestPayload,
    PendingRequestsFetchPayload,
    PendingRequestsPayload,
} from './types';

export interface TokenControlCreateRequestFetch {
    type: typeof TOKENCONTROL_CREATEREQUEST_FETCH;
    payload: CreateRequestFetchPayload;
}

export interface TokenControlCreateRequestData {
    type: typeof TOKENCONTROL_CREATEREQUEST_DATA;
    payload: CreateRequestPayload;
}

export interface TokenControlCreateRequestError {
    type: typeof TOKENCONTROL_CREATEREQUEST_ERROR;
}

export interface TokenControlPayRequestFetch {
    type: typeof TOKENCONTROL_PAYREQUEST_FETCH;
    payload: PayRequestFetchPayload;
}

export interface TokenControlPayRequestData {
    type: typeof TOKENCONTROL_PAYREQUEST_DATA;
    payload: PayRequestPayload;
}

export interface TokenControlPayRequestError {
    type: typeof TOKENCONTROL_PAYREQUEST_ERROR;
}

export interface TokenControlPendingRequestsFetch {
    type: typeof TOKENCONTROL_PENDINGREQUESTS_FETCH;
    payload: PendingRequestsFetchPayload;
}

export interface TokenControlPendingRequestsData {
    type: typeof TOKENCONTROL_PENDINGREQUESTS_DATA;
    payload: PendingRequestsPayload;
}

export interface TokenControlPendingRequestsError {
    type: typeof TOKENCONTROL_PENDINGREQUESTS_ERROR;
}

export interface TokenControlBalanceFetch {
    type: typeof TOKENCONTROL_BALANCE_FETCH;
    payload: BalanceFetchPayload;
}

export interface TokenControlBalanceData {
    type: typeof TOKENCONTROL_BALANCE_DATA;
    payload: BalancePayload;
}

export interface TokenControlBalanceError {
    type: typeof TOKENCONTROL_BALANCE_ERROR;
}

export type TokenControlAction =
    | TokenControlCreateRequestFetch
    | TokenControlCreateRequestData
    | TokenControlCreateRequestError
    | TokenControlPayRequestFetch
    | TokenControlPayRequestData
    | TokenControlPayRequestError
    | TokenControlPendingRequestsFetch
    | TokenControlPendingRequestsData
    | TokenControlPendingRequestsError
    | TokenControlBalanceFetch
    | TokenControlBalanceData
    | TokenControlBalanceError;

export const tokenControlCreateRequestFetch = (
    payload: TokenControlCreateRequestFetch['payload']
): TokenControlCreateRequestFetch => ({
    type: TOKENCONTROL_CREATEREQUEST_FETCH,
    payload,
});

export const tokenControlCreateRequestData = (
    payload: TokenControlCreateRequestData['payload']
): TokenControlCreateRequestData => ({
    type: TOKENCONTROL_CREATEREQUEST_DATA,
    payload,
});

export const tokenControlCreateRequestError =
    (): TokenControlCreateRequestError => ({
        type: TOKENCONTROL_CREATEREQUEST_ERROR,
    });

export const tokenControlPayRequestFetch = (
    payload: TokenControlPayRequestFetch['payload']
): TokenControlPayRequestFetch => ({
    type: TOKENCONTROL_PAYREQUEST_FETCH,
    payload,
});

export const tokenControlPayRequestData = (
    payload: TokenControlPayRequestData['payload']
): TokenControlPayRequestData => ({
    type: TOKENCONTROL_PAYREQUEST_DATA,
    payload,
});

export const tokenControlPayRequestError = (): TokenControlPayRequestError => ({
    type: TOKENCONTROL_PAYREQUEST_ERROR,
});

export const tokenControlPendingRequestsFetch = (
    payload: TokenControlPendingRequestsFetch['payload']
): TokenControlPendingRequestsFetch => ({
    type: TOKENCONTROL_PENDINGREQUESTS_FETCH,
    payload,
});

export const tokenControlPendingRequestsData = (
    payload: TokenControlPendingRequestsData['payload']
): TokenControlPendingRequestsData => ({
    type: TOKENCONTROL_PENDINGREQUESTS_DATA,
    payload,
});

export const tokenControlPendingRequestsError =
    (): TokenControlPendingRequestsError => ({
        type: TOKENCONTROL_PENDINGREQUESTS_ERROR,
    });

export const tokenControlBalanceFetch = (
    payload: TokenControlBalanceFetch['payload']
): TokenControlBalanceFetch => ({
    type: TOKENCONTROL_BALANCE_FETCH,
    payload,
});

export const tokenControlBalanceData = (
    payload: TokenControlBalanceData['payload']
): TokenControlBalanceData => ({
    type: TOKENCONTROL_BALANCE_DATA,
    payload,
});

export const tokenControlBalanceError = (): TokenControlBalanceError => ({
    type: TOKENCONTROL_BALANCE_ERROR,
});
