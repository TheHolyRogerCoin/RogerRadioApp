import { Config } from './types';

export const defaultConfig: Config = {
    radioApiKey: '',
    radioUrl: '',
    streamUrl: '',
    websocketsUrl: '',
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
RadioPortalConfig.config = { ...defaultConfig, ...window.env };

export const radioApiKey = () => RadioPortalConfig.config.radioApiKey;
export const radioUrl = () => RadioPortalConfig.config.radioUrl;
export const streamUrl = () => RadioPortalConfig.config.streamUrl;
export const websocketsUrl = () => RadioPortalConfig.config.websocketsUrl;
export const msAlertDisplayTime = () => RadioPortalConfig.config.msAlertDisplayTime;
