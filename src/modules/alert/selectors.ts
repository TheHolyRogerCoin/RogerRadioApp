import { AppState } from '../';
import { AlertState } from './';

export const selectAlertState = (state: AppState): AlertState => state.alert;
