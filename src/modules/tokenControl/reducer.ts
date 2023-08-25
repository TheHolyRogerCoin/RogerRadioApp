import { setVoucherTokens } from '../../helpers/preferences';
import { CommonState } from '../types';
import { TokenControlAction } from './actions';
import {
    TOKENCONTROL_BALANCE_DATA,
    TOKENCONTROL_BALANCE_ERROR,
    TOKENCONTROL_BALANCE_FETCH,
    TOKENCONTROL_CANCELREQUEST_DATA,
    TOKENCONTROL_CANCELREQUEST_ERROR,
    TOKENCONTROL_CANCELREQUEST_FETCH,
    TOKENCONTROL_CREATEREQUEST_DATA,
    TOKENCONTROL_CREATEREQUEST_ERROR,
    TOKENCONTROL_CREATEREQUEST_FETCH,
    TOKENCONTROL_PAYREQUEST_DATA,
    TOKENCONTROL_PAYREQUEST_ERROR,
    TOKENCONTROL_PAYREQUEST_FETCH,
    TOKENCONTROL_PENDINGREQUESTS_DATA,
    TOKENCONTROL_PENDINGREQUESTS_ERROR,
    TOKENCONTROL_PENDINGREQUESTS_FETCH,
} from './constants';
import {
    BalancePayload,
    CancelRequestPayload,
    CreateRequestPayload,
    PayRequestPayload,
    PendingRequestsPayload,
} from './types';

export interface TokenControlState extends CommonState {
    pendingRequestsData: PendingRequestsPayload['user_requests'];
    pendingRequestsLoading: boolean;
    pendingRequestsTimestampFetch?: number;
    pendingRequestsTimestampData?: number;
    createRequestData: CreateRequestPayload['response'];
    createRequestLoading: boolean;
    createRequestTimestampFetch?: number;
    createRequestTimestampData?: number;
    cancelRequestData: CancelRequestPayload['response'];
    cancelRequestLoading: boolean;
    cancelRequestTimestampFetch?: number;
    cancelRequestTimestampData?: number;
    payRequestData: PayRequestPayload['response'];
    payRequestLoading: boolean;
    payRequestTimestampFetch?: number;
    payRequestTimestampData?: number;
    balanceData: BalancePayload['available_balance'];
    balanceTokens: BalancePayload['available_tokens'];
    balanceLoading: boolean;
    balanceTimestampFetch?: number;
    balanceTimestampData?: number;
}

export const initialTokenControlState: TokenControlState = {
    createRequestData: '',
    createRequestLoading: false,
    cancelRequestData: '',
    cancelRequestLoading: false,
    payRequestData: '',
    payRequestLoading: false,
    pendingRequestsData: [],
    pendingRequestsLoading: false,
    balanceData: 0,
    balanceTokens: [],
    balanceLoading: false,
};

export const tokenControlReducer = (
    state = initialTokenControlState,
    action: TokenControlAction
) => {
    switch (action.type) {
        case TOKENCONTROL_CREATEREQUEST_FETCH:
            return {
                ...state,
                createRequestLoading: true,
                createRequestTimestampFetch: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_CREATEREQUEST_DATA:
            return {
                ...state,
                createRequestLoading: false,
                createRequestData: action.payload.response,
                createRequestTimestampData: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_CREATEREQUEST_ERROR:
            return {
                ...state,
                createRequestLoading: false,
            };
        case TOKENCONTROL_CANCELREQUEST_FETCH:
            return {
                ...state,
                cancelRequestLoading: true,
                cancelRequestTimestampFetch: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_CANCELREQUEST_DATA:
            return {
                ...state,
                cancelRequestLoading: false,
                cancelRequestData: action.payload.response,
                cancelRequestTimestampData: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_CANCELREQUEST_ERROR:
            return {
                ...state,
                cancelRequestLoading: false,
            };
        case TOKENCONTROL_PAYREQUEST_FETCH:
            return {
                ...state,
                payRequestLoading: true,
                payRequestTimestampFetch: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_PAYREQUEST_DATA:
            return {
                ...state,
                payRequestLoading: false,
                payRequestData: action.payload.response,
                payRequestTimestampData: Math.floor(Date.now() / 1000),
                balanceData: Math.floor(action.payload.available_balance / 6.9),
                balanceTokens: action.payload.available_tokens,
            };
        case TOKENCONTROL_PAYREQUEST_ERROR:
            return {
                ...state,
                payRequestLoading: false,
            };
        case TOKENCONTROL_PENDINGREQUESTS_FETCH:
            return {
                ...state,
                pendingRequestsLoading: true,
                pendingRequestsTimestampFetch: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_PENDINGREQUESTS_DATA:
            return {
                ...state,
                pendingRequestsLoading: false,
                pendingRequestsData: action.payload.user_requests,
                pendingRequestsTimestampData: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_PENDINGREQUESTS_ERROR:
            return {
                ...state,
                pendingRequestsLoading: false,
            };
        case TOKENCONTROL_BALANCE_FETCH:
            return {
                ...state,
                balanceLoading: true,
                balanceTimestampFetch: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_BALANCE_DATA:
            setVoucherTokens(action.payload.available_tokens);
            return {
                ...state,
                balanceLoading: false,
                balanceData: Math.floor(action.payload.available_balance / 6.9),
                balanceTokens: action.payload.available_tokens,
                balanceTimestampData: Math.floor(Date.now() / 1000),
            };
        case TOKENCONTROL_BALANCE_ERROR:
            return {
                ...state,
                balanceLoading: false,
            };
        default:
            return state;
    }
};
