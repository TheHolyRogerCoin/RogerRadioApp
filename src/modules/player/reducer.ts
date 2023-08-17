import {
    PLAYER_CLEAR_RELOAD,
    PLAYER_PLAY_TOGGLE,
    PLAYER_MUTE_TOGGLE,
    PLAYER_RELOAD,
    PLAYER_SET_URL,
    PLAYER_SET_VOLUME,
    PLAYER_STOP,
} from './constants';
import { PlayerAction } from './actions';

export interface PlayerState {
    reload: boolean;
    playing: boolean;
    muted: boolean;
    volume: number;
    url?: string;
}

export const initialPlayerState: PlayerState = {
    reload: false,
    playing: false,
    muted: false,
    volume: 1.0,
    url: undefined,
};

export const playerReducer = (
    state = initialPlayerState,
    action: PlayerAction
) => {
    switch (action.type) {
        case PLAYER_CLEAR_RELOAD:
            return {
                ...state,
                reload: false,
            };
        case PLAYER_RELOAD:
            return {
                ...state,
                reload: true,
            };
        case PLAYER_STOP:
            return {
                ...state,
                playing: false,
            };
        case PLAYER_PLAY_TOGGLE:
            return {
                ...state,
                playing: !state.playing,
            };
        case PLAYER_MUTE_TOGGLE:
            return {
                ...state,
                muted: !state.muted,
            };
        case PLAYER_SET_VOLUME:
            return {
                ...state,
                volume: action.payload,
            };
        case PLAYER_SET_URL:
            return {
                ...state,
                url: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
