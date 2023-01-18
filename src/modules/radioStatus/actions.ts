import {
    RADIO_STATUS_DATA,
    RADIO_STATUS_ERROR,
    RADIO_STATUS_FETCH,
    RADIO_PLAYLIST_DATA,
    RADIO_PLAYLIST_ERROR,
    RADIO_PLAYLIST_FETCH,
    RADIO_SCHEDULE_DATA,
    RADIO_SCHEDULE_ERROR,
    RADIO_SCHEDULE_FETCH,
    RADIO_RECENT_REQUESTS_DATA,
    RADIO_RECENT_REQUESTS_ERROR,
    RADIO_RECENT_REQUESTS_FETCH,
} from './constants';
import {
    RadioStatusInfo,
    RadioPlaylistInfo,
    RadioRecentRequestsInfo,
    RadioScheduleListInfo,
} from './types';

export interface RadioStatusFetch {
    type: typeof RADIO_STATUS_FETCH;
}

export interface RadioStatusData {
    type: typeof RADIO_STATUS_DATA;
    payload: RadioStatusInfo;
}

export interface RadioStatusError {
    type: typeof RADIO_STATUS_ERROR;
}

export interface RadioPlaylistFetch {
    type: typeof RADIO_PLAYLIST_FETCH;
}

export interface RadioPlaylistData {
    type: typeof RADIO_PLAYLIST_DATA;
    payload: RadioPlaylistInfo;
}

export interface RadioPlaylistError {
    type: typeof RADIO_PLAYLIST_ERROR;
}

export interface RadioScheduleListFetch {
    type: typeof RADIO_SCHEDULE_FETCH;
}

export interface RadioScheduleListData {
    type: typeof RADIO_SCHEDULE_DATA;
    payload: RadioScheduleListInfo;
}

export interface RadioScheduleListError {
    type: typeof RADIO_SCHEDULE_ERROR;
}

export interface RadioRecentRequestsFetch {
    type: typeof RADIO_RECENT_REQUESTS_FETCH;
}

export interface RadioRecentRequestsData {
    type: typeof RADIO_RECENT_REQUESTS_DATA;
    payload: RadioRecentRequestsInfo;
}

export interface RadioRecentRequestsError {
    type: typeof RADIO_RECENT_REQUESTS_ERROR;
}

export type RadioStatusAction =
    | RadioStatusFetch
    | RadioStatusData
    | RadioStatusError
    | RadioPlaylistFetch
    | RadioPlaylistData
    | RadioPlaylistError
    | RadioScheduleListFetch
    | RadioScheduleListData
    | RadioScheduleListError
    | RadioRecentRequestsFetch
    | RadioRecentRequestsData
    | RadioRecentRequestsError;

export const radioStatusFetch = (): RadioStatusFetch => ({
    type: RADIO_STATUS_FETCH,
});

export const radioStatusData = (
    payload: RadioStatusData['payload']
): RadioStatusData => ({
    type: RADIO_STATUS_DATA,
    payload,
});

export const radioStatusError = (): RadioStatusError => ({
    type: RADIO_STATUS_ERROR,
});

export const radioPlaylistFetch = (): RadioPlaylistFetch => ({
    type: RADIO_PLAYLIST_FETCH,
});

export const radioPlaylistData = (
    payload: RadioPlaylistData['payload']
): RadioPlaylistData => ({
    type: RADIO_PLAYLIST_DATA,
    payload,
});

export const radioPlaylistError = (): RadioPlaylistError => ({
    type: RADIO_PLAYLIST_ERROR,
});

export const radioScheduleListFetch = (): RadioScheduleListFetch => ({
    type: RADIO_SCHEDULE_FETCH,
});

export const radioScheduleListData = (
    payload: RadioScheduleListData['payload']
): RadioScheduleListData => ({
    type: RADIO_SCHEDULE_DATA,
    payload,
});

export const radioScheduleListError = (): RadioScheduleListError => ({
    type: RADIO_SCHEDULE_ERROR,
});

export const radioRecentRequestsFetch = (): RadioRecentRequestsFetch => ({
    type: RADIO_RECENT_REQUESTS_FETCH,
});

export const radioRecentRequestsData = (
    payload: RadioRecentRequestsData['payload']
): RadioRecentRequestsData => ({
    type: RADIO_RECENT_REQUESTS_DATA,
    payload,
});

export const radioRecentRequestsError = (): RadioRecentRequestsError => ({
    type: RADIO_RECENT_REQUESTS_ERROR,
});
