const getBase64ImageFormat = (image: string) => {
    switch (image.charAt(0)) {
        case '/':
            return 'jpeg';
        case 'i':
            return 'png';
        case 'R':
            return 'gif';
        case 'U':
            return 'webp';
        default:
            return 'png';
    }
};

export const getBase64ImageString = (image: string) => {
    const imFmt = getBase64ImageFormat(image);
    return `data:image/${imFmt};base64,${image}`;
};
