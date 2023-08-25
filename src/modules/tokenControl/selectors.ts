import { AppState } from '../index';
import { TokenControlState } from './reducer';

const selectTokenControlState = (state: AppState): TokenControlState =>
    state.tokenControl;

export const selectPendingRequestsData = (
    state: AppState
): TokenControlState['pendingRequestsData'] =>
    selectTokenControlState(state).pendingRequestsData;

export const selectPendingRequestsLoading = (
    state: AppState
): boolean | undefined => selectTokenControlState(state).pendingRequestsLoading;

export const selectPendingRequestsTimestampFetch = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).pendingRequestsTimestampFetch;

export const selectPendingRequestsTimestampData = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).pendingRequestsTimestampData;

export const selectShouldFetchPendingRequests = (state: AppState): boolean => {
    return !selectPendingRequestsLoading(state);
};

export const selectBalanceData = (
    state: AppState
): TokenControlState['balanceData'] =>
    selectTokenControlState(state).balanceData;

export const selectBalanceLoading = (state: AppState): boolean | undefined =>
    selectTokenControlState(state).balanceLoading;

export const selectBalanceTimestampFetch = (
    state: AppState
): number | undefined => selectTokenControlState(state).balanceTimestampFetch;

export const selectBalanceTimestampData = (
    state: AppState
): number | undefined => selectTokenControlState(state).balanceTimestampData;

export const selectShouldFetchBalance = (state: AppState): boolean => {
    return !selectBalanceLoading(state);
};

export const selectCancelRequestData = (
    state: AppState
): TokenControlState['cancelRequestData'] =>
    selectTokenControlState(state).cancelRequestData;

export const selectCancelRequestLoading = (
    state: AppState
): boolean | undefined => selectTokenControlState(state).cancelRequestLoading;

export const selectCancelRequestTimestampFetch = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).cancelRequestTimestampFetch;

export const selectCancelRequestTimestampData = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).cancelRequestTimestampData;

export const selectShouldFetchCancelRequest = (state: AppState): boolean => {
    return !selectCancelRequestLoading(state);
};

export const selectPayRequestData = (
    state: AppState
): TokenControlState['payRequestData'] =>
    selectTokenControlState(state).payRequestData;

export const selectPayRequestLoading = (state: AppState): boolean | undefined =>
    selectTokenControlState(state).payRequestLoading;

export const selectPayRequestTimestampFetch = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).payRequestTimestampFetch;

export const selectPayRequestTimestampData = (
    state: AppState
): number | undefined => selectTokenControlState(state).payRequestTimestampData;

export const selectShouldFetchPayRequest = (state: AppState): boolean => {
    return !selectPayRequestLoading(state);
};

export const selectCreateRequestData = (
    state: AppState
): TokenControlState['createRequestData'] =>
    selectTokenControlState(state).createRequestData;

export const selectCreateRequestLoading = (
    state: AppState
): boolean | undefined => selectTokenControlState(state).createRequestLoading;

export const selectCreateRequestTimestampFetch = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).createRequestTimestampFetch;

export const selectCreateRequestTimestampData = (
    state: AppState
): number | undefined =>
    selectTokenControlState(state).createRequestTimestampData;

export const selectShouldFetchCreateRequest = (state: AppState): boolean => {
    return !selectCreateRequestLoading(state);
};
