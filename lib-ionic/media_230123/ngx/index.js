import { __extends } from "tslib";
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordovaInstance, instancePropertyGet, instancePropertySet, checkAvailability } from '@ionic-native/core';
import { Observable } from 'rxjs';
var MediaObject = /** @class */ (function () {
    function MediaObject(_objectInstance) {
        var _this = this;
        this._objectInstance = _objectInstance;
        this.onSuccess = new Observable(function (observer) {
            _this.successCallback = observer.next.bind(observer);
            return function () { return (_this.successCallback = function () { }); };
        });
        this.onError = new Observable(function (observer) {
            _this.errorCallback = observer.next.bind(observer);
            return function () { return (_this.errorCallback = function () { }); };
        });
        this.onStatusUpdate = new Observable(function (observer) {
            _this.statusCallback = observer.next.bind(observer);
            return function () { return (_this.statusCallback = function () { }); };
        });
        this.onInfoUpdate = new Observable(function (observer) {
            _this.infoCallback = observer.next.bind(observer);
            return function () { return (_this.infoCallback = function () { }); };
        });
    }
    MediaObject.prototype.getCurrentAmplitude = function () { return cordovaInstance(this, "getCurrentAmplitude", {}, arguments); };
    MediaObject.prototype.getCurrentPosition = function () { return cordovaInstance(this, "getCurrentPosition", {}, arguments); };
    MediaObject.prototype.getDuration = function () { return cordovaInstance(this, "getDuration", { "sync": true }, arguments); };
    MediaObject.prototype.play = function (iosOptions) { return cordovaInstance(this, "play", { "sync": true }, arguments); };
    MediaObject.prototype.playInBackground = function (iosOptions) { return cordovaInstance(this, "playInBackground", { "sync": true }, arguments); };
    MediaObject.prototype.pause = function () { return cordovaInstance(this, "pause", { "sync": true }, arguments); };
    MediaObject.prototype.release = function () { return cordovaInstance(this, "release", { "sync": true }, arguments); };
    MediaObject.prototype.seekTo = function (milliseconds) { return cordovaInstance(this, "seekTo", { "sync": true }, arguments); };
    MediaObject.prototype.setVolume = function (volume) { return cordovaInstance(this, "setVolume", { "sync": true }, arguments); };
    MediaObject.prototype.setRate = function (speedRate) { return cordovaInstance(this, "setRate", { "sync": true }, arguments); };
    MediaObject.prototype.startRecord = function () { return cordovaInstance(this, "startRecord", { "sync": true }, arguments); };
    MediaObject.prototype.stopRecord = function () { return cordovaInstance(this, "stopRecord", { "sync": true }, arguments); };
    MediaObject.prototype.pauseRecord = function () { return cordovaInstance(this, "pauseRecord", { "sync": true }, arguments); };
    MediaObject.prototype.resumeRecord = function () { return cordovaInstance(this, "resumeRecord", { "sync": true }, arguments); };
    MediaObject.prototype.stop = function () { return cordovaInstance(this, "stop", { "sync": true }, arguments); };
    Object.defineProperty(MediaObject.prototype, "successCallback", {
        get: function () { return instancePropertyGet(this, "successCallback"); },
        set: function (value) { instancePropertySet(this, "successCallback", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaObject.prototype, "errorCallback", {
        get: function () { return instancePropertyGet(this, "errorCallback"); },
        set: function (value) { instancePropertySet(this, "errorCallback", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaObject.prototype, "statusCallback", {
        get: function () { return instancePropertyGet(this, "statusCallback"); },
        set: function (value) { instancePropertySet(this, "statusCallback", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaObject.prototype, "infoCallback", {
        get: function () { return instancePropertyGet(this, "infoCallback"); },
        set: function (value) { instancePropertySet(this, "infoCallback", value); },
        enumerable: false,
        configurable: true
    });
    return MediaObject;
}());
export { MediaObject };
export var MEDIA_STATUS;
(function (MEDIA_STATUS) {
    MEDIA_STATUS[MEDIA_STATUS["NONE"] = 0] = "NONE";
    MEDIA_STATUS[MEDIA_STATUS["STARTING"] = 1] = "STARTING";
    MEDIA_STATUS[MEDIA_STATUS["RUNNING"] = 2] = "RUNNING";
    MEDIA_STATUS[MEDIA_STATUS["PAUSED"] = 3] = "PAUSED";
    MEDIA_STATUS[MEDIA_STATUS["STOPPED"] = 4] = "STOPPED";
})(MEDIA_STATUS || (MEDIA_STATUS = {}));
export var MEDIA_INFO;
(function (MEDIA_INFO) {
    MEDIA_INFO[MEDIA_INFO["BUFFERING_START"] = 0] = "BUFFERING_START";
    MEDIA_INFO[MEDIA_INFO["BUFFERING_END"] = 1] = "BUFFERING_END";
})(MEDIA_INFO || (MEDIA_INFO = {}));
export var MEDIA_ERROR;
(function (MEDIA_ERROR) {
    MEDIA_ERROR[MEDIA_ERROR["ABORTED"] = 1] = "ABORTED";
    MEDIA_ERROR[MEDIA_ERROR["NETWORK"] = 2] = "NETWORK";
    MEDIA_ERROR[MEDIA_ERROR["DECODE"] = 3] = "DECODE";
    MEDIA_ERROR[MEDIA_ERROR["SUPPORTED"] = 4] = "SUPPORTED";
})(MEDIA_ERROR || (MEDIA_ERROR = {}));
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Constants
        /**
         * @hidden
         */
        _this.MEDIA_NONE = 0;
        /**
         * @hidden
         */
        _this.MEDIA_STARTING = 1;
        /**
         * @hidden
         */
        _this.MEDIA_RUNNING = 2;
        /**
         * @hidden
         */
        _this.MEDIA_PAUSED = 3;
        /**
         * @hidden
         */
        _this.MEDIA_STOPPED = 4;
        // error codes
        /**
         * @hidden
         */
        _this.MEDIA_ERR_ABORTED = 1;
        /**
         * @hidden
         */
        _this.MEDIA_ERR_NETWORK = 2;
        /**
         * @hidden
         */
        _this.MEDIA_ERR_DECODE = 3;
        /**
         * @hidden
         */
        _this.MEDIA_ERR_NONE_SUPPORTED = 4;
        return _this;
    }
    /**
     * Open a media file
     * @param src {string} A URI containing the audio content.
     * @return {MediaObject}
     */
    Media.prototype.create = function (src) {
        var instance;
        if (checkAvailability(Media.getPluginRef(), null, Media.getPluginName()) === true) {
            // Creates a new media object
            instance = new (Media.getPlugin())(src);
        }
        return new MediaObject(instance);
    };
    Media.pluginName = "Media";
    Media.repo = "https://github.com/apache/cordova-plugin-media";
    Media.plugin = "cordova-plugin-media";
    Media.pluginRef = "Media";
    Media.platforms = ["Android", "Browser", "iOS", "Windows"];
    Media.decorators = [
        { type: Injectable }
    ];
    return Media;
}(IonicNativePlugin));
export { Media };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL21lZGlhL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLGdGQUFnRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JILE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7O0lBOEMxQyxxQkFBb0IsZUFBb0I7UUFBeEMsaUJBb0JDO1FBcEJtQixvQkFBZSxHQUFmLGVBQWUsQ0FBSztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFNLFVBQUMsUUFBdUI7WUFDM0QsS0FBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxPQUFPLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxlQUFlLEdBQUcsY0FBTyxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQWEsVUFBQyxRQUE4QjtZQUN2RSxLQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxjQUFPLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFVBQVUsQ0FBZSxVQUFDLFFBQWdDO1lBQ2xGLEtBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7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IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmFJbnN0YW5jZSwgSW5zdGFuY2VQcm9wZXJ0eSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiwgY2hlY2tBdmFpbGFiaWxpdHkgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBNZWRpYU9iamVjdCB7XG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgeW91IG9uIGFjdGlvbnMgc3VjY2Vzc1xuICAgKi9cbiAgb25TdWNjZXNzOiBPYnNlcnZhYmxlPGFueT47XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugd2hlbiBhbiBlcnJvciBvY2N1cnNcbiAgICovXG4gIG9uRXJyb3I6IE9ic2VydmFibGU8TWVkaWFFcnJvcj47XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugd2hlbiB0aGUgZmlsZSBzdGF0dXMgY2hhbmdlc1xuICAgKi9cbiAgb25TdGF0dXNVcGRhdGU6IE9ic2VydmFibGU8TUVESUFfU1RBVFVTPjtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSB3aGVuIHRoZSBmaWxlIHN0YXR1cyBjaGFuZ2VzXG4gICAqL1xuICBvbkluZm9VcGRhdGU6IE9ic2VydmFibGU8TUVESUFfSU5GTz47XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgc3VjY2Vzc0NhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEluc3RhbmNlUHJvcGVydHkoKSBlcnJvckNhbGxiYWNrOiBGdW5jdGlvbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgQEluc3RhbmNlUHJvcGVydHkoKSBzdGF0dXNDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgaW5mb0NhbGxiYWNrOiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vYmplY3RJbnN0YW5jZTogYW55KSB7XG4gICAgdGhpcy5vblN1Y2Nlc3MgPSBuZXcgT2JzZXJ2YWJsZTxhbnk+KChvYnNlcnZlcjogT2JzZXJ2ZXI8YW55PikgPT4ge1xuICAgICAgdGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpO1xuICAgICAgcmV0dXJuICgpID0+ICh0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9ICgpID0+IHt9KTtcbiAgICB9KTtcblxuICAgIHRoaXMub25FcnJvciA9IG5ldyBPYnNlcnZhYmxlPE1lZGlhRXJyb3I+KChvYnNlcnZlcjogT2JzZXJ2ZXI8TWVkaWFFcnJvcj4pID0+IHtcbiAgICAgIHRoaXMuZXJyb3JDYWxsYmFjayA9IG9ic2VydmVyLm5leHQuYmluZChvYnNlcnZlcik7XG4gICAgICByZXR1cm4gKCkgPT4gKHRoaXMuZXJyb3JDYWxsYmFjayA9ICgpID0+IHt9KTtcbiAgICB9KTtcblxuICAgIHRoaXMub25TdGF0dXNVcGRhdGUgPSBuZXcgT2JzZXJ2YWJsZTxNRURJQV9TVEFUVVM+KChvYnNlcnZlcjogT2JzZXJ2ZXI8TUVESUFfU1RBVFVTPikgPT4ge1xuICAgICAgdGhpcy5zdGF0dXNDYWxsYmFjayA9IG9ic2VydmVyLm5leHQuYmluZChvYnNlcnZlcik7XG4gICAgICByZXR1cm4gKCkgPT4gKHRoaXMuc3RhdHVzQ2FsbGJhY2sgPSAoKSA9PiB7fSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uSW5mb1VwZGF0ZSA9IG5ldyBPYnNlcnZhYmxlPE1FRElBX0lORk8+KChvYnNlcnZlcjogT2JzZXJ2ZXI8TUVESUFfSU5GTz4pID0+IHtcbiAgICAgIHRoaXMuaW5mb0NhbGxiYWNrID0gb2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyKTtcbiAgICAgIHJldHVybiAoKSA9PiAodGhpcy5pbmZvQ2FsbGJhY2sgPSAoKSA9PiB7fSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IGFtcGxpdHVkZSBvZiB0aGUgY3VycmVudCByZWNvcmRpbmcuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIGFtcGxpdHVkZSBvZiB0aGUgY3VycmVudCByZWNvcmRpbmdcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICBnZXRDdXJyZW50QW1wbGl0dWRlKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiB3aXRoaW4gYW4gYXVkaW8gZmlsZS4gQWxzbyB1cGRhdGVzIHRoZSBNZWRpYSBvYmplY3QncyBwb3NpdGlvbiBwYXJhbWV0ZXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSgpXG4gIGdldEN1cnJlbnRQb3NpdGlvbigpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGR1cmF0aW9uIG9mIGFuIGF1ZGlvIGZpbGUgaW4gc2Vjb25kcy4gSWYgdGhlIGR1cmF0aW9uIGlzIHVua25vd24sIGl0IHJldHVybnMgYSB2YWx1ZSBvZiAtMS5cbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBhIHByb21pc2Ugd2l0aCB0aGUgZHVyYXRpb24gb2YgdGhlIGN1cnJlbnQgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBnZXREdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgb3IgcmVzdW1lcyBwbGF5aW5nIGFuIGF1ZGlvIGZpbGUuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBwbGF5KGlvc09wdGlvbnM/OiB7IG51bWJlck9mTG9vcHM/OiBudW1iZXI7IHBsYXlBdWRpb1doZW5TY3JlZW5Jc0xvY2tlZD86IGJvb2xlYW4gfSk6IHZvaWQge31cblxuICAvKipcbiAgICogU3RhcnQgb3IgcmVzdW1lIHBsYXlpbmcgYXVkaW8gZmlsZSBpbiBhIGJhY2tncm91bmQgdGhyZWFkLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGxheUluQmFja2dyb3VuZChpb3NPcHRpb25zPzogeyBudW1iZXJPZkxvb3BzPzogbnVtYmVyOyBwbGF5QXVkaW9XaGVuU2NyZWVuSXNMb2NrZWQ/OiBib29sZWFuIH0pOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFBhdXNlcyBwbGF5aW5nIGFuIGF1ZGlvIGZpbGUuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBwYXVzZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIHRoZSB1bmRlcmx5aW5nIG9wZXJhdGluZyBzeXN0ZW0ncyBhdWRpbyByZXNvdXJjZXMuIFRoaXMgaXMgcGFydGljdWxhcmx5IGltcG9ydGFudCBmb3IgQW5kcm9pZCwgc2luY2UgdGhlcmUgYXJlIGEgZmluaXRlIGFtb3VudCBvZiBPcGVuQ29yZSBpbnN0YW5jZXMgZm9yIG1lZGlhIHBsYXliYWNrLiBBcHBsaWNhdGlvbnMgc2hvdWxkIGNhbGwgdGhlIHJlbGVhc2UgZnVuY3Rpb24gZm9yIGFueSBNZWRpYSByZXNvdXJjZSB0aGF0IGlzIG5vIGxvbmdlciBuZWVkZWQuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICByZWxlYXNlKCk6IHZvaWQge31cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBwb3NpdGlvbiB3aXRoaW4gYW4gYXVkaW8gZmlsZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kcyBUaGUgdGltZSBwb3NpdGlvbiB5b3Ugd2FudCB0byBzZXQgZm9yIHRoZSBjdXJyZW50IGF1ZGlvIGZpbGVcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHNlZWtUbyhtaWxsaXNlY29uZHM6IG51bWJlcik6IHZvaWQge31cblxuICAvKipcbiAgICogU2V0IHRoZSB2b2x1bWUgZm9yIGFuIGF1ZGlvIGZpbGUuXG4gICAqIEBwYXJhbSB2b2x1bWUge251bWJlcn0gVGhlIHZvbHVtZSB0byBzZXQgZm9yIHBsYXliYWNrLiBUaGUgdmFsdWUgbXVzdCBiZSB3aXRoaW4gdGhlIHJhbmdlIG9mIDAuMCB0byAxLjAuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzZXRWb2x1bWUodm9sdW1lOiBudW1iZXIpOiB2b2lkIHt9XG5cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc2V0UmF0ZShzcGVlZFJhdGU6IG51bWJlcik6IHZvaWQge31cblxuICAvKipcbiAgICogU3RhcnRzIHJlY29yZGluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc3RhcnRSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBTdG9wcyByZWNvcmRpbmdcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHN0b3BSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBwYXVzZVJlY29yZCgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFJlc3VtZXMgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICByZXN1bWVSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBTdG9wcyBwbGF5aW5nIGFuIGF1ZGlvIGZpbGUuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzdG9wKCk6IHZvaWQge31cbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFTdGF0dXNVcGRhdGVDYWxsYmFjayA9IChzdGF0dXNDb2RlOiBudW1iZXIpID0+IHZvaWQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFFcnJvciB7XG4gIC8qKlxuICAgKiBFcnJvciBtZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEVycm9yIGNvZGVcbiAgICovXG4gIGNvZGU6IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gTUVESUFfU1RBVFVTIHtcbiAgTk9ORSA9IDAsXG4gIFNUQVJUSU5HLFxuICBSVU5OSU5HLFxuICBQQVVTRUQsXG4gIFNUT1BQRUQsXG59XG5cbmV4cG9ydCBlbnVtIE1FRElBX0lORk8ge1xuICBCVUZGRVJJTkdfU1RBUlQgPSAwLFxuICBCVUZGRVJJTkdfRU5ELFxufVxuXG5leHBvcnQgZW51bSBNRURJQV9FUlJPUiB7XG4gIEFCT1JURUQgPSAxLFxuICBORVRXT1JLLFxuICBERUNPREUsXG4gIFNVUFBPUlRFRCxcbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFFcnJvckNhbGxiYWNrID0gKGVycm9yOiBNZWRpYUVycm9yKSA9PiB2b2lkO1xuXG4vKipcbiAqIEBuYW1lIE1lZGlhXG4gKiBAcHJlbWllciBtZWRpYVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIHBsdWdpbiBwcm92aWRlcyB0aGUgYWJpbGl0eSB0byByZWNvcmQgYW5kIHBsYXkgYmFjayBhdWRpbyBmaWxlcyBvbiBhIGRldmljZS5cbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IE1lZGlhLCBNZWRpYU9iamVjdCB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbWVkaWEvbmd4JztcbiAqXG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBtZWRpYTogTWVkaWEpIHsgfVxuICpcbiAqXG4gKiAuLi5cbiAqXG4gKlxuICogLy8gQ3JlYXRlIGEgTWVkaWEgaW5zdGFuY2UuICBFeHBlY3RzIHBhdGggdG8gZmlsZSBvciB1cmwgYXMgYXJndW1lbnRcbiAqIC8vIFdlIGNhbiBvcHRpb25hbGx5IHBhc3MgYSBzZWNvbmQgYXJndW1lbnQgdG8gdHJhY2sgdGhlIHN0YXR1cyBvZiB0aGUgbWVkaWFcbiAqXG4gKiBjb25zdCBmaWxlOiBNZWRpYU9iamVjdCA9IHRoaXMubWVkaWEuY3JlYXRlKCdmaWxlLm1wMycpO1xuICpcbiAqIC8vIHRvIGxpc3RlbiB0byBwbHVnaW4gZXZlbnRzOlxuICpcbiAqIGZpbGUub25TdGF0dXNVcGRhdGUuc3Vic2NyaWJlKHN0YXR1cyA9PiBjb25zb2xlLmxvZyhzdGF0dXMpKTsgLy8gZmlyZXMgd2hlbiBmaWxlIHN0YXR1cyBjaGFuZ2VzXG4gKlxuICogZmlsZS5vbkluZm9VcGRhdGUuc3Vic2NyaWJlKHN0YXR1cyA9PiBjb25zb2xlLmxvZyhzdGF0dXMpKTsgLy8gZmlyZXMgd2hlbiBwbGF5YmFjayBidWZmZXIgc3RhdHVzIGNoYW5nZXNcbiAqXG4gKiBmaWxlLm9uU3VjY2Vzcy5zdWJzY3JpYmUoKCkgPT4gY29uc29sZS5sb2coJ0FjdGlvbiBpcyBzdWNjZXNzZnVsJykpO1xuICpcbiAqIGZpbGUub25FcnJvci5zdWJzY3JpYmUoZXJyb3IgPT4gY29uc29sZS5sb2coJ0Vycm9yIScsIGVycm9yKSk7XG4gKlxuICogLy8gcGxheSB0aGUgZmlsZVxuICogZmlsZS5wbGF5KCk7XG4gKlxuICogLy8gcGF1c2UgdGhlIGZpbGVcbiAqIGZpbGUucGF1c2UoKTtcbiAqXG4gKiAvLyBnZXQgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvblxuICogZmlsZS5nZXRDdXJyZW50UG9zaXRpb24oKS50aGVuKChwb3NpdGlvbikgPT4ge1xuICogICBjb25zb2xlLmxvZyhwb3NpdGlvbik7XG4gKiB9KTtcbiAqXG4gKiAvLyBnZXQgZmlsZSBkdXJhdGlvblxuICogbGV0IGR1cmF0aW9uID0gZmlsZS5nZXREdXJhdGlvbigpO1xuICogY29uc29sZS5sb2coZHVyYXRpb24pO1xuICpcbiAqIC8vIHNraXAgdG8gMTAgc2Vjb25kcyAoZXhwZWN0cyBpbnQgdmFsdWUgaW4gbXMpXG4gKiBmaWxlLnNlZWtUbygxMDAwMCk7XG4gKlxuICogLy8gc3RvcCBwbGF5aW5nIHRoZSBmaWxlXG4gKiBmaWxlLnN0b3AoKTtcbiAqXG4gKiAvLyByZWxlYXNlIHRoZSBuYXRpdmUgYXVkaW8gcmVzb3VyY2VcbiAqIC8vIFBsYXRmb3JtIFF1aXJrczpcbiAqIC8vIGlPUyBzaW1wbHkgY3JlYXRlIGEgbmV3IGluc3RhbmNlIGFuZCB0aGUgb2xkIG9uZSB3aWxsIGJlIG92ZXJ3cml0dGVuXG4gKiAvLyBBbmRyb2lkIHlvdSBtdXN0IGNhbGwgcmVsZWFzZSgpIHRvIGRlc3Ryb3kgaW5zdGFuY2VzIG9mIG1lZGlhIHdoZW4geW91IGFyZSBkb25lXG4gKiBmaWxlLnJlbGVhc2UoKTtcbiAqXG4gKlxuICpcbiAqIC8vIFJlY29yZGluZyB0byBhIGZpbGVcbiAqIGNvbnN0IGZpbGU6IE1lZGlhT2JqZWN0ID0gdGhpcy5tZWRpYS5jcmVhdGUoJ3BhdGgvdG8vZmlsZS5tcDMnKTtcbiAqXG4gKiBmaWxlLnN0YXJ0UmVjb3JkKCk7XG4gKlxuICogZmlsZS5zdG9wUmVjb3JkKCk7XG4gKlxuICpcbiAqIGBgYFxuICpcbiAqIFNvbWUgaGludHMgaWYgeW91IGFyZSB1c2luZyBpT1MgYW5kIHJlY29yZGluZyBkb2Vzbid0IHdvcms6XG4gKiAxLikgVHJ5IHRvIHVzZSBhIGFic29sdXRlIGZpbGUgcGF0aCBidXQgcmVtb3ZlIGJlZ2lubmluZyBcImZpbGU6Ly9cIi5cbiAqIFRoZW4gaXQgbG9va3MgbGlrZTogYC92YXIvbW9iaWxlL0NvbnRhaW5lcnMvRGF0YS9BcHBsaWNhdGlvbi9BRjQzOEI4Qi03NzI0LTRGQkItOEU2OS0wODM0NjMyMjRGQzQvdG1wL215X2ZpbGUubTRhYFxuICogRXhhbXBsZTogYHRoaXMubWVkaWEuY3JlYXRlKHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5LnJlcGxhY2UoL15maWxlOlxcL1xcLy8sICcnKSArICdteV9maWxlLm00YScpYFxuICogMi4pIElmIHRoYXQncyBub3Qgd29ya2luZywgdG9vLCBjcmVhdGUgdGhlIGZpbGUgYmVmb3JlIHVzaW5nLlxuICogRXhhbXBsZTpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IE1lZGlhLCBNZWRpYU9iamVjdCB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvbWVkaWEvbmd4JztcbiAqIGltcG9ydCB7IEZpbGUgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2ZpbGUvbmd4JztcbiAqXG4gKiAuLi5cbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIG1lZGlhOiBNZWRpYSwgcHJpdmF0ZSBmaWxlOiBGaWxlKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmZpbGUuY3JlYXRlRmlsZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeSwgJ215X2ZpbGUubTRhJywgdHJ1ZSkudGhlbigoKSA9PiB7XG4gKiAgIGxldCBmaWxlID0gdGhpcy5tZWRpYS5jcmVhdGUodGhpcy5maWxlLnRlbXBEaXJlY3RvcnkucmVwbGFjZSgvXmZpbGU6XFwvXFwvLywgJycpICsgJ215X2ZpbGUubTRhJyk7XG4gKiAgIGZpbGUuc3RhcnRSZWNvcmQoKTtcbiAqICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZmlsZS5zdG9wUmVjb3JkKCksIDEwMDAwKTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogWW91IGNhbiBmaW5kIHRoZSByZWFzb25zIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9pb25pYy10ZWFtL2lvbmljLW5hdGl2ZS9pc3N1ZXMvMTQ1MiNpc3N1ZWNvbW1lbnQtMjk5NjA1OTA2XG4gKiBAY2xhc3Nlc1xuICogTWVkaWFPYmplY3RcbiAqIEBpbnRlcmZhY2VzXG4gKiBNZWRpYUVycm9yXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnTWVkaWEnLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2FwYWNoZS9jb3Jkb3ZhLXBsdWdpbi1tZWRpYScsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLW1lZGlhJyxcbiAgcGx1Z2luUmVmOiAnTWVkaWEnLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdXaW5kb3dzJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lZGlhIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvLyBDb25zdGFudHNcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX05PTkUgPSAwO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfU1RBUlRJTkcgPSAxO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfUlVOTklORyA9IDI7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9QQVVTRUQgPSAzO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfU1RPUFBFRCA9IDQ7XG5cbiAgLy8gZXJyb3IgY29kZXNcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9BQk9SVEVEID0gMTtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9ORVRXT1JLID0gMjtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9ERUNPREUgPSAzO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfRVJSX05PTkVfU1VQUE9SVEVEID0gNDtcblxuICAvKipcbiAgICogT3BlbiBhIG1lZGlhIGZpbGVcbiAgICogQHBhcmFtIHNyYyB7c3RyaW5nfSBBIFVSSSBjb250YWluaW5nIHRoZSBhdWRpbyBjb250ZW50LlxuICAgKiBAcmV0dXJuIHtNZWRpYU9iamVjdH1cbiAgICovXG4gIGNyZWF0ZShzcmM6IHN0cmluZyk6IE1lZGlhT2JqZWN0IHtcbiAgICBsZXQgaW5zdGFuY2U6IGFueTtcblxuICAgIGlmIChjaGVja0F2YWlsYWJpbGl0eShNZWRpYS5nZXRQbHVnaW5SZWYoKSwgbnVsbCwgTWVkaWEuZ2V0UGx1Z2luTmFtZSgpKSA9PT0gdHJ1ZSkge1xuICAgICAgLy8gQ3JlYXRlcyBhIG5ldyBtZWRpYSBvYmplY3RcbiAgICAgIGluc3RhbmNlID0gbmV3IChNZWRpYS5nZXRQbHVnaW4oKSkoc3JjKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE1lZGlhT2JqZWN0KGluc3RhbmNlKTtcbiAgfVxufVxuIl19