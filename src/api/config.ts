import { Config } from './types';

export const defaultConfig: Config = {
    radioUrl: '',
    streamUrl: '',
    msAlertDisplayTime: '5000',
};

export const RadioPortalConfig = {
    config: defaultConfig,
};

declare global {
    interface Window {
        env: Config;
    }
}

window.env = window.env || defaultConfig;
RadioPortalConfig.config = { ...window.env };

export const radioUrl = () => RadioPortalConfig.config.radioUrl;
export const streamUrl = () => RadioPortalConfig.config.streamUrl;
export const msAlertDisplayTime = () => RadioPortalConfig.config.msAlertDisplayTime;
