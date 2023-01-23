'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var RogerradioAuto = /** @class */ (function (_super) {
    tslib.__extends(RogerradioAuto, _super);
    function RogerradioAuto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RogerradioAuto.prototype.setMediaItems = function (mediaItems) { return core.cordova(this, "setMediaItems", { "sync": true }, arguments); };
    RogerradioAuto.pluginName = "RogerradioAuto";
    RogerradioAuto.plugin = "cordova-plugin-rogerradio-auto";
    RogerradioAuto.pluginRef = "cordova.plugins.rogerradioAuto";
    RogerradioAuto.repo = "https://github.com/TheHolyRogerCoin/RogerRadioApp";
    RogerradioAuto.platforms = ["Android"];
    RogerradioAuto.decorators = [
        { type: core$1.Injectable }
    ];
    return RogerradioAuto;
}(core.IonicNativePlugin));

exports.RogerradioAuto = RogerradioAuto;
