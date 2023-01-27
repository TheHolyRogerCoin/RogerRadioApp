import { APP_TASKS_DISABLE } from './constants';

export interface AppTasksDisable {
    type: typeof APP_TASKS_DISABLE;
    disabled: boolean;
}

export type AppStatusAction = AppTasksDisable;

export const appTasksDisable = (disabled: boolean): AppTasksDisable => ({
    type: APP_TASKS_DISABLE,
    disabled,
});
