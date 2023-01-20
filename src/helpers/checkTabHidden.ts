export const getBrowserVisibilityProp = () => {
    if (typeof document.hidden !== 'undefined') {
        // Opera 12.10 and Firefox 18 and later support
        return 'visibilitychange';
    } else if (typeof (document as any).msHidden !== 'undefined') {
        return 'msvisibilitychange';
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
        return 'webkitvisibilitychange';
    } else {
        return null;
    }
};

const getBrowserDocumentHiddenProp = () => {
    if (typeof document.hidden !== 'undefined') {
        return 'hidden';
    } else if (typeof (document as any).msHidden !== 'undefined') {
        return 'msHidden';
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
        return 'webkitHidden';
    } else {
        return null;
    }
};

export const getIsDocumentVisible = () => {
    const hiddenProp = getBrowserDocumentHiddenProp();
    return hiddenProp ? !document[hiddenProp] : false;
};
