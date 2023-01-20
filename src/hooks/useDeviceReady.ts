import * as React from 'react';
import { BackgroundMode } from '@ionic-native/background-mode';

export const useDeviceReady = () => {
    const isSet = React.useRef(false);

    const onDvcRdy = React.useCallback((e) => {
        document.removeEventListener('deviceready', onDvcRdy, false);
        window.console.log(`Device ready. - ${e} - ${e?.currentTarget}`);
        BackgroundMode && BackgroundMode.setDefaults({ silent: true });
        BackgroundMode && BackgroundMode.disableBatteryOptimizations();
        BackgroundMode && BackgroundMode.requestForegroundPermission();
        BackgroundMode &&
            BackgroundMode.on('activate').subscribe((action) => {
                try {
                    BackgroundMode.disableWebViewOptimizations();
                } catch (e: any) {
                    window.console.log(`Unable to diable webview optimisations - ${e}`);
                }
            });
    }, []);

    React.useEffect(() => {
        if (isSet.current) {
            return;
        }
        isSet.current = true;
        document.addEventListener('deviceready', onDvcRdy, false);
    }, [onDvcRdy]);
};
