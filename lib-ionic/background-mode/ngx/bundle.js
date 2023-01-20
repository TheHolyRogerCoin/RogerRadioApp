'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');
require('rxjs');

var BackgroundMode = /** @class */ (function (_super) {
    tslib.__extends(BackgroundMode, _super);
    function BackgroundMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackgroundMode.prototype.enable = function () { return core.cordova(this, "enable", { "sync": true }, arguments); };
    BackgroundMode.prototype.disable = function () { return core.cordova(this, "disable", { "sync": true }, arguments); };
    BackgroundMode.prototype.setEnabled = function (enable) { return core.cordova(this, "setEnabled", { "sync": true }, arguments); };
    BackgroundMode.prototype.fireEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return core.cordova(this, "fireEvent", { "sync": true }, arguments);
    };
    BackgroundMode.prototype.isEnabled = function () { return core.cordova(this, "isEnabled", { "sync": true }, arguments); };
    BackgroundMode.prototype.isActive = function () { return core.cordova(this, "isActive", { "sync": true }, arguments); };
    BackgroundMode.prototype.setDefaults = function (overrides) { return core.cordova(this, "setDefaults", { "platforms": ["Android"] }, arguments); };
    BackgroundMode.prototype.configure = function (options) { return core.cordova(this, "configure", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.on = function (event) { return core.cordova(this, "on", { "observable": true, "clearFunction": "un", "clearWithArgs": true }, arguments); };
    BackgroundMode.prototype.un = function (event, callback) { return core.cordova(this, "un", {}, arguments); };
    BackgroundMode.prototype.moveToBackground = function () { return core.cordova(this, "moveToBackground", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.disableWebViewOptimizations = function () { return core.cordova(this, "disableWebViewOptimizations", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.moveToForeground = function () { return core.cordova(this, "moveToForeground", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.overrideBackButton = function () { return core.cordova(this, "overrideBackButton", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.excludeFromTaskList = function () { return core.cordova(this, "excludeFromTaskList", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.isScreenOff = function (fn) { return core.cordova(this, "isScreenOff", { "platforms": ["Android"] }, arguments); };
    BackgroundMode.prototype.wakeUp = function () { return core.cordova(this, "wakeUp", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.unlock = function () { return core.cordova(this, "unlock", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.disableBatteryOptimizations = function () { return core.cordova(this, "disableBatteryOptimizations", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.prototype.requestForegroundPermission = function () { return core.cordova(this, "requestForegroundPermission", { "platforms": ["Android"], "sync": true }, arguments); };
    BackgroundMode.pluginName = "BackgroundMode";
    BackgroundMode.plugin = "cordova-plugin-background-mode";
    BackgroundMode.pluginRef = "cordova.plugins.backgroundMode";
    BackgroundMode.repo = "https://github.com/katzer/cordova-plugin-background-mode";
    BackgroundMode.platforms = ["AmazonFire OS", "Android", "Browser", "iOS", "Windows"];
    BackgroundMode.decorators = [
        { type: core$1.Injectable }
    ];
    return BackgroundMode;
}(core.IonicNativePlugin));

exports.BackgroundMode = BackgroundMode;
