import { Config } from './types';

export const defaultConfig: Config = {
    radioApiKey: '',
    radioUrl: '',
    streamUrlMp3Max: '',
    streamUrlMp3Med: '',
    streamUrlMp3Trash: '',
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
export const streamUrlMp3Max = () => RadioPortalConfig.config.streamUrlMp3Max;
export const streamUrlMp3Med = () => RadioPortalConfig.config.streamUrlMp3Med;
export const streamUrlMp3Trash = () => RadioPortalConfig.config.streamUrlMp3Trash;
export const websocketsUrl = () => RadioPortalConfig.config.websocketsUrl;
export const msAlertDisplayTime = () => RadioPortalConfig.config.msAlertDisplayTime;
