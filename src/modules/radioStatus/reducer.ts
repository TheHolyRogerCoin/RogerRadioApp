import { CommonState } from '../types';
import { RadioStatusAction } from './actions';
import {
    RADIO_STATUS_DATA,
    RADIO_STATUS_ERROR,
    RADIO_STATUS_FETCH,
} from './constants';
import { RadioStatusInfo } from './types';

export interface RadioStatusState extends CommonState {
    status: RadioStatusInfo;
    loading: boolean;
    timestamp?: number;
    timestampData?: number;
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
        },
    },
    loading: false,
};

export const radioStatusReducer = (
    state = initialRadioStatusState,
    action: RadioStatusAction
) => {
    switch (action.type) {
        case RADIO_STATUS_FETCH:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case RADIO_STATUS_DATA:
            return {
                ...state,
                loading: false,
                status: action.payload,
                timestampData: Math.floor(Date.now() / 1000),
            };
        case RADIO_STATUS_ERROR:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
