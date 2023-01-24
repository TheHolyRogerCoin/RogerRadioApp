import { msAlertDisplayTime } from '../../api/config';
import { AppState } from '../';
import { Alert, AlertState } from './';
import { filterByReceiveTime } from './helpers';

export const selectAlertState = (state: AppState): AlertState => state.alert;
export const selectAlertsList = (state: AppState): Alert[] =>
    filterByReceiveTime(state.alert.alerts, parseFloat(msAlertDisplayTime()));
export const selectAlertsDisabled = (state: AppState): boolean =>
    state.alert.disabled;
