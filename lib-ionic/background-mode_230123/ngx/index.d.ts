import { IonicNativePlugin } from '@ionic-native/core';
import { Observable } from 'rxjs';
/**
 * Configurations items that can be updated.
 */
export interface BackgroundModeConfiguration {
    /**
     * Title of the background task
     */
    title?: string;
    /**
     * Description of background task
     */
    text?: string;
    /**
     * This will look for `<icon name>.png` in platforms/android/res/drawable|mipmap
     */
    icon?: string;
    /**
     * Set the background color of the notification circle
     */
    color?: string;
    /**
     * By default the app will come to foreground when tapping on the notification. If false, plugin won't come to foreground when tapped.
     */
    resume?: boolean;
    /**
     * When set to false makes the notifications visible on lock screen (Android 5.0+)
     */
    hidden?: boolean;
    /** Big text */
    bigText?: boolean;
    /**
     * The text that scrolls itself on statusbar
     */
    ticker?: string;
    /**
     * if true plugin will not display a notification. Default is false.
     */
    silent?: boolean;
}
/**
 * @name Background Mode
 * @description
 * Cordova plugin to prevent the app from going to sleep while in background.
 * Requires Cordova plugin: cordova-plugin-background-mode. For more info about plugin, visit: https://github.com/katzer/cordova-plugin-background-mode
 * @usage
 * ```typescript
 * import { BackgroundMode } from '@ionic-native/background-mode/ngx';
 *
 * constructor(private backgroundMode: BackgroundMode) { }
 *
 * ...
 *
 * this.backgroundMode.enable();
 * ```
 *
 * @interfaces
 * BackgroundModeConfiguration
 */
export declare class BackgroundMode extends IonicNativePlugin {
    /**
     * Enable the background mode.
     * Once called, prevents the app from being paused while in background.
     */
    enable(): void;
    /**
     * Disable the background mode.
     * Once the background mode has been disabled, the app will be paused when in background.
     */
    disable(): void;
    /**
     * Enable or disable the background mode.
     *
     * @param enable {boolean} The status to set for.
     *
     * @return {void}
     */
    setEnabled(enable: boolean): void;
    /**
     * Fire event with given arguments.
     *
     * @param event {string} event The event's name.
     * @param args {array} The callback's arguments.
     *
     * @return {string}
     */
    fireEvent(event: string, ...args: any[]): string;
    /**
     * Checks if background mode is enabled or not.
     * @returns {boolean} returns a boolean that indicates if the background mode is enabled.
     */
    isEnabled(): boolean;
    /**
     * Can be used to get the information if the background mode is active.
     * @returns {boolean} returns a boolean that indicates if the background mode is active.
     */
    isActive(): boolean;
    /**
     * Overwrite the default settings.
     * Available only for Android platform.
     * @param overrides {BackgroundModeConfiguration} Dict of options to be overridden.
     * @returns {Promise<any>}
     */
    setDefaults(overrides?: BackgroundModeConfiguration): void;
    /**
     * Modify the displayed information.
     * Available only for Android platform.
     * @param {BackgroundModeConfiguration} [options] Any options you want to update. See table below.
     */
    configure(options?: BackgroundModeConfiguration): void;
    /**
     * Register callback for given event.
     * > Available events are `enable`, `disable`, `activate`, `deactivate` and `failure`.
     * @param event {string} Event name
     * @returns {Observable<any>}
     */
    on(event: string): Observable<any>;
    /**
     * Listen for events that the plugin fires. Available events are `enable`, `disable`, `activate`, `deactivate` and `failure`.
     * @param event {string} Event name
     * @param callback {function} The function to be exec as callback.
     * @returns {Observable<any>}
     */
    un(event: string, callback: (...args: any[]) => void): void;
    /**
     * Android allows to programmatically move from foreground to background.
     */
    moveToBackground(): void;
    /**
     * Enable GPS-tracking in background (Android).
     */
    disableWebViewOptimizations(): void;
    /**
     * Android allows to programmatically move from background to foreground.
     */
    moveToForeground(): void;
    /**
     * Override the back button on Android to go to background instead of closing the app.
     */
    overrideBackButton(): void;
    /**
     * Exclude the app from the recent task list. Works on Android 5.0+.
     */
    excludeFromTaskList(): void;
    /**
     * If the screen is off.
     * @param fn {function} Callback function to invoke with boolean arg.
     * @returns {Promise<boolean>}
     */
    isScreenOff(fn: (arg0: boolean) => void): void;
    /**
     * Turn screen on
     */
    wakeUp(): void;
    /**
     * Turn screen on and show app even locked
     */
    unlock(): void;
    /**
     * Disables battery optimazation mode for the app (android only)
     */
    disableBatteryOptimizations(): void;
    /**
     * Requests permission to "draw on top" which is necessary for the "moveToForeground" method in Android 10+
     */
    requestForegroundPermission(): void;
}
