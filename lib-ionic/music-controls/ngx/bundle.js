'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');
require('rxjs');

var MusicControls = /** @class */ (function (_super) {
    tslib.__extends(MusicControls, _super);
    function MusicControls() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MusicControls.prototype.create = function (options) { return core.cordova(this, "create", {}, arguments); };
    MusicControls.prototype.destroy = function () { return core.cordova(this, "destroy", {}, arguments); };
    MusicControls.prototype.subscribe = function () { return core.cordova(this, "subscribe", { "observable": true }, arguments); };
    MusicControls.prototype.listen = function () { return core.cordova(this, "listen", { "sync": true }, arguments); };
    MusicControls.prototype.updateIsPlaying = function (isPlaying) { return core.cordova(this, "updateIsPlaying", {}, arguments); };
    MusicControls.prototype.updateElapsed = function (args) { return core.cordova(this, "updateElapsed", { "platforms": ["iOS"] }, arguments); };
    MusicControls.prototype.updateDismissable = function (dismissable) { return core.cordova(this, "updateDismissable", {}, arguments); };
    MusicControls.pluginName = "MusicControls";
    MusicControls.plugin = "cordova-plugin-music-controls2";
    MusicControls.pluginRef = "MusicControls";
    MusicControls.repo = "https://github.com/ghenry22/cordova-plugin-music-controls2";
    MusicControls.platforms = ["Android", "iOS", "Windows"];
    MusicControls.decorators = [
        { type: core$1.Injectable }
    ];
    return MusicControls;
}(core.IonicNativePlugin));

exports.MusicControls = MusicControls;
