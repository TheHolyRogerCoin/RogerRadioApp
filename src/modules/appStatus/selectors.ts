import { AppState } from '../';

export const selectAppTasksDisabled = (state: AppState): boolean =>
    state.appStatus.tasks_disabled;
