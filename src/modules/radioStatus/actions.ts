import {
    RADIO_STATUS_DATA,
    RADIO_STATUS_ERROR,
    RADIO_STATUS_FETCH,
} from './constants';
import { RadioStatusInfo } from './types';

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

export type RadioStatusAction =
    | RadioStatusFetch
    | RadioStatusData
    | RadioStatusError;

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
