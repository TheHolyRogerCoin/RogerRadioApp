import { CommonState } from '../types';
import { RadioStatusAction } from './actions';
import {
    RADIO_STATUS_DATA,
    RADIO_STATUS_ERROR,
    RADIO_STATUS_FETCH,
    RADIO_PLAYLIST_DATA,
    RADIO_PLAYLIST_ERROR,
    RADIO_PLAYLIST_FETCH,
} from './constants';
import { RadioStatusInfo, RadioPlaylistInfo } from './types';

export interface RadioStatusState extends CommonState {
    status: RadioStatusInfo;
    playlist: RadioPlaylistInfo['playlist'];
    loadingStatus: boolean;
    timestampStatus?: number;
    timestampStatusData?: number;
    loadingPlaylist: boolean;
    timestampPlaylist?: number;
    timestampPlaylistData?: number;
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
    loadingPlaylist: false,
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
                timestampStatusData: Math.floor(Date.now() / 1000),
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
        default:
            return state;
    }
};
