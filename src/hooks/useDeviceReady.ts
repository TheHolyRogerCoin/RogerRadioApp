import * as React from 'react';
import { useDispatch } from 'react-redux';
import { BackgroundMode } from '@ionic-native/background-mode';
import { alertsDisable } from '../modules/alert';

export const useDeviceReady = () => {
    const dispatch = useDispatch();

    const isSet = React.useRef(false);

    const onDvcRdy = React.useCallback(
        (e: Event) => {
            document.removeEventListener('deviceready', onDvcRdy, false);
            // window.console.log(`Device ready event: ${e}`);
            // if (e) {
            //     window.console.log(`Device ready target: ${e.currentTarget}`);
            // }
            BackgroundMode && BackgroundMode.setDefaults({ silent: true });
            BackgroundMode && BackgroundMode.disableBatteryOptimizations();
            BackgroundMode && BackgroundMode.requestForegroundPermission();
            BackgroundMode &&
                BackgroundMode.on('activate').subscribe((action) => {
                    window.console.log(`Disabling alerts`);
                    dispatch(alertsDisable(true));
                    try {
                        BackgroundMode.disableWebViewOptimizations();
                    } catch (e: any) {
                        window.console.log(`Unable to diable webview optimisations - ${e}`);
                    }
                });
            BackgroundMode &&
                BackgroundMode.on('deactivate').subscribe((action) => {
                    window.console.log(`Enabling alerts`);
                    dispatch(alertsDisable(false));
                });
        },
        [dispatch]
    );

    React.useEffect(() => {
        if (isSet.current) {
            return;
        }
        isSet.current = true;
        document.addEventListener('deviceready', onDvcRdy, false);
    }, [onDvcRdy]);
};
