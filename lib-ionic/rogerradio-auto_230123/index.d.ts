import { IonicNativePlugin } from '@ionic-native/core';
/**
 * Configurations items that can be updated.
 */
export interface CarplayAndroidAutoMediaItem {
    id: string;
    itemKey: string;
    title: string;
    subtitle: string;
    isContainer: boolean;
    isPlayable: boolean;
    artworkUrl: string;
}
/**
 * @name RogerradioAuto
 * @description
 * Cordova plugin for RogerRadio android auto.
 * Requires Cordova plugin: cordova-plugin-rogerradio-auto.
 * @usage
 * ```typescript
 * import { RogerradioAuto } from '@ionic-native/rogerradio-auto/ngx';
 *
 * constructor(private rogerradioAuto: RogerradioAuto) { }
 *
 * ...
 *
 * this.rogerradioAuto.setMediaItems(...);
 * ```
 *
 */
export declare class RogerradioAutoOriginal extends IonicNativePlugin {
    /**
     * setMediaItems
     *
     * @param mediaItems {CarplayAndroidAutoMediaItem[]}
     *
     * @return {void}
     */
    setMediaItems(mediaItems: CarplayAndroidAutoMediaItem[]): void;
}

export declare const RogerradioAuto: RogerradioAutoOriginal;