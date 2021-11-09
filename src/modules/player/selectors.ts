import { AppState } from '../';
import { PlayerState } from './';

export const selectPlayerState = (state: AppState): PlayerState => state.player;

export const selectPlayerPlaying = (
    state: AppState
): PlayerState['playing'] => {
    return selectPlayerState(state).playing;
};

export const selectPlayerUrl = (state: AppState): PlayerState['url'] => {
    return selectPlayerState(state).url;
};

export const selectPlayerMuted = (state: AppState): PlayerState['muted'] => {
    return selectPlayerState(state).muted;
};

export const selectPlayerVolume = (state: AppState): PlayerState['volume'] => {
    return selectPlayerState(state).volume;
};
