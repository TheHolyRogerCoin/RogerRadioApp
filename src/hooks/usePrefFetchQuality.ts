import { useState, useEffect } from 'react';
import { getQuality, quality_mp3_max } from '../helpers/preferences';

export const usePrefFetchQuality = () => {
    const [playerQuality, setPlayerQuality] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!playerQuality) {
            getQuality()
                .then((sUrl) => {
                    setPlayerQuality(sUrl);
                })
                .catch((err) => {
                    setPlayerQuality(quality_mp3_max);
                });
        }
    }, [playerQuality]);

    return playerQuality || quality_mp3_max;
};
