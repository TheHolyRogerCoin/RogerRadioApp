var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var MediaOriginal = /** @class */ (function (_super) {
    __extends(MediaOriginal, _super);
    function MediaOriginal() {
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
    MediaOriginal.prototype.create = function (src) {
        var instance;
        if (checkAvailability(MediaOriginal.getPluginRef(), null, MediaOriginal.getPluginName()) === true) {
            // Creates a new media object
            instance = new (MediaOriginal.getPlugin())(src);
        }
        return new MediaObject(instance);
    };
    MediaOriginal.pluginName = "Media";
    MediaOriginal.repo = "https://github.com/apache/cordova-plugin-media";
    MediaOriginal.plugin = "cordova-plugin-media";
    MediaOriginal.pluginRef = "Media";
    MediaOriginal.platforms = ["Android", "Browser", "iOS", "Windows"];
    return MediaOriginal;
}(IonicNativePlugin));
var Media = new MediaOriginal();
export { Media };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL21lZGlhL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLGdGQUFnRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JILE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7O0lBOEMxQyxxQkFBb0IsZUFBb0I7UUFBeEMsaUJBb0JDO1FBcEJtQixvQkFBZSxHQUFmLGVBQWUsQ0FBSztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksVUFBVSxDQUFNLFVBQUMsUUFBdUI7WUFDM0QsS0FBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxPQUFPLGNBQU0sT0FBQSxDQUFDLEtBQUksQ0FBQyxlQUFlLEdBQUcsY0FBTyxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQWEsVUFBQyxRQUE4QjtZQUN2RSxLQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxjQUFPLENBQUMsQ0FBQyxFQUEvQixDQUErQixDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFVBQVUsQ0FBZSxVQUFDLFFBQWdDO1lBQ2xGLEtBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbkQsT0FBTyxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMs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bXBvcnQgeyBDb3Jkb3ZhSW5zdGFuY2UsIEluc3RhbmNlUHJvcGVydHksIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4sIGNoZWNrQXZhaWxhYmlsaXR5IH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgTWVkaWFPYmplY3Qge1xuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IG5vdGlmaWVzIHlvdSBvbiBhY3Rpb25zIHN1Y2Nlc3NcbiAgICovXG4gIG9uU3VjY2VzczogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgeW91IHdoZW4gYW4gZXJyb3Igb2NjdXJzXG4gICAqL1xuICBvbkVycm9yOiBPYnNlcnZhYmxlPE1lZGlhRXJyb3I+O1xuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgeW91IHdoZW4gdGhlIGZpbGUgc3RhdHVzIGNoYW5nZXNcbiAgICovXG4gIG9uU3RhdHVzVXBkYXRlOiBPYnNlcnZhYmxlPE1FRElBX1NUQVRVUz47XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBub3RpZmllcyB5b3Ugd2hlbiB0aGUgZmlsZSBzdGF0dXMgY2hhbmdlc1xuICAgKi9cbiAgb25JbmZvVXBkYXRlOiBPYnNlcnZhYmxlPE1FRElBX0lORk8+O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIHN1Y2Nlc3NDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgZXJyb3JDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIEBJbnN0YW5jZVByb3BlcnR5KCkgc3RhdHVzQ2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBASW5zdGFuY2VQcm9wZXJ0eSgpIGluZm9DYWxsYmFjazogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb2JqZWN0SW5zdGFuY2U6IGFueSkge1xuICAgIHRoaXMub25TdWNjZXNzID0gbmV3IE9ic2VydmFibGU8YW55Pigob2JzZXJ2ZXI6IE9ic2VydmVyPGFueT4pID0+IHtcbiAgICAgIHRoaXMuc3VjY2Vzc0NhbGxiYWNrID0gb2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyKTtcbiAgICAgIHJldHVybiAoKSA9PiAodGhpcy5zdWNjZXNzQ2FsbGJhY2sgPSAoKSA9PiB7fSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uRXJyb3IgPSBuZXcgT2JzZXJ2YWJsZTxNZWRpYUVycm9yPigob2JzZXJ2ZXI6IE9ic2VydmVyPE1lZGlhRXJyb3I+KSA9PiB7XG4gICAgICB0aGlzLmVycm9yQ2FsbGJhY2sgPSBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpO1xuICAgICAgcmV0dXJuICgpID0+ICh0aGlzLmVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uU3RhdHVzVXBkYXRlID0gbmV3IE9ic2VydmFibGU8TUVESUFfU1RBVFVTPigob2JzZXJ2ZXI6IE9ic2VydmVyPE1FRElBX1NUQVRVUz4pID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzQ2FsbGJhY2sgPSBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpO1xuICAgICAgcmV0dXJuICgpID0+ICh0aGlzLnN0YXR1c0NhbGxiYWNrID0gKCkgPT4ge30pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbkluZm9VcGRhdGUgPSBuZXcgT2JzZXJ2YWJsZTxNRURJQV9JTkZPPigob2JzZXJ2ZXI6IE9ic2VydmVyPE1FRElBX0lORk8+KSA9PiB7XG4gICAgICB0aGlzLmluZm9DYWxsYmFjayA9IG9ic2VydmVyLm5leHQuYmluZChvYnNlcnZlcik7XG4gICAgICByZXR1cm4gKCkgPT4gKHRoaXMuaW5mb0NhbGxiYWNrID0gKCkgPT4ge30pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBhbXBsaXR1ZGUgb2YgdGhlIGN1cnJlbnQgcmVjb3JkaW5nLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aXRoIHRoZSBhbXBsaXR1ZGUgb2YgdGhlIGN1cnJlbnQgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKClcbiAgZ2V0Q3VycmVudEFtcGxpdHVkZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gd2l0aGluIGFuIGF1ZGlvIGZpbGUuIEFsc28gdXBkYXRlcyB0aGUgTWVkaWEgb2JqZWN0J3MgcG9zaXRpb24gcGFyYW1ldGVyLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBSZXR1cm5zIGEgcHJvbWlzZSB3aXRoIHRoZSBwb3NpdGlvbiBvZiB0aGUgY3VycmVudCByZWNvcmRpbmdcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICBnZXRDdXJyZW50UG9zaXRpb24oKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkdXJhdGlvbiBvZiBhbiBhdWRpbyBmaWxlIGluIHNlY29uZHMuIElmIHRoZSBkdXJhdGlvbiBpcyB1bmtub3duLCBpdCByZXR1cm5zIGEgdmFsdWUgb2YgLTEuXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIGR1cmF0aW9uIG9mIHRoZSBjdXJyZW50IHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgZ2V0RHVyYXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIG9yIHJlc3VtZXMgcGxheWluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGxheShpb3NPcHRpb25zPzogeyBudW1iZXJPZkxvb3BzPzogbnVtYmVyOyBwbGF5QXVkaW9XaGVuU2NyZWVuSXNMb2NrZWQ/OiBib29sZWFuIH0pOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IG9yIHJlc3VtZSBwbGF5aW5nIGF1ZGlvIGZpbGUgaW4gYSBiYWNrZ3JvdW5kIHRocmVhZC5cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHBsYXlJbkJhY2tncm91bmQoaW9zT3B0aW9ucz86IHsgbnVtYmVyT2ZMb29wcz86IG51bWJlcjsgcGxheUF1ZGlvV2hlblNjcmVlbklzTG9ja2VkPzogYm9vbGVhbiB9KTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgcGxheWluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGF1c2UoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBSZWxlYXNlcyB0aGUgdW5kZXJseWluZyBvcGVyYXRpbmcgc3lzdGVtJ3MgYXVkaW8gcmVzb3VyY2VzLiBUaGlzIGlzIHBhcnRpY3VsYXJseSBpbXBvcnRhbnQgZm9yIEFuZHJvaWQsIHNpbmNlIHRoZXJlIGFyZSBhIGZpbml0ZSBhbW91bnQgb2YgT3BlbkNvcmUgaW5zdGFuY2VzIGZvciBtZWRpYSBwbGF5YmFjay4gQXBwbGljYXRpb25zIHNob3VsZCBjYWxsIHRoZSByZWxlYXNlIGZ1bmN0aW9uIGZvciBhbnkgTWVkaWEgcmVzb3VyY2UgdGhhdCBpcyBubyBsb25nZXIgbmVlZGVkLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcmVsZWFzZSgpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgcG9zaXRpb24gd2l0aGluIGFuIGF1ZGlvIGZpbGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtaWxsaXNlY29uZHMgVGhlIHRpbWUgcG9zaXRpb24geW91IHdhbnQgdG8gc2V0IGZvciB0aGUgY3VycmVudCBhdWRpbyBmaWxlXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzZWVrVG8obWlsbGlzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdm9sdW1lIGZvciBhbiBhdWRpbyBmaWxlLlxuICAgKiBAcGFyYW0gdm9sdW1lIHtudW1iZXJ9IFRoZSB2b2x1bWUgdG8gc2V0IGZvciBwbGF5YmFjay4gVGhlIHZhbHVlIG11c3QgYmUgd2l0aGluIHRoZSByYW5nZSBvZiAwLjAgdG8gMS4wLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc2V0Vm9sdW1lKHZvbHVtZTogbnVtYmVyKTogdm9pZCB7fVxuXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHNldFJhdGUoc3BlZWRSYXRlOiBudW1iZXIpOiB2b2lkIHt9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyByZWNvcmRpbmcgYW4gYXVkaW8gZmlsZS5cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIHN0YXJ0UmVjb3JkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogU3RvcHMgcmVjb3JkaW5nXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzdG9wUmVjb3JkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogUGF1c2VzIHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcGF1c2VSZWNvcmQoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBSZXN1bWVzIHJlY29yZGluZ1xuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgcmVzdW1lUmVjb3JkKCk6IHZvaWQge31cblxuICAvKipcbiAgICogU3RvcHMgcGxheWluZyBhbiBhdWRpbyBmaWxlLlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgc3RvcCgpOiB2b2lkIHt9XG59XG5cbmV4cG9ydCB0eXBlIE1lZGlhU3RhdHVzVXBkYXRlQ2FsbGJhY2sgPSAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiB2b2lkO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhRXJyb3Ige1xuICAvKipcbiAgICogRXJyb3IgbWVzc2FnZVxuICAgKi9cbiAgbWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBFcnJvciBjb2RlXG4gICAqL1xuICBjb2RlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBlbnVtIE1FRElBX1NUQVRVUyB7XG4gIE5PTkUgPSAwLFxuICBTVEFSVElORyxcbiAgUlVOTklORyxcbiAgUEFVU0VELFxuICBTVE9QUEVELFxufVxuXG5leHBvcnQgZW51bSBNRURJQV9JTkZPIHtcbiAgQlVGRkVSSU5HX1NUQVJUID0gMCxcbiAgQlVGRkVSSU5HX0VORCxcbn1cblxuZXhwb3J0IGVudW0gTUVESUFfRVJST1Ige1xuICBBQk9SVEVEID0gMSxcbiAgTkVUV09SSyxcbiAgREVDT0RFLFxuICBTVVBQT1JURUQsXG59XG5cbmV4cG9ydCB0eXBlIE1lZGlhRXJyb3JDYWxsYmFjayA9IChlcnJvcjogTWVkaWFFcnJvcikgPT4gdm9pZDtcblxuLyoqXG4gKiBAbmFtZSBNZWRpYVxuICogQHByZW1pZXIgbWVkaWFcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBwbHVnaW4gcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gcmVjb3JkIGFuZCBwbGF5IGJhY2sgYXVkaW8gZmlsZXMgb24gYSBkZXZpY2UuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBNZWRpYSwgTWVkaWFPYmplY3QgfSBmcm9tICdAaW9uaWMtbmF0aXZlL21lZGlhL25neCc7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgbWVkaWE6IE1lZGlhKSB7IH1cbiAqXG4gKlxuICogLi4uXG4gKlxuICpcbiAqIC8vIENyZWF0ZSBhIE1lZGlhIGluc3RhbmNlLiAgRXhwZWN0cyBwYXRoIHRvIGZpbGUgb3IgdXJsIGFzIGFyZ3VtZW50XG4gKiAvLyBXZSBjYW4gb3B0aW9uYWxseSBwYXNzIGEgc2Vjb25kIGFyZ3VtZW50IHRvIHRyYWNrIHRoZSBzdGF0dXMgb2YgdGhlIG1lZGlhXG4gKlxuICogY29uc3QgZmlsZTogTWVkaWFPYmplY3QgPSB0aGlzLm1lZGlhLmNyZWF0ZSgnZmlsZS5tcDMnKTtcbiAqXG4gKiAvLyB0byBsaXN0ZW4gdG8gcGx1Z2luIGV2ZW50czpcbiAqXG4gKiBmaWxlLm9uU3RhdHVzVXBkYXRlLnN1YnNjcmliZShzdGF0dXMgPT4gY29uc29sZS5sb2coc3RhdHVzKSk7IC8vIGZpcmVzIHdoZW4gZmlsZSBzdGF0dXMgY2hhbmdlc1xuICpcbiAqIGZpbGUub25JbmZvVXBkYXRlLnN1YnNjcmliZShzdGF0dXMgPT4gY29uc29sZS5sb2coc3RhdHVzKSk7IC8vIGZpcmVzIHdoZW4gcGxheWJhY2sgYnVmZmVyIHN0YXR1cyBjaGFuZ2VzXG4gKlxuICogZmlsZS5vblN1Y2Nlc3Muc3Vic2NyaWJlKCgpID0+IGNvbnNvbGUubG9nKCdBY3Rpb24gaXMgc3VjY2Vzc2Z1bCcpKTtcbiAqXG4gKiBmaWxlLm9uRXJyb3Iuc3Vic2NyaWJlKGVycm9yID0+IGNvbnNvbGUubG9nKCdFcnJvciEnLCBlcnJvcikpO1xuICpcbiAqIC8vIHBsYXkgdGhlIGZpbGVcbiAqIGZpbGUucGxheSgpO1xuICpcbiAqIC8vIHBhdXNlIHRoZSBmaWxlXG4gKiBmaWxlLnBhdXNlKCk7XG4gKlxuICogLy8gZ2V0IGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb25cbiAqIGZpbGUuZ2V0Q3VycmVudFBvc2l0aW9uKCkudGhlbigocG9zaXRpb24pID0+IHtcbiAqICAgY29uc29sZS5sb2cocG9zaXRpb24pO1xuICogfSk7XG4gKlxuICogLy8gZ2V0IGZpbGUgZHVyYXRpb25cbiAqIGxldCBkdXJhdGlvbiA9IGZpbGUuZ2V0RHVyYXRpb24oKTtcbiAqIGNvbnNvbGUubG9nKGR1cmF0aW9uKTtcbiAqXG4gKiAvLyBza2lwIHRvIDEwIHNlY29uZHMgKGV4cGVjdHMgaW50IHZhbHVlIGluIG1zKVxuICogZmlsZS5zZWVrVG8oMTAwMDApO1xuICpcbiAqIC8vIHN0b3AgcGxheWluZyB0aGUgZmlsZVxuICogZmlsZS5zdG9wKCk7XG4gKlxuICogLy8gcmVsZWFzZSB0aGUgbmF0aXZlIGF1ZGlvIHJlc291cmNlXG4gKiAvLyBQbGF0Zm9ybSBRdWlya3M6XG4gKiAvLyBpT1Mgc2ltcGx5IGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBhbmQgdGhlIG9sZCBvbmUgd2lsbCBiZSBvdmVyd3JpdHRlblxuICogLy8gQW5kcm9pZCB5b3UgbXVzdCBjYWxsIHJlbGVhc2UoKSB0byBkZXN0cm95IGluc3RhbmNlcyBvZiBtZWRpYSB3aGVuIHlvdSBhcmUgZG9uZVxuICogZmlsZS5yZWxlYXNlKCk7XG4gKlxuICpcbiAqXG4gKiAvLyBSZWNvcmRpbmcgdG8gYSBmaWxlXG4gKiBjb25zdCBmaWxlOiBNZWRpYU9iamVjdCA9IHRoaXMubWVkaWEuY3JlYXRlKCdwYXRoL3RvL2ZpbGUubXAzJyk7XG4gKlxuICogZmlsZS5zdGFydFJlY29yZCgpO1xuICpcbiAqIGZpbGUuc3RvcFJlY29yZCgpO1xuICpcbiAqXG4gKiBgYGBcbiAqXG4gKiBTb21lIGhpbnRzIGlmIHlvdSBhcmUgdXNpbmcgaU9TIGFuZCByZWNvcmRpbmcgZG9lc24ndCB3b3JrOlxuICogMS4pIFRyeSB0byB1c2UgYSBhYnNvbHV0ZSBmaWxlIHBhdGggYnV0IHJlbW92ZSBiZWdpbm5pbmcgXCJmaWxlOi8vXCIuXG4gKiBUaGVuIGl0IGxvb2tzIGxpa2U6IGAvdmFyL21vYmlsZS9Db250YWluZXJzL0RhdGEvQXBwbGljYXRpb24vQUY0MzhCOEItNzcyNC00RkJCLThFNjktMDgzNDYzMjI0RkM0L3RtcC9teV9maWxlLm00YWBcbiAqIEV4YW1wbGU6IGB0aGlzLm1lZGlhLmNyZWF0ZSh0aGlzLmZpbGUudGVtcERpcmVjdG9yeS5yZXBsYWNlKC9eZmlsZTpcXC9cXC8vLCAnJykgKyAnbXlfZmlsZS5tNGEnKWBcbiAqIDIuKSBJZiB0aGF0J3Mgbm90IHdvcmtpbmcsIHRvbywgY3JlYXRlIHRoZSBmaWxlIGJlZm9yZSB1c2luZy5cbiAqIEV4YW1wbGU6XG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBNZWRpYSwgTWVkaWFPYmplY3QgfSBmcm9tICdAaW9uaWMtbmF0aXZlL21lZGlhL25neCc7XG4gKiBpbXBvcnQgeyBGaWxlIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9maWxlL25neCc7XG4gKlxuICogLi4uXG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBtZWRpYTogTWVkaWEsIHByaXZhdGUgZmlsZTogRmlsZSkgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5maWxlLmNyZWF0ZUZpbGUodGhpcy5maWxlLnRlbXBEaXJlY3RvcnksICdteV9maWxlLm00YScsIHRydWUpLnRoZW4oKCkgPT4ge1xuICogICBsZXQgZmlsZSA9IHRoaXMubWVkaWEuY3JlYXRlKHRoaXMuZmlsZS50ZW1wRGlyZWN0b3J5LnJlcGxhY2UoL15maWxlOlxcL1xcLy8sICcnKSArICdteV9maWxlLm00YScpO1xuICogICBmaWxlLnN0YXJ0UmVjb3JkKCk7XG4gKiAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGZpbGUuc3RvcFJlY29yZCgpLCAxMDAwMCk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gZmluZCB0aGUgcmVhc29ucyBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vaW9uaWMtdGVhbS9pb25pYy1uYXRpdmUvaXNzdWVzLzE0NTIjaXNzdWVjb21tZW50LTI5OTYwNTkwNlxuICogQGNsYXNzZXNcbiAqIE1lZGlhT2JqZWN0XG4gKiBAaW50ZXJmYWNlc1xuICogTWVkaWFFcnJvclxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ01lZGlhJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcGFjaGUvY29yZG92YS1wbHVnaW4tbWVkaWEnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1tZWRpYScsXG4gIHBsdWdpblJlZjogJ01lZGlhJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnQnJvd3NlcicsICdpT1MnLCAnV2luZG93cyddLFxufSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZWRpYSBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLy8gQ29uc3RhbnRzXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9OT05FID0gMDtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX1NUQVJUSU5HID0gMTtcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX1JVTk5JTkcgPSAyO1xuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgTUVESUFfUEFVU0VEID0gMztcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX1NUT1BQRUQgPSA0O1xuXG4gIC8vIGVycm9yIGNvZGVzXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9FUlJfQUJPUlRFRCA9IDE7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9FUlJfTkVUV09SSyA9IDI7XG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBNRURJQV9FUlJfREVDT0RFID0gMztcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIE1FRElBX0VSUl9OT05FX1NVUFBPUlRFRCA9IDQ7XG5cbiAgLyoqXG4gICAqIE9wZW4gYSBtZWRpYSBmaWxlXG4gICAqIEBwYXJhbSBzcmMge3N0cmluZ30gQSBVUkkgY29udGFpbmluZyB0aGUgYXVkaW8gY29udGVudC5cbiAgICogQHJldHVybiB7TWVkaWFPYmplY3R9XG4gICAqL1xuICBjcmVhdGUoc3JjOiBzdHJpbmcpOiBNZWRpYU9iamVjdCB7XG4gICAgbGV0IGluc3RhbmNlOiBhbnk7XG5cbiAgICBpZiAoY2hlY2tBdmFpbGFiaWxpdHkoTWVkaWEuZ2V0UGx1Z2luUmVmKCksIG51bGwsIE1lZGlhLmdldFBsdWdpbk5hbWUoKSkgPT09IHRydWUpIHtcbiAgICAgIC8vIENyZWF0ZXMgYSBuZXcgbWVkaWEgb2JqZWN0XG4gICAgICBpbnN0YW5jZSA9IG5ldyAoTWVkaWEuZ2V0UGx1Z2luKCkpKHNyYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBNZWRpYU9iamVjdChpbnN0YW5jZSk7XG4gIH1cbn1cbiJdfQ==