import {
    ALERT_DATA,
    ALERT_DELETE,
    ALERT_DELETE_BY_INDEX,
    ALERTS_DISABLE,
} from './constants';
import { Alert, AlertAction } from './actions';

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
                alerts: state.disabled
                    ? [...state.alerts]
                    : [...state.alerts, action.payload],
            };
        case ALERT_DELETE:
            return {
                ...state,
                alerts: [...state.alerts.slice(1, state.alerts.length)],
            };
        case ALERT_DELETE_BY_INDEX:
            return {
                ...state,
                alerts: [
                    ...state.alerts
                        .slice(0, action.index)
                        .concat(...state.alerts.slice(action.index + 1)),
                ],
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
