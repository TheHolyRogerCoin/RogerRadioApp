import * as React from 'react';

interface ImgProps {
    src: string;
    errSrc: string;
    alt: string;
    className: string;
}

const ImgFallbackComp: React.FC<ImgProps> = ({ src, errSrc, alt, className }) => {
    const [imgErrored, setImgErrored] = React.useState(false);

    const onImgError = React.useCallback(() => {
        setImgErrored(true);
    }, []);

    return !imgErrored ? (
        <img src={src} onError={onImgError} alt={alt} className={className} />
    ) : (
        <img src={errSrc} alt={alt} className={className} />
    );
};

export const ImgWithFallback = React.memo(ImgFallbackComp);
