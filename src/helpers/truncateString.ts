export const truncateString = (in_str: string, max_length = -1) => {
    if (max_length >= 0 && in_str && in_str.length > max_length) {
        return in_str.substring(0, max_length - 2) + '...';
    }
    return in_str;
};
