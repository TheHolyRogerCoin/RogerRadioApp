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
} from './constants';
import { RadioStatusInfo, RadioPlaylistInfo, ScheduleEvent } from './types';

export interface RadioStatusState extends CommonState {
    status: RadioStatusInfo;
    playlist: RadioPlaylistInfo['playlist'];
    scheduleList: ScheduleEvent[];
    loadingStatus: boolean;
    timestampStatus?: number;
    timestampStatusData?: number;
    loadingPlaylist: boolean;
    timestampPlaylist?: number;
    timestampPlaylistData?: number;
    loadingScheduleList: boolean;
    timestampScheduleList?: number;
    timestampScheduleListData?: number;
}

export const initialRadioStatusState: RadioStatusState = {
    status: {
        now_playing: {
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
    loadingPlaylist: false,
    loadingScheduleList: false,
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
                status: action.payload,
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
        default:
            return state;
    }
};
