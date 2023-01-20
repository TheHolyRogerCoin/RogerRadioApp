import { AppState } from '../';
import { AlertState } from './';

export const selectAlertState = (state: AppState): AlertState => state.alert;
export const selectAlertsDisabled = (state: AppState): boolean =>
    state.alert.disabled;
