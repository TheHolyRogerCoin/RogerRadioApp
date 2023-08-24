export const buildQueryString = (action: any, remove?: string[]) =>
    Object.entries(action)
        .filter((w) => w[1] !== '' && (!remove || !remove.includes(w[0])))
        .map((k: any) => `${k[0]}=${encodeURIComponent(k[1])}`)
        .join('&');
