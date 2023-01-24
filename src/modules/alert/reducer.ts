import { msAlertDisplayTime } from '../../api/config';
import {
    ALERT_DATA,
    ALERT_DELETE,
    ALERT_DELETE_BY_INDEX,
    ALERTS_DISABLE,
} from './constants';
import { Alert, AlertAction } from './actions';
import { filterByReceiveTime } from './helpers';

export interface AlertState {
    alerts: Alert[];
    disabled: boolean;
}

export const initialAlertState: AlertState = { alerts: [], disabled: false };

export const alertReducer = (
    state = initialAlertState,
    action: AlertAction
) => {
    switch (action.type) {
        case ALERT_DATA:
            return {
                ...state,
                alerts: filterByReceiveTime(
                    state.disabled
                        ? [...state.alerts]
                        : [...state.alerts, action.payload],
                    parseFloat(msAlertDisplayTime())
                ),
            };
        case ALERT_DELETE:
            return {
                ...state,
                alerts: filterByReceiveTime(
                    [...state.alerts].filter(
                        (alert) =>
                            JSON.stringify(alert) !=
                            JSON.stringify(action.payload)
                    ),
                    parseFloat(msAlertDisplayTime())
                ),
            };
        case ALERT_DELETE_BY_INDEX:
            return {
                ...state,
                alerts: filterByReceiveTime(
                    [
                        ...state.alerts
                            .slice(0, action.index)
                            .concat(...state.alerts.slice(action.index + 1)),
                    ],
                    parseFloat(msAlertDisplayTime())
                ),
            };
        case ALERTS_DISABLE:
            return {
                ...state,
                disabled: action.disabled,
            };
        default:
            return state;
    }
};
