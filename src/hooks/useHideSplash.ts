import { SplashScreen } from '@capacitor/splash-screen';
import * as React from 'react';

export const useHideSplash = () => {
    const isSet = React.useRef(false);

    React.useEffect(() => {
        if (isSet.current) {
            return;
        }
        isSet.current = true;
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
    }, []);
};
