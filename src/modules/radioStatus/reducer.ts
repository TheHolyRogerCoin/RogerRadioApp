import { CommonState } from '../types';
import { RadioStatusAction } from './actions';
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
    ScheduleEvent,
} from './types';

export interface RadioStatusState extends CommonState {
    status: RadioStatusInfo;
    playlist: RadioPlaylistInfo['playlist'];
    scheduleList: ScheduleEvent[];
    recentRequests: RadioRecentRequestsInfo['recent_requests'];
    loadingStatus: boolean;
    timestampStatus?: number;
    timestampStatusData?: number;
    loadingPlaylist: boolean;
    timestampPlaylist?: number;
    timestampPlaylistData?: number;
    loadingScheduleList: boolean;
    timestampScheduleList?: number;
    timestampScheduleListData?: number;
    loadingRecentRequests: boolean;
    timestampRecentRequests?: number;
    timestampRecentRequestsData?: number;
}

export const initialRadioStatusState: RadioStatusState = {
    status: {
        now_playing: {
            Artwork: '',
            Artist: '',
            Duration: '1',
            Listeners: '',
            TimeLeft: '1',
            Title: '',
            CurrentRotation: '',
            NextTrack: {
                Title: '',
                Artist: '',
            },
        },
    },
    playlist: [],
    scheduleList: [],
    recentRequests: [],
    loadingPlaylist: false,
    loadingScheduleList: false,
    loadingRecentRequests: false,
    loadingStatus: false,
};

export const radioStatusReducer = (
    state = initialRadioStatusState,
    action: RadioStatusAction
) => {
    switch (action.type) {
        case RADIO_STATUS_FETCH:
            return {
                ...state,
                loadingStatus: true,
                timestampStatus: Math.floor(Date.now() / 1000),
            };
        case RADIO_STATUS_DATA:
            return {
                ...state,
                loadingStatus: false,
                status: {
                    now_playing: {
                        ...action.payload.now_playing,
                        Artwork:
                            action.payload.now_playing.Artwork.length == 0 &&
                            state.status.now_playing.Artwork.length > 0 &&
                            action.payload.now_playing.Artist ==
                                state.status.now_playing.Artist &&
                            action.payload.now_playing.Title ==
                                state.status.now_playing.Title
                                ? state.status.now_playing.Artwork
                                : action.payload.now_playing.Artwork,
                    },
                },
                timestampStatusData: action.payload.now_playing.event_timestamp,
            };
        case RADIO_STATUS_ERROR:
            return {
                ...state,
                loadingStatus: false,
            };
        case RADIO_PLAYLIST_FETCH:
            return {
                ...state,
                loadingPlaylist: true,
                timestampPlaylist: Math.floor(Date.now() / 1000),
            };
        case RADIO_PLAYLIST_DATA:
            return {
                ...state,
                loadingPlaylist: false,
                playlist: action.payload.playlist,
                timestampPlaylistData: Math.floor(Date.now() / 1000),
            };
        case RADIO_PLAYLIST_ERROR:
            return {
                ...state,
                loadingPlaylist: false,
            };
        case RADIO_SCHEDULE_FETCH:
            return {
                ...state,
                loadingScheduleList: true,
                timestampScheduleList: Math.floor(Date.now() / 1000),
            };
        case RADIO_SCHEDULE_DATA:
            return {
                ...state,
                loadingScheduleList: false,
                scheduleList: action.payload.schedulelist,
                timestampScheduleListData: Math.floor(Date.now() / 1000),
            };
        case RADIO_SCHEDULE_ERROR:
            return {
                ...state,
                loadingScheduleList: false,
            };
        case RADIO_RECENT_REQUESTS_FETCH:
            return {
                ...state,
                loadingRecentRequests: true,
                timestampRecentRequests: Math.floor(Date.now() / 1000),
            };
        case RADIO_RECENT_REQUESTS_DATA:
            return {
                ...state,
                loadingRecentRequests: false,
                recentRequests: action.payload.recent_requests,
                timestampRecentRequestsData: Math.floor(Date.now() / 1000),
            };
        case RADIO_RECENT_REQUESTS_ERROR:
            return {
                ...state,
                loadingRecentRequests: false,
            };
        default:
            return state;
    }
};
