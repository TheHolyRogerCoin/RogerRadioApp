import { AppState } from '../index';
import { RadioStatusState } from './reducer';
import { RadioStatusInfo } from './types';

const selectRadioStatusState = (state: AppState): RadioStatusState =>
    state.radioStatus;

export const selectRadioStatus = (state: AppState): RadioStatusInfo =>
    selectRadioStatusState(state).status;

export const selectNowPlaying = (
    state: AppState
): RadioStatusInfo['now_playing'] => selectRadioStatus(state).now_playing;

export const selectRadioStatusLoading = (
    state: AppState
): boolean | undefined => selectRadioStatusState(state).loading;

export const selectRadioStatusTimestamp = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestamp;

export const selectRadioStatusTimestampData = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestampData;

export const selectShouldFetchRadioStatus = (state: AppState): boolean => {
    return !selectRadioStatusLoading(state);
};
