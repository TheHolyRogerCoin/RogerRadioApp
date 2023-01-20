import * as React from 'react';
import { getBrowserVisibilityProp, getIsDocumentVisible } from '../helpers/checkTabHidden';

export const usePageVisibility = () => {
    const [isVisible, setIsVisible] = React.useState(getIsDocumentVisible());

    const onVisibilityChange = React.useCallback(() => {
        setIsVisible(getIsDocumentVisible());
    }, []);

    const onVisibilityFocus = React.useCallback(() => {
        setIsVisible(true);
    }, []);

    const onVisibilityBlur = React.useCallback(() => {
        setIsVisible(false);
    }, []);

    React.useEffect(() => {
        const visibilityChange = getBrowserVisibilityProp();
        if (visibilityChange) {
            document.addEventListener(visibilityChange, onVisibilityChange, false);
        } else {
            document.addEventListener('focus', onVisibilityFocus, false);
            document.addEventListener('blur', onVisibilityBlur, false);
        }

        return () => {
            if (visibilityChange) {
                document.removeEventListener(visibilityChange, onVisibilityChange);
            } else {
                document.removeEventListener('focus', onVisibilityFocus);
                document.removeEventListener('blur', onVisibilityBlur);
            }
        };
    }, [onVisibilityChange, onVisibilityFocus, onVisibilityBlur]);

    return isVisible;
};
