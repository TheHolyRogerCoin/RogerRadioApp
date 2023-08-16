import { Preferences } from '@capacitor/preferences';

const pref_key_quality = 'quality';

export const quality_mp3_max = 'mp3_max';
export const quality_mp3_med = 'mp3_med';

const getValidQuality = (input: string | null | undefined) => {
    switch (input) {
        case quality_mp3_max:
            return quality_mp3_max;
        case quality_mp3_med:
            return quality_mp3_med;
        default:
            return quality_mp3_max;
    }
};

export const setQuality = async (newQuality: string) => {
    await Preferences.set({
        key: pref_key_quality,
        value: getValidQuality(newQuality),
    });
};

export const getQuality = async (): Promise<string> => {
    const { value } = await Preferences.get({ key: pref_key_quality });

    const allowedValue = getValidQuality(value);

    if (value != allowedValue) {
        await setQuality(allowedValue);
    }

    return allowedValue;
};
