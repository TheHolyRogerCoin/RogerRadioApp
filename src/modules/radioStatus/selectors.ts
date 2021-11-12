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
): boolean | undefined => selectRadioStatusState(state).loadingStatus;

export const selectRadioStatusTimestamp = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestampStatus;

export const selectRadioStatusTimestampData = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestampStatusData;

export const selectShouldFetchRadioStatus = (state: AppState): boolean => {
    return !selectRadioStatusLoading(state);
};

export const selectRadioPlaylist = (
    state: AppState
): RadioStatusState['playlist'] => selectRadioStatusState(state).playlist;

export const selectRadioPlaylistLoading = (
    state: AppState
): boolean | undefined => selectRadioStatusState(state).loadingPlaylist;

export const selectRadioPlaylistTimestamp = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestampPlaylist;

export const selectRadioPlaylistTimestampData = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestampPlaylistData;

export const selectShouldFetchRadioPlaylist = (state: AppState): boolean => {
    return !selectRadioPlaylistLoading(state);
};

export const selectRadioScheduleList = (
    state: AppState
): RadioStatusState['scheduleList'] =>
    selectRadioStatusState(state).scheduleList;

export const selectRadioScheduleListLoading = (
    state: AppState
): boolean | undefined => selectRadioStatusState(state).loadingScheduleList;

export const selectRadioScheduleListTimestamp = (
    state: AppState
): number | undefined => selectRadioStatusState(state).timestampScheduleList;

export const selectRadioScheduleListTimestampData = (
    state: AppState
): number | undefined =>
    selectRadioStatusState(state).timestampScheduleListData;

export const selectShouldFetchRadioScheduleList = (
    state: AppState
): boolean => {
    return !selectRadioScheduleListLoading(state);
};
