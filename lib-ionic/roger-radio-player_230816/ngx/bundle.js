'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var RogerRadioPlayer = /** @class */ (function (_super) {
    tslib.__extends(RogerRadioPlayer, _super);
    function RogerRadioPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RogerRadioPlayer.prototype.setCallbackStopped = function (callback) { return core.cordova(this, "setCallbackStopped", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.setCallbackTasksEnable = function (callback) { return core.cordova(this, "setCallbackTasksEnable", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.setCallbackTasksDisable = function (callback) { return core.cordova(this, "setCallbackTasksDisable", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.clearCachedStreamUrl = function () { return core.cordova(this, "clearCachedStreamUrl", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerLoad = function (url) { return core.cordova(this, "playerLoad", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerReload = function () { return core.cordova(this, "playerReload", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerPlay = function () { return core.cordova(this, "playerPlay", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerStop = function () { return core.cordova(this, "playerStop", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerSetVolume = function (vol) { return core.cordova(this, "playerSetVolume", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerUnmute = function () { return core.cordova(this, "playerUnmute", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerMute = function () { return core.cordova(this, "playerMute", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.playerExit = function () { return core.cordova(this, "playerExit", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.updateMetadata = function (artist, title) { return core.cordova(this, "updateMetadata", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.controlsDestroy = function () { return core.cordova(this, "controlsDestroy", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.controlsSubscribe = function () { return core.cordova(this, "controlsSubscribe", { "sync": true }, arguments); };
    RogerRadioPlayer.prototype.controlsCreate = function () { return core.cordova(this, "controlsCreate", { "sync": true }, arguments); };
    RogerRadioPlayer.pluginName = "RogerRadioPlayer";
    RogerRadioPlayer.plugin = "cordova-plugin-roger-radio-player";
    RogerRadioPlayer.pluginRef = "cordova.plugins.rogerRadioPlayer";
    RogerRadioPlayer.repo = "https://github.com/TheHolyRogerCoin/RogerRadioApp";
    RogerRadioPlayer.platforms = ["Android"];
    RogerRadioPlayer.decorators = [
        { type: core$1.Injectable }
    ];
    return RogerRadioPlayer;
}(core.IonicNativePlugin));

exports.RogerRadioPlayer = RogerRadioPlayer;
