import { Preferences } from '@capacitor/preferences';

const pref_key_quality = 'quality';
const pref_key_voucher_tokens = 'voucher_tokens';

export const quality_mp3_max = 'mp3_max';
export const quality_mp3_med = 'mp3_med';
export const quality_mp3_trash = 'mp3_trash';

const getValidQuality = (input: string | null | undefined) => {
    switch (input) {
        case quality_mp3_max:
            return quality_mp3_max;
        case quality_mp3_med:
            return quality_mp3_med;
        case quality_mp3_trash:
            return quality_mp3_trash;
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

export const setVoucherTokens = async (newTokens: string[]) => {
    await Preferences.set({
        key: pref_key_voucher_tokens,
        value: JSON.stringify(newTokens),
    });
};

export const getVoucherTokens = async (): Promise<string[]> => {
    const { value } = await Preferences.get({ key: pref_key_voucher_tokens });

    return value ? JSON.parse(value) : [];
};

export const addVoucherToken = async (newToken: string) => {
    const currentTokens = await getVoucherTokens();
    const newTokens = [...currentTokens, newToken].filter((value, index, array) => {
        return array.indexOf(value) === index;
    });
    await Preferences.set({
        key: pref_key_voucher_tokens,
        value: JSON.stringify(newTokens),
    });
};
