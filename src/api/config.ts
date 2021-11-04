import { Config } from './types';

export const defaultConfig: Config = {
    radioUrl: '',
    streamUrl: '',
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
