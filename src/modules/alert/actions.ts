import {
    ALERT_DATA,
    ALERT_DELETE,
    ALERT_DELETE_BY_INDEX,
    ALERTS_DISABLE,
    ALERT_PUSH,
} from './constants';

export interface Alert {
    type: string;
    code?: number;
    message: string[] | string;
    display_ms?: string;
    receive_timestamp?: number;
}

export interface AlertPush {
    type: typeof ALERT_PUSH;
    payload: Alert;
}

export interface AlertData {
    type: typeof ALERT_DATA;
    payload: Alert;
}

export interface AlertDelete {
    type: typeof ALERT_DELETE;
    payload: Alert;
}

export interface AlertDeleteByIndex {
    type: typeof ALERT_DELETE_BY_INDEX;
    index: number;
}

export interface AlertsDisable {
    type: typeof ALERTS_DISABLE;
    disabled: boolean;
}

export type AlertAction =
    | AlertPush
    | AlertData
    | AlertDelete
    | AlertDeleteByIndex
    | AlertsDisable;

export const alertPush = (payload: AlertPush['payload']): AlertPush => ({
    type: ALERT_PUSH,
    payload,
});

export const alertData = (payload: AlertData['payload']): AlertData => ({
    type: ALERT_DATA,
    payload,
});

export const alertDelete = (payload: AlertDelete['payload']): AlertDelete => ({
    type: ALERT_DELETE,
    payload,
});

export const alertDeleteByIndex = (index: number): AlertDeleteByIndex => ({
    type: ALERT_DELETE_BY_INDEX,
    index,
});

export const alertsDisable = (disabled: boolean): AlertsDisable => ({
    type: ALERTS_DISABLE,
    disabled,
});
