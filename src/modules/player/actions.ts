import {
    PLAYER_CLEAR_RELOAD,
    PLAYER_PLAY_TOGGLE,
    PLAYER_MUTE_TOGGLE,
    PLAYER_RELOAD,
    PLAYER_SET_URL,
    PLAYER_SET_VOLUME,
    PLAYER_STOP,
} from './constants';

export interface PlayerClearReload {
    type: typeof PLAYER_CLEAR_RELOAD;
}

export interface PlayerReload {
    type: typeof PLAYER_RELOAD;
}

export interface PlayerStop {
    type: typeof PLAYER_STOP;
}

export interface PlayerTogglePlay {
    type: typeof PLAYER_PLAY_TOGGLE;
}

export interface PlayerToggleMute {
    type: typeof PLAYER_MUTE_TOGGLE;
}

export interface PlayerSetUrl {
    type: typeof PLAYER_SET_URL;
    payload: string | undefined;
}

export interface PlayerSetVolume {
    type: typeof PLAYER_SET_VOLUME;
    payload: number;
}

export type PlayerAction =
    | PlayerClearReload
    | PlayerReload
    | PlayerStop
    | PlayerTogglePlay
    | PlayerToggleMute
    | PlayerSetUrl
    | PlayerSetVolume;

export const playerClearReload = (): PlayerClearReload => ({
    type: PLAYER_CLEAR_RELOAD,
});

export const playerReload = (): PlayerReload => ({
    type: PLAYER_RELOAD,
});

export const playerStop = (): PlayerStop => ({
    type: PLAYER_STOP,
});

export const playerTogglePlay = (): PlayerTogglePlay => ({
    type: PLAYER_PLAY_TOGGLE,
});

export const playerToggleMute = (): PlayerToggleMute => ({
    type: PLAYER_MUTE_TOGGLE,
});

export const playerSetUrl = (
    payload: PlayerSetUrl['payload']
): PlayerSetUrl => ({
    type: PLAYER_SET_URL,
    payload,
});

export const playerSetVolume = (
    payload: PlayerSetVolume['payload']
): PlayerSetVolume => ({
    type: PLAYER_SET_VOLUME,
    payload,
});
