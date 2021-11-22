import * as React from 'react';
import { useDispatch } from 'react-redux';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { playerStop } from '../modules/player';

export const useDeviceReady = () => {
    const dispatch = useDispatch();

    const isSet = React.useRef(false);

    const onDvcRdy = React.useCallback(
        (e) => {
            document.removeEventListener('deviceready', onDvcRdy, false);
            window.console.log(`Device ready. - ${e} - ${e?.currentTarget}`);
            // window.console.log(LocalNotifications);
            // window.console.log((LocalNotifications as any).launchDetails);
            LocalNotifications.addActions('radioStopGrp', [{ id: 'radioStop', title: 'Stop' }]);

            LocalNotifications.on('radioStop').subscribe((notification) => {
                dispatch(playerStop());
            });

            LocalNotifications.fireQueuedEvents();
            BackgroundMode.setDefaults({ silent: true });
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
