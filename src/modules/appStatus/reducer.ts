import { APP_TASKS_DISABLE } from './constants';
import { AppStatusAction } from './actions';

export interface AppStatusState {
    tasks_disabled: boolean;
}

export const initialAppStatusState: AppStatusState = { tasks_disabled: false };

export const appStatusReducer = (
    state = initialAppStatusState,
    action: AppStatusAction
) => {
    switch (action.type) {
        case APP_TASKS_DISABLE:
            return {
                ...state,
                tasks_disabled: action.disabled,
            };
        default:
            return state;
    }
};
