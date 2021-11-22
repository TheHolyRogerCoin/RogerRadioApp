import * as React from 'react';
import { BackgroundMode } from '@ionic-native/background-mode';

export const useDeviceReady = () => {
    const isSet = React.useRef(false);

    const onDvcRdy = React.useCallback((e) => {
        document.removeEventListener('deviceready', onDvcRdy, false);
        window.console.log(`Device ready. - ${e} - ${e?.currentTarget}`);
        BackgroundMode.setDefaults({ silent: true });
    }, []);

    React.useEffect(() => {
        if (isSet.current) {
            return;
        }
        isSet.current = true;
        document.addEventListener('deviceready', onDvcRdy, false);
    }, [onDvcRdy]);
};
