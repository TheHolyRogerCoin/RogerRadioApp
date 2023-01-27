import { IonicNativePlugin } from '@ionic-native/core';
/**
 * @name RogerRadioPlayer
 * @description
 * Cordova plugin for RogerRadio Player.
 * Requires Cordova plugin: cordova-plugin-roger-radio-player.
 * @usage
 * ```typescript
 * import { RogerRadioPlayer } from '@ionic-native/roger-radio-player/ngx';
 *
 * constructor(private rogerRadioPlayer: RogerRadioPlayer) { }
 *
 * ...
 *
 * ```
 *
 */
export declare class RogerRadioPlayer extends IonicNativePlugin {
    /**
     * setCallbackStopped
     *
     * @param callback {function}
     *
     * @return {void}
     */
    setCallbackStopped(callback: (...args: any[]) => void): void;
    /**
     * setCallbackTasksEnable
     *
     * @param callback {function}
     *
     * @return {void}
     */
    setCallbackTasksEnable(callback: (...args: any[]) => void): void;
    /**
     * setCallbackTasksDisable
     *
     * @param callback {function}
     *
     * @return {void}
     */
    setCallbackTasksDisable(callback: (...args: any[]) => void): void;
    /**
     * playerLoad
     *
     * @param url {string}
     *
     * @return {void}
     */
    playerLoad(url: string): void;
    /**
     * playerReload
     *
     * @return {void}
     */
    playerReload(): void;
    /**
     * playerPlay
     *
     * @return {void}
     */
    playerPlay(): void;
    /**
     * playerStop
     *
     * @return {void}
     */
    playerStop(): void;
    /**
     * playerSetVolume
     *
     * @param vol {number}
     *
     * @return {void}
     */
    playerSetVolume(vol: number): void;
    /**
     * playerUnmute
     *
     * @return {void}
     */
    playerUnmute(): void;
    /**
     * playerMute
     *
     * @return {void}
     */
    playerMute(): void;
    /**
     * playerExit
     *
     * @return {void}
     */
    playerExit(): void;
    /**
     * updateMetadata
     *
     * @param artist {string}
     * @param title {string}
     *
     * @return {void}
     */
    updateMetadata(artist: string, title: string): void;
    /**
     * controlsDestroy
     *
     * @return {void}
     */
    controlsDestroy(): void;
    /**
     * controlsSubscribe
     *
     * @return {void}
     */
    controlsSubscribe(): void;
    /**
     * controlsCreate
     *
     * @return {void}
     */
    controlsCreate(): void;
}
