import { streamUrlMp3Max, streamUrlMp3Med } from '../api';
import { getQuality, quality_mp3_max, quality_mp3_med } from './preferences';

export const getPlayerStreamUrl = async (): Promise<string> => {
    const player_quality = await getQuality();
    switch (player_quality) {
        case quality_mp3_max:
            return streamUrlMp3Max();
        case quality_mp3_med:
            return streamUrlMp3Med();
        default:
            return streamUrlMp3Max();
    }
};
